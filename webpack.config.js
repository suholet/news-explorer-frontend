const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    index: ["./src/js/index.js", "./src/pages/index.css"],
    news: ["./src/js/news.js", "./src/pages/news.css"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          "file-loader?name=./images/[name].[ext]",
          {
            loader: "image-webpack-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ["file-loader?name=./vendor/fonts/[name].[ext]"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "index.[contenthash].css",
      filename: "[name].[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/news.html",
      filename: "news.html",
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
