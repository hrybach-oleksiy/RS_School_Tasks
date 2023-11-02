const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let isDev = process.env.NODE_ENV === 'development';
let isProd = !isDev;
const fileName = ext => isDev ? `[name]${ext}` : `[name].[contenthash:8]${ext}`;

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	mode: 'development',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: `${fileName('.js')}`,
		// clean: true,
		assetModuleFilename: `assets/${fileName('[ext]')}`,
	},
	devtool: isProd ? false : 'source-map',
	module: {
		rules: [
			{
				test: /\.html$/i,
				use: 'html-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					isProd ? MiniCssExtractPlugin.loader : "style-loader",
					'css-loader',
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											browsers: 'last 2 versions',
										},
									],
								],
							},
						},
					},
					'sass-loader'
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
			// {
			//     test: /\.js$/,
			//     exclude: /node_modules/,
			//     use: ['babel-loader'],
			// },
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
			filename: 'index.html',
			minify: {
				collapseWhitespace: isProd,
				removeComments: isProd,
				removeRedundantAttributes: isProd,
				useShortDoctype: isProd,
			}
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
	],
	devServer: {
		watchFiles: path.join(__dirname, 'src'),
		port: 9000,
	},

};