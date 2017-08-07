'use strict';

var webpack = require('webpack')

module.exports = {

  entry: ['./example/index.js'],

  debug: false,

  output: {
    filename: './example/bundle.js',
    pathinfo: true
  },

  module: {
    loaders: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['react', 'es2015']
      }
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]

};
