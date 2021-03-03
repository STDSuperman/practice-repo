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
        .test(/\.(js|tsx|ts)$/)
        .use('babel')
            .loader('babel-loader')
            .options({
                presets: [
                    [
                      require('@babel/preset-env').default,
                      {
                        useBuiltIns: 'entry',
                        debug: false,
                        corejs: 3,
                        bugfixes: true,
                        exclude: ['transform-typeof-symbol'],
                      },
                    ],
                    '@babel/preset-typescript',
                    '@babel/preset-react'
                  ],
                  plugins: [
                    [
                      require('@babel/plugin-transform-runtime').default,
                      {
                        corejs: false,
                        helpers: true,
                        version: require('@babel/runtime/package.json').version,
                        regenerator: true,
                        useESModules: false,
                        absoluteRuntime: false,
                      },
                    ],
                    [require('@babel/plugin-proposal-decorators').default, {legacy: true}],
                    [require('@babel/plugin-proposal-class-properties').default, {loose: true}],
                  ]
            })

// config.module
//     .rule('bootstrap')
//     .test(/bootstrap\.js$/)
//         .use('bundle-loader')
//             .loader('bundle-loader')
//             .options({
//                 lazy: true,
//             })

config.module
    .rule('ts')
        .test(/\.ts$/)
        .use('ts')
            .loader('ts-loader')

config.module
    .rule('file')
        .test(/\.png|\.jpg|\.jpeg|\.gif|\.svg$/)
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