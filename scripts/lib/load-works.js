// Carga src/views/data/works.js (módulo ES) desde los scripts de Node (CommonJS).
// Transpila al vuelo los ficheros de src/ con Babel.
// Los ficheros de datos solo pueden usar imports relativos: el alias @/ no existe fuera de Vite.

const Module = require('module')
const path = require('path')
const babel = require('@babel/core')

const ROOT = path.resolve(__dirname, '..', '..')
const SRC = path.join(ROOT, 'src') + path.sep
const loadJs = Module._extensions['.js']

Module._extensions['.js'] = function (module, filename) {
  if (!filename.startsWith(SRC)) {
    return loadJs(module, filename)
  }
  const { code } = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')]
  })
  module._compile(code, filename)
}

module.exports = {
  ROOT,
  SITE_URL: 'https://raulgarcia.me',
  ...require(path.join(ROOT, 'src', 'views', 'data', 'works.js')),
  ...require(path.join(ROOT, 'src', 'views', 'data', 'categories.js')),
  ...require(path.join(ROOT, 'src', 'views', 'data', 'imageWidths.js')),
  ...require(path.join(ROOT, 'src', 'views', 'data', 'pages.js'))
}
