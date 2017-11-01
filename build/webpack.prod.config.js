/**
 * @author H_MZ
 * @description webpack 打包配置文件
 */

var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');
var commonWebpack = require('./webpack.base.config');
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin');
// 自动添加css浏览器前缀
var autoprefixer = require('autoprefixer');

const METADATA = {
    // 可换成cdn地址
    host: './'
};

module.exports = Object.assign({}, commonWebpack, {

    // 生产环境设定独立的插件
    plugins: [
        // 清理dist目录
        new CleanPlugin(['client'], {
            root: path.resolve(__dirname, '../'), // An absolute path for the root.
            verbose: true, // Write logs to console.
            dry: false // Use boolean "true" to test/emulate delete. (will not remove files).
            // exclude: ["dist/1.chunk.js"],
            // watch: false // If true, remove files on recompile. (Default: false)
        }),
        // commonsPlugin 可以用于分析模块的共用代码, 单独打一个包出来
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        // 提取css为单文件
        // new ExtractTextPlugin("style.css"),
        // 压缩js代码
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        // 在合并的代码上进行定制有点麻烦, Webpack 提供了设置环境变量来优化代码的方案:
        new webpack.DefinePlugin({
            // 配置组件中使用的变量,组件中可以直接使用{metadata.host}
            metadata: JSON.stringify(METADATA),
            'process.env': {
                NODE_ENV: JSON.stringify('production')
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
        // new ExtractTextPlugin({
        //     filename: 'css/[name].css?v=[hash]',
        //     allChunks: true
        // }),
        // 启用作用域提升特性来避免这种额外的性能损耗
        new webpack.optimize.ModuleConcatenationPlugin()
        // concat进行数组合并
    ].concat(helpers.getHtmlPlugin())
});