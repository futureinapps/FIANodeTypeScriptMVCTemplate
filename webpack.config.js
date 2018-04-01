"use strict";
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    context:__dirname + '/public/js/src',
    entry: {
        main: "./main.js"
    },
    output: {
        filename: "[name].site.js",
        path: __dirname + '/public/js'
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude:/(node_modules|bower_components|lib)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin()
    ]
};