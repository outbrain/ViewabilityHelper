/* global __dirname, require, module*/

const path = require('path');

let plugins = [];

const config = {
  entry: __dirname + '/examples/example.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/examples/',
    filename: 'example.compiled.js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./lib')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
