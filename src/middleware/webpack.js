//import webpackDevMiddleware from 'think-webpack-dev-middleware';
//import webpackHotMiddleware from 'think-webpack-hot-middleware';
const webpackDevMiddleware = require('think-webpack-dev-middleware');
const webpackHotMiddleware = require('think-webpack-hot-middleware');
const webpack = require('webpack');

module.exports = (options = {}) => {
    const compiler = webpack(options);
    think.middleware('webpack-dev', webpackDevMiddleware(
        compiler, {
            stats: {
                colors: true
            }
        }
    ));
    think.middleware('webpack-hot', webpackHotMiddleware(
        compiler, {
            log: think.log
        }
    ))
}