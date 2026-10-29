// Abre rutas de dist/ en Chromium sin ventana, sirviendo dist/ como Netlify. Herramienta de los
// revisores (.claude/agents/). Requiere `npm run build` antes. Usa el Chromium de Playwright y
// el protocolo DevTools (paquete `ws`).
//
//   node scripts/render.js <ruta> [<ruta>…] [opciones]
//
// Qué mostrar (combinables; por defecto --summary):
//   --summary          título, metas, canonical, JSON-LD, landmarks, encabezados, imágenes
//                      (alt, fichero elegido, tamaño), enlaces y botones, elemento con foco
//   --dom              HTML tras ejecutar el JS
//   --raw              código HTTP y HTML que recibe un crawler sin JS (no abre el navegador)
//   --requests         peticiones del navegador, internas y externas, con estado y KB
//   --screenshot <png> captura; con varias rutas añade el índice al nombre
//   --full-page        captura la página entera, no solo el viewport
//
// Antes de mostrar (en este orden, repetibles):
//   --click <selector> hace clic en el primer elemento que coincida
//   --tab <n>          pulsa Tab n veces (con --summary verás dónde queda el foco y su contorno)
//
// Entorno:
//   --width 1280 --height 900 --dpr 1   viewport; con width < 768 emula un móvil táctil
//   --reduced-motion                    emula prefers-reduced-motion: reduce
//
// Servidor: aplica public/_redirects como Netlify (un fichero existente gana a las reglas;
// 301/302 redirigen; 200/404 sirven el destino con ese código; `*` y `:splat` admitidos).

const fs = require('fs')
const os = require('os')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const WebSocket = require('ws')

const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

const FLAGS = ['summary', 'dom', 'raw', 'requests', 'full-page', 'reduced-motion']
const REPEATABLE = ['click', 'tab']

const parseArgs = (argv) => {
  const args = { routes: [], actions: [] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (!arg.startsWith('--')) args.routes.push(arg)
    else if (FLAGS.includes(arg.slice(2))) args[arg.slice(2)] = true
    else if (REPEATABLE.includes(arg.slice(2))) args.actions.push({ type: arg.slice(2), value: argv[++i] })
    else args[arg.slice(2)] = argv[++i]
  }
  if (!args.dom && !args.raw && !args.requests && !args.screenshot) args.summary = true
  return args
}

// Git Bash convierte "/ruta" en "C:/Program Files/Git/ruta": se deshace. También acepta "ruta" sin barra.
const normalizeRoute = (route) => {
  const mangled = route.replace(/\\/g, '/').match(/^[A-Za-z]:\/.*?\/Git(\/.*)?$/)
  if (mangled) return mangled[1] || '/'
  return route.startsWith('/') ? route : `/${route}`
}

const findChromium = () => {
  const base = path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright')
  const dirs = fs.existsSync(base) ? fs.readdirSync(base).filter(dir => dir.startsWith('chromium_headless_shell-')).sort() : []
  const exe = dirs.length && path.join(base, dirs[dirs.length - 1], 'chrome-headless-shell-win64', 'chrome-headless-shell.exe')
  if (!exe || !fs.existsSync(exe)) throw new Error(`No encuentro chrome-headless-shell de Playwright en ${base}`)
  return exe
}

// --- Servidor que imita a Netlify ---------------------------------------------------------

const loadRedirects = () => {
  const file = path.join(DIST, '_redirects')
  if (!fs.existsSync(file)) return []
  return fs.readFileSync(file, 'utf8').split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
    .map(line => {
      const [from, to, status = '301'] = line.split(/\s+/)
      return { from, to, status: parseInt(status, 10) }
    })
}

const matchRule = (rule, urlPath) => {
  const clean = urlPath.length > 1 ? urlPath.replace(/\/$/, '') : urlPath
  if (rule.from.endsWith('/*')) {
    const prefix = rule.from.slice(0, -2)
    if (clean === prefix || clean.startsWith(`${prefix}/`)) return rule.to.replace(':splat', clean.slice(prefix.length + 1))
    return null
  }
  return rule.from === clean ? rule.to : null
}

const resolveFile = (urlPath) => {
  const file = path.join(DIST, urlPath)
  if (!file.startsWith(DIST)) return null
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return file
  const index = path.join(file, 'index.html')
  return fs.existsSync(index) ? index : null
}

const startServer = () => new Promise(resolve => {
  const rules = loadRedirects()
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0])
    let file = resolveFile(urlPath)
    let status = 200
    if (!file) {
      for (const rule of rules) {
        const target = matchRule(rule, urlPath)
        if (target === null) continue
        if (rule.status === 301 || rule.status === 302) {
          res.writeHead(rule.status, { Location: target })
          return res.end()
        }
        file = resolveFile(target)
        status = rule.status
        break
      }
    }
    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      return res.end('Not found (sin regla en _redirects)')
    }
    res.writeHead(status, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    res.end(fs.readFileSync(file))
  })
  server.listen(0, () => resolve(server))
})

