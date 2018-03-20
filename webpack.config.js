var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var config = {
    target: 'web',
    entry: {
        bundle: APP_DIR + '/index.js'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    node: {
        fs: 'empty'
    },
    externals: [
        {"./cptable": "var cptable"}
    ],
    module: {
        rules: [
            {
                test: /\.js?/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2016']
                }
            },
            {
                test: [/\.css$/, /\.scss$/],
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        modules: 'true'
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        modules: 'true'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [ { loader: "html-loader" } ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.es6', '.css', '.scss',
            '.json',
            '.web.jsx',
            '.jsx'],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
            jszip: 'xlsx/jszip.js'
        }
    }
};

module.exports = config;