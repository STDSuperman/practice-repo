const Config = require('webpack-chain');
const path = require('path');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const config = new Config();
const projectDir = path.resolve(__dirname, '../react-proj')
const htmlWebpackPlugin = require('html-webpack-plugin')

config.entry('index')
    .add(path.resolve(__dirname, '../react-proj/src/index'))


config.devServer.port(5003);
config.devServer.contentBase(path.resolve(__dirname, '../dist/react'))
config.output.path(path.resolve(__dirname, '../dist/react'));

config.plugin('mf')
    .use(ModuleFederationPlugin, [{
        name: 'reactProject',
        filename: 'hello-world.js',
        exposes: {
            './HelloWorld': path.resolve(projectDir, './src/App.tsx')
        },
        remotes: {
            '@v2hw': 'vue2Project@http://localhost:5001/hello-world.js'
        }
    }])

config.plugin('html')
    .use(htmlWebpackPlugin, [{
        title: 'React Project',
        template: path.resolve(projectDir, './index.html')
    }])

module.exports = merge(config.toConfig(), baseConfig);