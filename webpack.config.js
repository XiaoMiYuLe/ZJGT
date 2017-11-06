var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        wp_header: [
            path.resolve(__dirname, 'www/static/js/indexMerge.js'),
            path.resolve(__dirname, 'www/static/js/common.js'),
            path.resolve(__dirname, 'www/static/js/header.js'),
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'www/static/js/wp')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
