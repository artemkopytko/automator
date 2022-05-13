const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:5000/',
        logLevel: 'debug',
        pathRewrite: { '^/api': '/api' },
        ws: false
      }
    }
  },
  transpileDependencies: true
})
