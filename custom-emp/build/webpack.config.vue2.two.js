const Config = require('webpack-chain');
const path = require('path');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { VueLoaderPlugin  } = require('vue-loader')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const config = new Config();
const projectDir = path.resolve(__dirname, '../vue2-proj-two')
const htmlWebpackPlugin = require('html-webpack-plugin')

config.entry('index')
    .add(path.resolve(__dirname, '../vue2-proj-two/src/index.js'))

config.module
.rule('vue')
    .test(/\.vue$/)
    .use('vue')
        .loader('vue-loader')

config.devServer.port(5004);
config.devServer.contentBase(path.resolve(__dirname, '../dist/vue2-two'))
config.output.path(path.resolve(__dirname, '../dist/vue2-two'));

config.plugin('vue').use(VueLoaderPlugin)

config.plugin('mf')
    .use(ModuleFederationPlugin, [{
        name: 'vue2TwoProject',
        filename: 'hello-world.js',
        exposes: {
            './HelloWorld': path.resolve(projectDir, './src/components/HelloWorld')
        },
        remotes: {
            '@v2hw': 'vue2Project@http://localhost:5001/hello-world.js'
        }
    }])

config.plugin('html')
    .use(htmlWebpackPlugin, [{
        template: path.resolve(projectDir, './index.html')
    }])

module.exports = merge(config.toConfig(), baseConfig);