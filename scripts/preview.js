// Previsualizaciones ligeras de originales para revisarlos (Claude las mira con Read).
//
//   node scripts/preview.js <origen> <carpeta-salida> [--size 1024]
//
// <origen> es un fichero o una carpeta. Escribe JPEG de --size px de lado mayor y lista
// los datos del original que importan para publicar. Nunca modifica el origen.

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const SOURCE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.tif', '.tiff', '.webp']

const main = async () => {
  const [source, outputDir] = process.argv.slice(2).filter(arg => !arg.startsWith('--'))
  const sizeIndex = process.argv.indexOf('--size')
  const size = sizeIndex > -1 ? parseInt(process.argv[sizeIndex + 1], 10) : 1024
  if (!source || !outputDir) throw new Error('Uso: node scripts/preview.js <origen> <carpeta-salida> [--size 1024]')

  const files = fs.statSync(source).isDirectory()
    ? fs.readdirSync(source).sort().map(file => path.join(source, file))
    : [source]
  fs.mkdirSync(outputDir, { recursive: true })

  for (const file of files.filter(file => SOURCE_EXTENSIONS.includes(path.extname(file).toLowerCase()))) {
    const metadata = await sharp(file).metadata()
    const output = path.join(path.resolve(outputDir), `${path.parse(file).name.replace(/\s+/g, '_')}.jpeg`)
    await sharp(file).rotate().resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#FAFAFA' }).toColourspace('srgb').jpeg({ quality: 80 }).toFile(output)
    const stat = fs.statSync(file)
    console.log([
      path.basename(file),
      `${metadata.width}x${metadata.height}`,
      metadata.space,
      metadata.hasAlpha ? 'transparencia' : 'opaca',
      `${Math.round(stat.size / 1024)} KB`,
      `modificado ${stat.mtime.toISOString().slice(0, 10)}`,
      `→ ${output}`
    ].join(' · '))
  }
}

main().catch(error => {
  console.error(`✖ ${error.message}`)
  process.exit(1)
})
