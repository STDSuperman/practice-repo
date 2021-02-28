const Config = require('webpack-chain');
const path = require('path');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const VueLoaderPlugin = require('vue-loader-v16/dist/plugin').default
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const config = new Config();
const ProjectDir = path.resolve(__dirname, '../vue3-proj')
const htmlWebpackPlugin = require('html-webpack-plugin')

config.merge(baseConfig);
config.entry('index')
    .add(path.resolve(__dirname, '../vue3-proj/src/index.js'))

config.module
    .rule('vue')
        .test(/\.vue$/)
        .use('vue')
            .loader('vue-loader-v16')

config.devServer.port(5002);
config.devServer.contentBase(path.resolve(__dirname, '../dist/vue3'))
config.output.path(path.resolve(__dirname, '../dist/vue3'));

config.plugin('vue')
    .use(VueLoaderPlugin)
config.plugin('html')
    .use(htmlWebpackPlugin, [{
        template: path.resolve(__dirname, '../index.html'),
        title: 'Vue2 Project'
    }])

config.plugin('mf')
    .use(ModuleFederationPlugin, [{
        name: 'vue3Project',
        filename: 'project.js',
        remotes: {
            '@v2hw': 'vue2Project@http://localhost:5001/hello-world.js'
        },
        exposes: {},
    }])

module.exports = merge(config.toConfig(), baseConfig);