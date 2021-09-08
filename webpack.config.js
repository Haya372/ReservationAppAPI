const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

const plugins = [
  new MiniCssExtractPlugin({
    filename: "styles.css",
    chunkFilename: "styles.css"
  }),
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  }),
];

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve('public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
        ],
      },
      {
        test: [/\.js$/, /\.jsx$/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["babel-preset-env", "babel-preset-react"],
            },
          },
        ],
      }
    ]
  },
  plugins: plugins
};