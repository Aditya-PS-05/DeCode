const express = require('express');
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 2000; 

const target = 'http://localhost:9000/2015-03-31/functions/function/invocations'; 

const proxyMiddleware = createProxyMiddleware({
  target,
  changeOrigin: true,
  ws: true, 
  pathRewrite: {
    '^/api': '', 
  },
});
app.use(cors());
app.use('/api', proxyMiddleware);

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});