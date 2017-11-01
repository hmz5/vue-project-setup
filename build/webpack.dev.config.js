/**
 * @author H_MZ
 * @description webpack dev 服务配置文件
 */

var webpack = require('webpack');
var helpers = require('./helpers');
var commonWebpack = require('./webpack.base.config');
// 提取css
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 自动添加css浏览器前缀
var autoprefixer = require('autoprefixer');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

// add hot-reload related code to entry chunks
Object.keys(commonWebpack.entry).forEach(function (name) {
    commonWebpack.entry[name] = [commonWebpack.entry[name], hotMiddlewareScript];
});

const METADATA = {
    host: './'
};

module.exports = Object.assign({}, commonWebpack, {
    // devServer: {
    //     historyApiFallback: {
    //         index: '/index.html',
    //         // rewrites: [{
    //         //     from: /^\/test\/.*$/,
    //         //     to: function(context) {
    //         //         return '/test' + context.parsedUrl.pathname
    //         //     }
    //         // }, {
    //         //     from: /\/test/,
    //         //     to: '/test.html'
    //         // }]
    //     }
    // },
    // 开发环境设定独立的插件
    plugins: [
        // commonsPlugin 可以用于分析模块的共用代码, 单独打一个包出来
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        // 提取css为单文件
        // new ExtractTextPlugin("css/style.css"),
        // 在合并的代码上进行定制有点麻烦, Webpack 提供了设置环境变量来优化代码的方案:
        new webpack.DefinePlugin({
            // 配置组件中使用的变量,组件中可以直接使用{metadata.host}
            metadata: JSON.stringify(METADATA),
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({
                    browsers: ['last 10 versions']
                }), require('postcss-pxtorem')({
                    rootValue: 100,
                    propWhiteList: []
                })],
                // 供html使用的变量<%= metadata.host %>
                metadata: METADATA
            },
            vue: {
                // use postcss plugins
                postcss: [autoprefixer({
                    browsers: ['last 10 versions']
                }), require('postcss-pxtorem')({
                    rootValue: 100,
                    propWhiteList: []
                })]
            }
        }),
        // 热更新（如果webpack-dev-server中添加了--hot，这里再次引用，热更新时就会报错）
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // 启用作用域提升特性来避免这种额外的性能损耗
        new webpack.optimize.ModuleConcatenationPlugin(),
        new FriendlyErrorsPlugin()
        // concat进行数组合并
    ].concat(helpers.getHtmlPlugin())
});