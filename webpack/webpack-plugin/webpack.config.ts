import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import * as path from 'path';

const devServer: DevServerConfiguration = {
  static: path.join(__dirname, "dist"),
  compress: true,
  port: 4000,
}

const config: Configuration = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.ts(x)?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
        },
      }
    }]
  },
  devServer,
};

export default config;