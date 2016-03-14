'use strict';

var path = require('path');


var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, '');

var config = {
  entry: APP_DIR + '/app/components/routes.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: APP_DIR,
      exclude: '/node_modules/',
      loader: 'babel',
      query: {
        compact: false
      }
    }]
  }
};

module.exports = config;
