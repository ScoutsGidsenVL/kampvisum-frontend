const path = require('path')

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'nl',
      fallbackLocale: 'nl',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue'),
        'dropzone': path.resolve('./node_modules/dropzone'),
        'vue-router': path.resolve('./node_modules/vue-router'),
        'vee-validate': path.resolve('./node_modules/vee-validate'),
        '@vee-validate/i18n': path.resolve('./node_modules/@vee-validate/i18n'),
        '@vee-validate/rules': path.resolve('./node_modules/@vee-validate/rules'),
        '@vee-validate/rules': path.resolve('./node_modules/@vee-validate/rules'),
        '@vue-leaflet/vue-leaflet': path.resolve('./node_modules/@vue-leaflet/vue-leaflet'),
      },
    },
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    }
  }
}
