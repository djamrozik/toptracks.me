const path = require('path')
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {

  // the entry point(s) of compiling
  entry: './src/index.js',

  // output(s) of compiling
  output: {
    filename: './public/build/index.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  // extra rules, specific cases and injections
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath]
      },
    ]
  }
}