const fetchRaw = (port, urlPath) => new Promise((resolve, reject) => {
  http.get({ port, path: urlPath }, res => {
    let body = ''
    res.on('data', chunk => { body += chunk })
    res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location, body }))
  }).on('error', reject)
})

// --- Chromium por DevTools ----------------------------------------------------------------

const launchChromium = () => new Promise((resolve, reject) => {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'render-'))
  const chrome = spawn(findChromium(), [
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    '--disable-gpu',
    '--hide-scrollbars',
    'about:blank'
  ], { stdio: ['ignore', 'ignore', 'pipe'] })
  let stderr = ''
  const timer = setTimeout(() => reject(new Error('Chromium no arrancó en 20 s')), 20000)
  chrome.stderr.on('data', chunk => {
    stderr += chunk
    const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/)
    if (match) {
      clearTimeout(timer)
      resolve({ chrome, profile, browserUrl: match[1] })
    }
  })
  chrome.on('error', reject)
})

const connect = (url) => new Promise((resolve, reject) => {
  const socket = new WebSocket(url, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 })
  let nextId = 1
  const pending = new Map()
  const listeners = []
  socket.on('message', data => {
    const message = JSON.parse(data)
    if (message.id && pending.has(message.id)) {
      const { resolve: done, reject: fail } = pending.get(message.id)
      pending.delete(message.id)
      return message.error ? fail(new Error(message.error.message)) : done(message.result)
    }
    listeners.forEach(listener => listener(message))
  })
  socket.on('open', () => resolve({
    send: (method, params = {}, sessionId) => new Promise((done, fail) => {
      const id = nextId++
      pending.set(id, { resolve: done, reject: fail })
      socket.send(JSON.stringify({ id, method, params, sessionId }))
    }),
    on: listener => listeners.push(listener),
    close: () => socket.close()
  }))
  socket.on('error', reject)
})

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

// Resumen accesible y de SEO del documento, calculado dentro de la página
const SUMMARY_SCRIPT = `(() => {
  const text = el => (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 80)
  const name = el => el.getAttribute('aria-label') || text(el) || (el.querySelector('img') && el.querySelector('img').alt) || el.getAttribute('title') || ''
  const describe = el => el ? el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '') : null
  const active = document.activeElement
  const activeStyle = active && active !== document.body ? getComputedStyle(active) : null
  return {
    url: location.pathname,
    lang: document.documentElement.lang,
    title: document.title,
    meta: [...document.querySelectorAll('meta[name], meta[property]')].map(m => (m.getAttribute('name') || m.getAttribute('property')) + ' = ' + m.content),
    canonical: [...document.querySelectorAll('link[rel=canonical]')].map(l => l.href),
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent.slice(0, 300)),
    landmarks: [...document.querySelectorAll('header, nav, main, footer, aside, [role]')].map(el => el.tagName.toLowerCase() + (el.getAttribute('role') ? '[role=' + el.getAttribute('role') + ']' : '') + (el.getAttribute('aria-label') ? ' "' + el.getAttribute('aria-label') + '"' : '')),
    headings: [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(h => h.tagName.toLowerCase() + ': ' + text(h)),
    images: [...document.images].map(img => ({ alt: img.getAttribute('alt'), file: (img.currentSrc || img.src).split('/').pop(), rendered: img.width + 'x' + img.height, natural: img.naturalWidth + 'x' + img.naturalHeight, loading: img.loading })),
    links: [...document.querySelectorAll('a[href]')].map(a => name(a) + ' → ' + a.getAttribute('href')),
    buttons: [...document.querySelectorAll('button, [role=button]')].map(b => name(b) + (b.hasAttribute('aria-expanded') ? ' [aria-expanded=' + b.getAttribute('aria-expanded') + ']' : '')),
    focus: active && active !== document.body ? { element: describe(active), name: name(active), outline: activeStyle.outlineStyle + ' ' + activeStyle.outlineWidth + ' ' + activeStyle.outlineColor, boxShadow: activeStyle.boxShadow } : null
  }
})()`

const printSummary = (summary) => {
  const lines = [`URL: ${summary.url}   lang=${summary.lang}`, `title: ${summary.title}`]
  const block = (label, items) => {
    lines.push(`${label} (${items.length}):`)
    items.forEach(item => lines.push(`  ${typeof item === 'string' ? item : JSON.stringify(item)}`))
  }
  block('meta', summary.meta)
  block('canonical', summary.canonical)
  block('json-ld', summary.jsonLd)
  block('landmarks', summary.landmarks)
  block('encabezados', summary.headings)
  block('imágenes', summary.images)
  block('enlaces', summary.links)
  block('botones', summary.buttons)
  lines.push(`foco: ${summary.focus ? JSON.stringify(summary.focus) : '(body)'}`)
  console.log(lines.join('\n'))
}

