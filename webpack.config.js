const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {

  // the entry point(s) of compiling
  entry: {
    topTracksApp: './src/TopTracksApp/index.jsx',
    login: './src/login.js'
  },

  // output(s) of compiling
  output: {
    filename: './public/build/[name].js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  // extra rules, specific cases and injections
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath]
      },
    ]
  },

  // extra plugins
  plugins: [
    new LiveReloadPlugin()
  ]
}
