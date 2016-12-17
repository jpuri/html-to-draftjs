const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/lib',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'html-to-draftjs.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
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
    new ExtractTextPlugin('authored-editor.css', {
      allChunks: true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel-loader',
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader'
        ),
      }, {
        test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
    ],
  },
  postcss: () => [autoprefixer, precss],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
