// Regenera public/sitemap.xml a partir de las páginas fijas (pages.js) y de las obras publicadas.
// Se ejecuta en prebuild: no edites sitemap.xml a mano.

const fs = require('fs')
const path = require('path')
const { ROOT, SITE_URL, publishedWorks, getWorkUrl, pages } = require('./lib/load-works')

const STATIC_PAGES = Object.values(pages).map(page => page.path)

const urls = [
  ...STATIC_PAGES.map(page => ({ loc: `${SITE_URL}${page}` })),
  ...publishedWorks.map(work => ({ loc: `${SITE_URL}${getWorkUrl(work)}`, lastmod: work.date }))
]

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<!-- Generado por scripts/sitemap.js desde works.js. No editar a mano. -->',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(({ loc, lastmod }) =>
    `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`),
  '</urlset>',
  ''
].join('\n')

fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), xml)
console.log(`✔ sitemap.xml: ${urls.length} URLs`)
