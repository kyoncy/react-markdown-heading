import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

interface Configuration extends webpack.Configuration, DevServerConfiguration {}

const config: Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, 'example/src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'example/src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    hot: true,
    compress: true,
  },
}

export default config
