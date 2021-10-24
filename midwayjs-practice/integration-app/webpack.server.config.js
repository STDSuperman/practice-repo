var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    server: './ssr.entry.js'
  },
  target: 'node',
  output: {
    path: path.join(process.cwd(), 'build/static/ssr'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules:[
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          {
            loader: require.resolve('@midwayjs/hooks-loader'),
          },
        ],
      },
      {
        test: /(react|.)\.jsx|.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [require.resolve('@babel/preset-env'), {
                  targets: {
                    browsers: ['last 2 versions', 'IE >= 9']
                  },
                  modules: false,
                  loose: true
                }],
                [require.resolve('@babel/preset-react')],
                [require.resolve('@babel/preset-typescript')]
              ],
              plugins: [
                [require.resolve('@babel/plugin-transform-runtime')],
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
  ]
};