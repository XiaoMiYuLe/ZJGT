var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'wp_header': [
            './www/static/js/indexMerge.js',
            './www/static/js/common.js',
            './www/static/js/header.js',
        ]
    },
    output: {
        filename: '[name].[chunkHash:8].js',
        path: path.resolve(__dirname,'./www/static/js/wp/'),
        publicPath: 'static/js/wp',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: "This is the result", //生成的HTML模板的title，如果模板中有设置title的名字，则会忽略这里的设置
            filename: "../../../../view/header2.html", //生成的模板文件的名字
            template: "./view/header.html", //模板来源文件
            inject: 'head', //引入模块的注入位置；取值有true/false/body/head
            favicon: "", //指定页面图标
            minify: { //是html-webpack-plugin中集成的 html-minifier ，生成模板文件压缩配置，有很多配置项
                caseSensitive: false, //是否大小写敏感
                collapseBooleanAttributes: false, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
                collapseWhitespace: false //是否去除空格
            },
            hash: false, //是否生成hash添加在引入文件地址的末尾，类似于我们常用的时间戳
            cache: true, //是否需要缓存，如果填写true，则文件只有在改变时才会重新生成
            showErrors: true, //是否将错误信息写在页面里，默认true，出现错误信息则会包裹在一个pre标签内添加到页面上
            chunks: "", //引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入
            chunksSortMode: "auto", //引入模块的排序方式
            excludeChunks: "", //排除的模块
            xhtml: false //生成的模板文档中标签是否自动关闭，针对xhtml的语法，会要求标签都关闭，默认false
        })
    ]
}
