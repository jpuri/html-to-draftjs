const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/library/index.js',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'html-to-draftjs.js',
    library: 'htmlToDraftjs',
    libraryTarget: 'umd',
  },
  externals: {
    'draft-js': 'draft-js',
    immutable: 'immutable',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};
