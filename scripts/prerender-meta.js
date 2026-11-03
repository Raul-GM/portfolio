// Genera dist/portfolio/<slug>/index.html por cada obra publicada y dist/<ruta>/index.html por cada
// página fija de pages.js, con título, description, Open Graph y canonical ya escritos en el HTML.
// Las redes sociales no ejecutan JS, así que sin esto solo verían las metas genéricas de index.html.
// Netlify sirve ese fichero si existe; si no, aplica _redirects.
// Se ejecuta en postbuild.

const fs = require('fs')
const path = require('path')
const { ROOT, SITE_URL, publishedWorks, getWorkUrl, getWorkDateCreated, getOgImage, shopData, getProductUrl, getProductOgImage, pages, notFoundPage } = require('./lib/load-works')

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
  /<link rel="?canonical"?[^>]*>/g,
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/g
]

const renderHead = ({ title, description, url, image = DEFAULT_OG_IMAGE, schema, noindex = false }) => {
  const meta = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:image', image],
    ['property', 'og:url', url],
    ['property', 'og:type', 'website'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image]
  ]
  return [
    `<title>${escapeHtml(title)}</title>`,
    ...meta.map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`),
    noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`,
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
    inLanguage: 'es',
    dateCreated: getWorkDateCreated(work),
    url,
    creator: { '@type': 'Person', name: 'Raúl García' }
  }
  return renderHead({ title, description, url, image, schema })
}

// Mismos textos y schema que ShopProductComponent
const renderProductHead = (product) => {
  const url = `${SITE_URL}${getProductUrl(product)}`
  const image = `${SITE_URL}/${getProductOgImage(product)}`
  const title = `${product.name}, lámina ilustrada | Raúl García`
  const description = `${product.description} Escríbeme para comprarla.`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Lámina «${product.name}»`,
    description: product.description,
    image,
    url,
    brand: { '@type': 'Person', name: 'Raúl García' },
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url
    }
  }
  return renderHead({ title, description, url, image, schema })
}

const base = MANAGED_TAGS.reduce((html, pattern) => html.replace(pattern, ''), template)
if (!base.includes('</head>')) throw new Error('dist/index.html no tiene </head>')

const writePage = (route, head) => {
  const output = path.join(DIST, ...route.split('/').filter(Boolean), 'index.html')
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, base.replace('</head>', `${head}</head>`))
}

// Mismo schema que getSchemaPersonProfile (src/composables/useSeoMeta.js), que no se puede cargar desde Node
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raúl García',
  url: SITE_URL,
  email: 'raulgm83.art@gmail.com',
  jobTitle: 'Ilustrador',
  image: DEFAULT_OG_IMAGE,
  sameAs: [
    'https://www.instagram.com/raulgarcia.design/',
    'https://www.behance.net/raulgm2/projects',
    'https://youtube.com/@raulgarcia.design'
  ],
  description: 'Ilustrador especializado en fan art de series, películas y videojuegos y en retratos por encargo.'
}

// La home es dist/index.html, que también sirve de plantilla para el resto de rutas de la SPA
// (por eso se reescribe la última, con la plantilla `base` ya limpia de metas)
const staticPages = Object.values(pages).filter(page => page.path !== '/')
staticPages.forEach(page => writePage(page.path, renderHead({ ...page, url: `${SITE_URL}${page.path}` })))
publishedWorks.forEach(work => writePage(getWorkUrl(work), renderWorkHead(work)))
shopData.forEach(product => writePage(getProductUrl(product), renderProductHead(product)))
fs.writeFileSync(path.join(DIST, 'index.html'), base.replace('</head>', `${renderHead({ ...pages.home, url: `${SITE_URL}/`, schema: personSchema })}</head>`))
// Netlify sirve 404.html con código 404 para toda ruta sin HTML propio (public/_redirects); sin JS lleva noindex y no hereda las metas de la home
fs.writeFileSync(path.join(DIST, '404.html'), base.replace('</head>', `${renderHead({ ...notFoundPage, url: `${SITE_URL}/`, noindex: true })}</head>`))
console.log(`✔ HTML con metas: home y ${staticPages.length} página(s) fijas, ${publishedWorks.length} obra(s) y ${shopData.length} lámina(s)`)
