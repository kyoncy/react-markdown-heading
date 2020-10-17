import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration
}

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
