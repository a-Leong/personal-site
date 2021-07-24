module.exports = {
  devServer: {
    host: '0.0.0.0',
  },
  chainWebpack: config => {
    config.module
      .rule('url-loader')
      .test(/\.(woff)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .end()
  },
}
