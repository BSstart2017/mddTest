const path = require('path')
module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@env': path.resolve(__dirname, 'env.ts'),
  }
  return config
}
