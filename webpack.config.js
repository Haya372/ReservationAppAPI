const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const TailwindCss = require('tailwindcss')
const Autoprefixer = require('autoprefixer');

const plugins = [
  new MiniCssExtractPlugin({
    filename: "styles.css",
    chunkFilename: "[name]-[chunkhash].css"
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
    filename: '[name]-[chunkhash].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  TailwindCss,
                  Autoprefixer
                ]
              }
            }
          }
        ],
      },
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 1000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: plugins
};