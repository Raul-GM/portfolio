// Ratio de contraste WCAG entre colores.
//
//   node scripts/contrast.js                 matriz de todos los colores de _colors.scss
//   node scripts/contrast.js <color> <fondo>  un par (hex, o nombre de variable: secondary-color)
//
// AA exige 4.5 en texto normal, 3 en texto grande (≥ 24px, o ≥ 18.66px en negrita) y 3 en
// componentes de interfaz y foco.

const fs = require('fs')
const path = require('path')

const COLORS_FILE = path.resolve(__dirname, '..', 'src', 'assets', 'styles', '_colors.scss')

const readColors = () => {
  const source = fs.readFileSync(COLORS_FILE, 'utf8')
  const colors = {}
  for (const [, name, value] of source.matchAll(/--([\w-]+):\s*([^;]+);/g)) colors[name] = value.trim()
  // Resuelve var(--otra)
  for (const name of Object.keys(colors)) {
    let value = colors[name]
    while (/^var\(--([\w-]+)\)$/.test(value)) value = colors[value.match(/^var\(--([\w-]+)\)$/)[1]]
    colors[name] = value
  }
  return Object.fromEntries(Object.entries(colors).filter(([, value]) => /^#[0-9a-f]{6}$/i.test(value)))
}

const luminance = (hex) => {
  const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

const ratio = (a, b) => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

const verdict = value => value >= 4.5 ? 'AA' : value >= 3 ? 'AA grande/UI' : 'falla'

const colors = readColors()
const resolve = value => colors[value.replace(/^--/, '')] || value
const [first, second] = process.argv.slice(2)

if (first && second) {
  const [a, b] = [resolve(first), resolve(second)]
  if (![a, b].every(value => /^#[0-9a-f]{6}$/i.test(value))) {
    console.error(`✖ Colores no válidos. Variables disponibles: ${Object.keys(colors).join(', ')}`)
    process.exit(1)
  }
  const value = ratio(a, b)
  console.log(`${first} (${a}) sobre ${second} (${b}): ${value.toFixed(2)}:1 → ${verdict(value)}`)
} else {
  const names = Object.keys(colors)
  console.log(`Colores de _colors.scss: ${names.map(name => `${name}=${colors[name]}`).join('  ')}\n`)
  for (const [i, a] of names.entries()) {
    for (const b of names.slice(i + 1)) {
      if (colors[a] === colors[b]) continue
      const value = ratio(colors[a], colors[b])
      console.log(`${value.toFixed(2).padStart(6)}:1  ${verdict(value).padEnd(13)} ${a} / ${b}`)
    }
  }
}
