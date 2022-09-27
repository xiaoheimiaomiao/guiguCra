const express = require('express');

const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

module.exports = function (app) {
  app.use(
    '^/api',
    createProxyMiddleware({
      target: 'http://119.91.101.74:5003',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  );
};

app.listen(3001);
