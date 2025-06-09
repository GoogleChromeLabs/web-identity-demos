const path = require('path');

module.exports = {
  entry: "./public/components.js",
  mode: "production",
  output: {
    filename: "components-bundle.js",
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /components\.js$/,
      loader: 'babel-loader',
      options: {presets: ['env']}
    }]
  }
};