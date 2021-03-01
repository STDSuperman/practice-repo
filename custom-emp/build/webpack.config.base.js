const Config = require('webpack-chain');
const path = require('path');

const config = new Config();

config.resolve
    .extensions
    .add('.js')
    .add('.ts')
    .add('.tsx')
    .add('.vue')
    .add('.wasm')
    .add('.json')

config.mode('development')

config.module
    .rule('js')
        .test(/\.js$/)
        .use('babel')
            .loader('babel-loader')

config.module
    .rule('bootstrap')
    .test(/bootstrap\.js$/)
        .use('bundle-loader')
            .loader('bundle-loader')
            .options({
                lazy: true,
            })

config.module
    .rule('ts')
        .test(/\.ts$/)
        .use('ts')
            .loader('ts-loader')

config.module
    .rule('file')
        .test(/\.png|\.jpg|\.jpeg|\.gif$/)
        .use('file')
            .loader('file-loader')
            .options({
                esModule: false
            })

config.module
    .rule('css')
        .test(/\.css$/)
        .use('style')
            .loader('style-loader')
            .end()
        .use('css')
            .loader('css-loader')
            .end()

config.module
    .rule('sass')
        .test(/\.sass$/)
        .use('sass')
            .loader('sass-loader')
            .end()
        .pre()
config.devServer.hot(true);
config.optimization.usedExports(true)

module.exports = config.toConfig();