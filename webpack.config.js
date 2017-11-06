var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        header: []
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
