module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/client_manager_pfdo/'
  : '/',
  devServer: {
    proxy: 'https://api-test.pfdo.ru',
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    // autoOpenBrowser: false,
    // errorOverlay: true,
    // notifyOnErrors: true,
    // poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  },

}