const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: ["./src/library/index.js"],
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "html-to-draftjs.js",
    library: "htmlToDraftjs",
    libraryTarget: "umd"
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  externals: {
    "draft-js": "draft-js",
    immutable: "immutable"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json"]
  }
};
