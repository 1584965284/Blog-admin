const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api2',
        {
            "target": "http://114.55.119.223/prod-api",
            
            "changeOrigin": true,
            "pathRewrite": {
                "^/api2": ""
            }
        }))
}