const renderRoute = async (cdp, sessionId, baseUrl, route, args, index, total) => {
  const send = (method, params) => cdp.send(method, params, sessionId)
  const requests = new Map()
  const onEvent = message => {
    if (message.sessionId !== sessionId) return
    const { method, params } = message
    if (method === 'Network.requestWillBeSent') requests.set(params.requestId, { url: params.request.url, status: null, bytes: 0 })
    if (method === 'Network.responseReceived' && requests.has(params.requestId)) requests.get(params.requestId).status = params.response.status
    if (method === 'Network.loadingFinished' && requests.has(params.requestId)) requests.get(params.requestId).bytes = params.encodedDataLength
  }
  cdp.on(onEvent)

  const loaded = new Promise(resolve => cdp.on(message => {
    if (message.sessionId === sessionId && message.method === 'Page.loadEventFired') resolve()
  }))
  await send('Page.navigate', { url: `${baseUrl}${route}` })
  await Promise.race([loaded, wait(15000)])
  await wait(1200)

  for (const action of args.actions) {
    if (action.type === 'click') {
      const { result } = await send('Runtime.evaluate', {
        expression: `(() => { const el = document.querySelector(${JSON.stringify(action.value)}); if (!el) return false; el.click(); return true })()`,
        returnByValue: true
      })
      if (!result.value) console.error(`⚠ --click: no hay ningún elemento "${action.value}" en ${route}`)
    } else {
      for (let i = 0; i < parseInt(action.value, 10); i++) {
        await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
        await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
      }
    }
    await wait(500)
  }

  if (total > 1) console.log(`\n===== ${route} =====`)
  if (args.summary) {
    const { result } = await send('Runtime.evaluate', { expression: SUMMARY_SCRIPT, returnByValue: true })
    printSummary(result.value)
  }
  if (args.dom) {
    const { result } = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML', returnByValue: true })
    console.log(result.value)
  }
  if (args.requests) {
    console.log('peticiones:')
    for (const request of requests.values()) {
      const url = (request.url.startsWith(baseUrl) ? request.url.slice(baseUrl.length) : request.url).slice(0, 120)
      console.log(`  ${String(request.status || '---').padEnd(5)}  ${String(Math.round(request.bytes / 1024)).padStart(5)} KB  ${url}`)
    }
  }
  if (args.screenshot) {
    const parsed = path.parse(path.resolve(args.screenshot))
    const file = total > 1 ? path.join(parsed.dir, `${parsed.name}-${index + 1}${parsed.ext}`) : path.resolve(args.screenshot)
    const params = { format: 'png' }
    if (args['full-page']) {
      const { cssContentSize } = await send('Page.getLayoutMetrics')
      params.captureBeyondViewport = true
      params.clip = { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 }
    }
    const { data } = await send('Page.captureScreenshot', params)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, Buffer.from(data, 'base64'))
    console.log(`captura: ${file}`)
  }
}

const main = async () => {
  const args = parseArgs(process.argv.slice(2))
  const routes = args.routes.map(normalizeRoute)
  if (!routes.length) throw new Error('Uso: node scripts/render.js <ruta> [<ruta>…] [--summary] [--dom] [--raw] [--requests] [--screenshot out.png] [--full-page] [--click sel] [--tab n] [--width] [--height] [--dpr] [--reduced-motion]')
  if (!fs.existsSync(path.join(DIST, 'index.html'))) throw new Error('No hay dist/: ejecuta antes `npm run build` (con Node 22)')

  const server = await startServer()
  const { port } = server.address()
  const baseUrl = `http://localhost:${port}`
  let browser
  try {
    if (args.raw) {
      for (const route of routes) {
        const { status, location, body } = await fetchRaw(port, route)
        if (routes.length > 1) console.log(`\n===== ${route} =====`)
        console.log(`HTTP ${status}${location ? ` → ${location}` : ''}`)
        console.log(body)
      }
    }
    if (!args.summary && !args.dom && !args.requests && !args.screenshot) return

    browser = await launchChromium()
    const cdp = await connect(browser.browserUrl)
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true })
    const width = parseInt(args.width || 1280, 10)
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: parseInt(args.height || 900, 10),
      deviceScaleFactor: parseFloat(args.dpr || 1),
      mobile: width < 768
    }, sessionId)
    if (width < 768) await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true }, sessionId)
    if (args['reduced-motion']) {
      await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }, sessionId)
    }
    await cdp.send('Network.enable', {}, sessionId)
    await cdp.send('Page.enable', {}, sessionId)

    for (const [index, route] of routes.entries()) {
      await renderRoute(cdp, sessionId, baseUrl, route, args, index, routes.length)
    }
    cdp.close()
  } finally {
    server.close()
    if (browser) {
      browser.chrome.kill()
      await wait(300)
      fs.rmSync(browser.profile, { recursive: true, force: true })
    }
  }
}

main().catch(error => {
  console.error(`✖ ${error.message}`)
  process.exit(1)
})
