const Config = require('webpack-chain');
const path = require('path');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { VueLoaderPlugin  } = require('vue-loader')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const config = new Config();
const projectDir = path.resolve(__dirname, '../vue2-proj')
const htmlWebpackPlugin = require('html-webpack-plugin')

config.entry('index')
    .add(path.resolve(__dirname, '../vue2-proj/src/main.js'))

config.module
.rule('vue')
    .test(/\.vue$/)
    .use('vue')
        .loader('vue-loader')

config.devServer.port(5001);
config.devServer.contentBase(path.resolve(__dirname, '../dist/vue2'))
config.output.path(path.resolve(__dirname, '../dist/vue2'));

config.plugin('vue').use(VueLoaderPlugin)

config.plugin('mf')
    .use(ModuleFederationPlugin, [{
        name: 'vue2Project',
        filename: 'hello-world.js',
        exposes: {
            './HelloWorld': path.resolve(projectDir, './src/components/HelloWorld')
        },
        shared: {
            vue: {
                import: "vue",
                shareKey: "vue",
                shareScope: "default",
                singleton: true
            },
            'ant-design-vue': {
                import: "ant-design-vue",
                shareKey: "ant-design-vue",
                shareScope: "default",
                singleton: true,
            }
        }
    }])

config.plugin('html')
    .use(htmlWebpackPlugin, [{
        template: path.resolve(projectDir, './index.html')
    }])

module.exports = merge(config.toConfig(), baseConfig);