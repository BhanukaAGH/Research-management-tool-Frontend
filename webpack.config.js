const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    publicPath: '/',
  },

  target: 'web',
  devServer: {
    port: '3000',
    static: ['./public'],
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?limit=10000&mimetype=image/png',
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './public/index.html' }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
}
