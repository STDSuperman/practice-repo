const Config = require('webpack-chain');
const path = require('path');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const config = new Config();
const projectDir = path.resolve(__dirname, '../library')

config.entry('index')
    .add(path.resolve(projectDir, './index'))


config.devServer.port(5005);
config.devServer.contentBase(path.resolve(__dirname, '../dist/library'))
config.output.path(path.resolve(__dirname, '../dist/library'));

config.plugin('mf')
    .use(ModuleFederationPlugin, [{
        name: 'Library',
        filename: 'library',
        exposes: {
            './library': path.resolve(projectDir, './index')
        }
    }])

module.exports = merge(config.toConfig(), baseConfig);