const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let isDev = process.env.NODE_ENV === 'development';
let isProd = !isDev;
const fileName = (ext) =>
  isDev ? `[name]${ext}` : `[name].[contenthash:8]${ext}`;

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${fileName('.js')}`,
    // clean: true,
    assetModuleFilename: `assets/${fileName('[ext]')}`,
  },
  optimization: {
    usedExports: false,
  },
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
        type: 'asset/resource',
      },
      // {
      //     test: /\.svg$/,
      //     type: 'asset/resource',
      //     generator: {
      //         filename: path.join('[name].[contenthash:8][ext]'),
      //     },
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        useShortDoctype: isProd,
      },
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${fileName('.css')}`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/assets'),
        },

        {
          from: path.resolve(__dirname, 'src/assets/sounds'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9000,
  },
};
