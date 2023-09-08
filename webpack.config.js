const webpack = require("webpack");
const aaConfigsWebpack = require("@allaround/configs-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const dotenv = require("dotenv");

const env = dotenv.config({ path: `.env.${process.env.STAGING_ENV}` }).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const isDev = process.env.STAGING_ENV === "dev";
const TREEMAP = process.env.TREEMAP === "true";

module.exports = () => {
  // const publicPath = isDev ? "http://localhost:3000" : "http://localhost:3000";
  const publicPath = ".";

  const rules = [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: "ts-loader",
    },
    {
      test: /\.s?css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
  ];

  const output = {
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  };

  const plugins = [
    new webpack.DefinePlugin(envKeys),
    isDev && new ReactRefreshWebpackPlugin(),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
      publicPath,
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/icons", to: "icons" },
        { from: "src/logo", to: "logo" },
        { from: "public/manifest.json" },
      ],
    }),
    new ESLintPlugin(),
    TREEMAP && new BundleAnalyzerPlugin(),
  ].filter(Boolean);

  const devServer = {
    historyApiFallback: true,
  };

  const rest = {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          minify: TerserPlugin.uglifyJsMinify,
        }),
      ],
      splitChunks: {
        chunks: "all",
      },
    },
  };

  const webpackConfig = aaConfigsWebpack({
    mode: isDev ? "development" : "production",
    rules,
    rest,
    plugins,
    devServer,
    output,
  });

  // console.log(webpackConfig);

  return webpackConfig;
};
