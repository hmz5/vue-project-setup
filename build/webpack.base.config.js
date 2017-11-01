/**
 * @author H_MZ
 * @description webpack 公共文件
 */

var path = require('path');
var helpers = require('./helpers');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件
    entry: helpers.getEntry(),

    // 输出文件
    output: {
        path: path.resolve(__dirname, '../client'),
        filename: 'js/[name].js?v=[hash]',
        chunkFilename: 'js/[name].js?v=[hash]',
        publicPath: '/'
    },

    resolve: {
        // 定义模块缩写名称
        alias: {
            'components': path.join(__dirname, '../src/components'),
            'images': path.join(__dirname, '../src/assets/images'),
            'style': path.join(__dirname, '../src/assets/scss'),
            'js': path.join(__dirname, '../src/assets/js'),
            'service': path.join(__dirname, '../src/service')
        },
        // resolve 指定可以被 import 的文件后缀
        extensions: ['.js', '.css', '.scss', '.vue']
    },

    module: {
        // 加载器配置
        rules: [
            //     {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [path.join(__dirname, '../src')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // }, 
            {
                test: /\.vue$/,
                loader: 'vue-loader'
                // exclude: /node_modules/
            }, {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
                // use: ExtractTextPlugin.extract({
                //     use: ['css-loader', 'postcss-loader'],
                //     fallback:'style-loader'
                // })
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                // use: ExtractTextPlugin.extract({
                //     use: ["css-loader", "postcss-loader", "sass-loader"],
                //     fallback:"style-loader"
                // })
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_module/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        limit: '3000'
                    }
                }]
            }
        ]
    }
};