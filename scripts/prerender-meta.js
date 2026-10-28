// Genera dist/portfolio/<slug>/index.html por cada obra publicada, con título, description,
// Open Graph y schema de esa obra ya escritos en el HTML. Las redes sociales no ejecutan JS,
// así que sin esto solo verían las metas genéricas de index.html.
// Netlify sirve ese fichero si existe; si no, _redirects cae en el fallback de la SPA.
// Se ejecuta en postbuild.

const fs = require('fs')
const path = require('path')
const { ROOT, SITE_URL, publishedWorks, getWorkUrl, getOgImage } = require('./lib/load-works')

const DIST = path.join(ROOT, 'dist')
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

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

const renderHead = (work) => {
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
  const meta = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:image', image],
    ['property', 'og:url', url],
    ['property', 'og:type', 'article'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image]
  ]
  return [
    `<title>${escapeHtml(title)}</title>`,
    ...meta.map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`),
    `<link rel="canonical" href="${url}">`,
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
  ].join('')
}

const base = MANAGED_TAGS.reduce((html, pattern) => html.replace(pattern, ''), template)
if (!base.includes('</head>')) throw new Error('dist/index.html no tiene </head>')

publishedWorks.forEach(work => {
  const output = path.join(DIST, 'portfolio', work.slug, 'index.html')
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, base.replace('</head>', `${renderHead(work)}</head>`))
})
console.log(`✔ HTML con metas por obra: ${publishedWorks.length} página(s)`)
