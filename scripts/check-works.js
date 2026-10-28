// Valida src/views/data/works.js. Sale con código 1 si hay errores (bloquea el build).
//
//   npm run check

const fs = require('fs')
const path = require('path')
const { ROOT, works, Categories } = require('./lib/load-works')

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const STATUSES = ['featured', 'visible', 'archived']
const KINDS = ['commission', 'personal']
const WIDTHS = [320, 640, 1280]
const GENERIC_ALTS = ['', 'image', 'imagen', 'ilustración', 'ilustracion']
const MAX_DESCRIPTION = 155

const errors = []
const warnings = []

const imageExists = (image, width) =>
  fs.existsSync(path.join(ROOT, 'src', 'assets', 'images', `${image}_${width}.jpeg`))

const checkImage = (label, image) => {
  const missing = WIDTHS.filter(width => !imageExists(image, width))
  if (missing.length) errors.push(`${label}: faltan ${missing.map(width => `${image}_${width}.jpeg`).join(', ')}`)
}

const isText = value => typeof value === 'string' && value.trim() !== ''

const slugs = new Set()
works.forEach((work, index) => {
  const id = work.slug || `#${index}`

  if (!SLUG.test(work.slug || '')) errors.push(`${id}: slug no válido (minúsculas, números y guiones)`)
  if (slugs.has(work.slug)) errors.push(`${id}: slug duplicado`)
  slugs.add(work.slug)

  if (!isText(work.title)) errors.push(`${id}: falta title`)
  if (!Categories[work.category]) errors.push(`${id}: category "${work.category}" no existe en categories.js (${Object.keys(Categories).join(', ')})`)
  if (!STATUSES.includes(work.status)) errors.push(`${id}: status debe ser ${STATUSES.join(' | ')}`)
  if (!KINDS.includes(work.kind)) errors.push(`${id}: kind debe ser ${KINDS.join(' | ')}`)
  if (typeof work.order !== 'number') errors.push(`${id}: order debe ser un número`)
  if (!DATE.test(work.date || '')) errors.push(`${id}: date debe ser AAAA-MM-DD`)
  if (!isText(work.summary)) errors.push(`${id}: falta summary`)
  if (!Array.isArray(work.body) || !work.body.length || !work.body.every(isText)) errors.push(`${id}: body debe ser una lista de párrafos no vacía`)

  if (!isText(work.seo && work.seo.title)) errors.push(`${id}: falta seo.title`)
  const description = work.seo && work.seo.description
  if (!isText(description)) {
    errors.push(`${id}: falta seo.description`)
  } else if (description.length > MAX_DESCRIPTION) {
    errors.push(`${id}: seo.description tiene ${description.length} caracteres (máx. ${MAX_DESCRIPTION})`)
  }
  if (!fs.existsSync(path.join(ROOT, 'public', 'og', `${work.slug}.jpg`))) errors.push(`${id}: falta public/og/${work.slug}.jpg (npm run images)`)

  if (!isText(work.cover)) errors.push(`${id}: falta cover`)
  else checkImage(`${id} cover`, work.cover)

  if (!Array.isArray(work.blocks) || !work.blocks.length) errors.push(`${id}: blocks vacío`)
  ;(work.blocks || []).forEach((block, blockIndex) => {
    const label = `${id} blocks[${blockIndex}]`
    if (block.type === 'image') {
      checkImage(label, block.image)
      if (!isText(block.alt) || GENERIC_ALTS.includes(block.alt.trim().toLowerCase())) errors.push(`${label}: alt vacío o genérico`)
      if (!Number.isInteger(block.width) || !Number.isInteger(block.height)) errors.push(`${label}: faltan width/height`)
      if (block.altReviewed !== true) warnings.push(`${label}: alt pendiente de revisar (altReviewed: false)`)
    } else if (block.type === 'video') {
      if (!/^[\w-]{11}$/.test(block.youtubeId || '')) errors.push(`${label}: youtubeId no válido`)
      if (!isText(block.title)) errors.push(`${label}: el vídeo necesita title`)
    } else {
      errors.push(`${label}: type "${block.type}" desconocido (image | video)`)
    }
  })
})

warnings.forEach(warning => console.warn(`⚠ ${warning}`))
errors.forEach(error => console.error(`✖ ${error}`))
if (errors.length) {
  console.error(`\nworks.js: ${errors.length} error(es)`)
  process.exit(1)
}
console.log(`✔ works.js: ${works.length} obra(s) válidas${warnings.length ? `, ${warnings.length} aviso(s)` : ''}`)
