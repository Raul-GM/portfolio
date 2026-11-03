// Genera las variantes web de una obra a partir de sus originales.
//
//   npm run images -- <origen> --slug <slug> [--folder <Carpeta>] [--og <fichero>]
//
// <origen> es un fichero o una carpeta (p. ej. inbox/RetratoIsabelII). Por cada imagen escribe
// src/assets/images/portfolio/<Carpeta>/<nombre>_<ancho>.jpeg (anchos en src/views/data/imageWidths.js) y, para la primera
// (o la indicada con --og), public/og/<slug>.jpg. Nunca modifica el origen.
// Imprime en stdout un JSON con las rutas y dimensiones listas para works.js.

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { IMAGE_WIDTHS: WIDTHS } = require('./lib/load-works')

const ROOT = path.resolve(__dirname, '..')
const SOURCE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.tif', '.tiff', '.webp']
// Fondo de la web (--lightest-color): rellena transparencias y los márgenes de la imagen OG
const BACKGROUND = '#FAFAFA'
const OG_SIZE = { width: 1200, height: 630 }

const parseArgs = (argv) => {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      args[argv[i].slice(2)] = argv[++i]
    } else {
      args._.push(argv[i])
    }
  }
  return args
}

const fail = (message) => {
  console.error(`✖ ${message}`)
  process.exit(1)
}

// Los nombres conservan el de la obra, pero sin espacios: rompen srcset
const toSafeName = (name) => name.trim().replace(/\s+/g, '_')
const toOutputName = (file) => toSafeName(path.parse(file).name)

const listSources = (source) => {
  const stat = fs.statSync(source)
  const files = stat.isDirectory()
    ? fs.readdirSync(source).sort().map(file => path.join(source, file))
    : [source]
  return files.filter(file => SOURCE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
}

const processImage = async (file, outputDir) => {
  const name = toOutputName(file)
  const metadata = await sharp(file).metadata()
  const warnings = []
  if (metadata.space !== 'srgb') warnings.push(`espacio de color ${metadata.space}: convertido a sRGB, revisa los colores`)
  if (metadata.hasAlpha) warnings.push(`tiene transparencia: se rellena con ${BACKGROUND}`)
  if (metadata.width < WIDTHS[WIDTHS.length - 1]) warnings.push(`solo mide ${metadata.width}px de ancho: no se amplía`)

  let largest
  for (const width of WIDTHS) {
    const pipeline = sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .flatten({ background: BACKGROUND })
      .toColourspace('srgb')
    // Solo JPEG (mozjpeg): con ilustración texturizada, WebP y AVIF no pesan menos a igual calidad
    const jpeg = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(outputDir, `${name}_${width}.jpeg`))
    largest = { width: jpeg.width, height: jpeg.height, bytes: jpeg.size }
  }

  return { file, name, originalBytes: fs.statSync(file).size, ...largest, warnings }
}

// La obra entera centrada sobre un fondo hecho con ella misma, ampliada y desenfocada:
// sin recortar la obra ni dejar franjas blancas cuando no es apaisada
const writeOgImage = async (file, slug) => {
  const output = path.join(ROOT, 'public', 'og', `${slug}.jpg`)
  fs.mkdirSync(path.dirname(output), { recursive: true })
  const base = () => sharp(file).rotate().flatten({ background: BACKGROUND }).toColourspace('srgb')
  const background = await base()
    .resize({ ...OG_SIZE, fit: 'cover' })
    .blur(30)
    .modulate({ brightness: 0.8 })
    .toBuffer()
  const artwork = await base()
    .resize({ ...OG_SIZE, fit: 'inside' })
    .toBuffer()
  await sharp(background)
    .composite([{ input: artwork, gravity: 'center' }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(output)
  return path.relative(path.join(ROOT, 'public'), output).replace(/\\/g, '/')
}

const main = async () => {
  const args = parseArgs(process.argv.slice(2))
  const source = args._[0]
  if (!source || !args.slug) fail('Uso: npm run images -- <origen> --slug <slug> [--folder <Carpeta>] [--og <fichero>]')
  if (!fs.existsSync(source)) fail(`No existe ${source}`)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(args.slug)) fail(`Slug no válido: ${args.slug}`)

  const sources = listSources(source)
  if (!sources.length) fail(`No hay imágenes (${SOURCE_EXTENSIONS.join(', ')}) en ${source}`)

  const folder = toSafeName(args.folder || path.basename(fs.statSync(source).isDirectory() ? path.resolve(source) : path.dirname(path.resolve(source))))
  const outputDir = path.join(ROOT, 'src', 'assets', 'images', 'portfolio', folder)
  fs.mkdirSync(outputDir, { recursive: true })

  const results = []
  for (const file of sources) {
    results.push(await processImage(file, outputDir))
  }

  const ogSource = args.og ? path.join(fs.statSync(source).isDirectory() ? source : path.dirname(source), args.og) : sources[0]
  const ogImage = await writeOgImage(ogSource, args.slug)

  const kb = bytes => `${Math.round(bytes / 1024)} KB`
  for (const result of results) {
    console.error(`✔ ${result.name}: ${kb(result.originalBytes)} → ${result.width}px ${kb(result.bytes)}`)
    result.warnings.forEach(warning => console.error(`  ⚠ ${warning}`))
  }
  console.error(`✔ og: public/${ogImage}`)

  console.log(JSON.stringify({
    ogImage,
    images: results.map(result => ({
      image: `portfolio/${folder}/${result.name}`,
      width: result.width,
      height: result.height
    }))
  }, null, 2))
}

main().catch(error => fail(error.message))
