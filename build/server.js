/**
 * @author H_MZ
 * @description 启服务文件
 */

var opn = require('opn');
var path = require('path');
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var config = require('./config.js')[process.env.NODE_ENV] || require('./config.js').dev;

var port = process.env.PORT || 8080;
var uri = 'http://localhost:' + port;
var autoOpenBrowser = config.autoOpenBrowser;

var app = express();

var proxyTable = {
    context: [
        '/app'
    ],
    proxypath: config.API_PATH
};

// proxy api requests
var options = {
    target: proxyTable.proxypath,
    changeOrigin: true
};

if (proxyTable.context.length) {
    app.use(proxyMiddleware(proxyTable.context, options));
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

if (process.env.NODE_ENV === 'development') {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.dev.config');
    var compiler = webpack(webpackConfig);
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: false,
        heartbeat: 2000
    });

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            });
            cb();
        });
    });
    // serve webpack bundle output
    app.use(devMiddleware);

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);

    console.log('> Starting dev server...');
    console.log('> Listening at ' + uri + '\n');
    var _resolve;
    var readyPromise = new Promise(resolve => {
        _resolve = resolve;
    });

    devMiddleware.waitUntilValid(() => {
        if (autoOpenBrowser) {
            opn(uri);
        }
        _resolve();
    });
} else {
    if (autoOpenBrowser) {
        opn(uri);
    }
    // serve pure static assets
    app.use(express.static(path.join(__dirname, '../client')));
}

var server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    }
};