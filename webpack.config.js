const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

const plugins = [
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
        use: ["style-loader", "css-loader"]
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