const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "develpoment",
  entry: {
    game: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "scripts/main.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  module: {
    rules: [
      { test: /.ts$/, loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  }
}