const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('111111111111111111')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://124.222.167.196:5000',
      changeOrigin: true,
    })
  );
};