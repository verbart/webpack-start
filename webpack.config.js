const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    port: 8080,
    overlay: true
  },

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader',
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          }
        ]
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[hash].[ext]'
            }
          }
        ]
      },

      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      templateParameters: {
        ENV: {
          message: 'Hello'
        }
      },
      inject: 'head',
      hash: true
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
};
