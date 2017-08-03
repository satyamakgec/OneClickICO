const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/server.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  plugins: [

    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/UI/ui/index.html', to: "index.html" },
      // { from : './app/UI/ui/stylesheets/app.css',to: 'app.css'}
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
