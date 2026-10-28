// Genera dist/portfolio/<slug>/index.html por cada obra publicada y dist/<ruta>/index.html por cada
// página fija de pages.js, con título, description, Open Graph y canonical ya escritos en el HTML.
// Las redes sociales no ejecutan JS, así que sin esto solo verían las metas genéricas de index.html.
// Netlify sirve ese fichero si existe; si no, aplica _redirects.
// Se ejecuta en postbuild.

const fs = require('fs')
const path = require('path')
const { ROOT, SITE_URL, publishedWorks, getWorkUrl, getOgImage, pages } = require('./lib/load-works')

const DIST = path.join(ROOT, 'dist')
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

const escapeHtml = value => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

const MANAGED_TAGS = [
  /<title>[\s\S]*?<\/title>/,
  /<meta (?:name|property)="?(?:description|og:[\w:]+|twitter:[\w:]+)"?[^>]*>/g,
  /<link rel="?canonical"?[^>]*>/g
]

const renderHead = ({ title, description, url, image = DEFAULT_OG_IMAGE, type = 'website', schema }) => {
  const meta = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:image', image],
    ['property', 'og:url', url],
    ['property', 'og:type', type],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image]
  ]
  return [
    `<title>${escapeHtml(title)}</title>`,
    ...meta.map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`),
    `<link rel="canonical" href="${url}">`,
    schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''
  ].join('')
}

const renderWorkHead = (work) => {
  const url = `${SITE_URL}${getWorkUrl(work)}`
  const image = `${SITE_URL}/${getOgImage(work)}`
  const { title, description } = work.seo
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    description,
    image,
    dateCreated: work.date,
    url,
    creator: { '@type': 'Person', name: 'Raúl García' }
  }
  return renderHead({ title, description, url, image, type: 'article', schema })
}

const base = MANAGED_TAGS.reduce((html, pattern) => html.replace(pattern, ''), template)
if (!base.includes('</head>')) throw new Error('dist/index.html no tiene </head>')

const writePage = (route, head) => {
  const output = path.join(DIST, ...route.split('/').filter(Boolean), 'index.html')
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, base.replace('</head>', `${head}</head>`))
}

// La home es dist/index.html, que también sirve de plantilla para el resto de rutas de la SPA
const staticPages = Object.values(pages).filter(page => page.path !== '/')
staticPages.forEach(page => writePage(page.path, renderHead({ ...page, url: `${SITE_URL}${page.path}` })))
publishedWorks.forEach(work => writePage(getWorkUrl(work), renderWorkHead(work)))
console.log(`✔ HTML con metas: ${staticPages.length} página(s) fijas y ${publishedWorks.length} obra(s)`)
