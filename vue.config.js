const path = require('path')

// @unhead/vue 1.x targets modern bundlers. Webpack 4 needs two workarounds:
// - transpile it, because it ships optional chaining that webpack 4 cannot parse
// - point its dependencies to their ESM builds, because webpack 4 resolves them to CommonJS
const UNHEAD_ESM_DEPS = ['unhead', '@unhead/shared', '@unhead/dom', '@unhead/schema', 'hookable', 'packrup']

module.exports = {
  transpileDependencies: ['@unhead/vue', ...UNHEAD_ESM_DEPS],
  configureWebpack: {
    resolve: {
      alias: Object.fromEntries(UNHEAD_ESM_DEPS.map(dep => [
        `${dep}$`,
        path.resolve(__dirname, 'node_modules', dep, 'dist/index.mjs')
      ]))
    }
  }
}
