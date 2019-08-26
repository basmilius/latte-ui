/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

let fs = require("fs");
let path = require("path");
let webpack = require("webpack");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

let {VueLoaderPlugin} = require("vue-loader");

const rootDir = path.join(__dirname, "../");

module.exports = {
	optimization: {
		minimizer: [
			new TerserJSPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					compress: {
						booleans_as_integers: true,
						drop_console: true,
						keep_fargs: false,
						toplevel: true,
						unsafe: true,
						unsafe_proto: true,
						unsafe_undefined: true
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({
				canPrint: false,
				cssProcessor: require("cssnano"),
				cssProcessorPluginOptions: {
					preset: ["advanced", {
						autoprefixer: {
							add: true
						},
						discardComments: {
							removeAll: true
						},
						mergeIdents: true,
						reduceIdents: true
					}]
				}
			})
		]
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					compilerOptions: {
						whitespace: "condense"
					},
					exposeFilename: false,
					extractCSS: true,
					prettify: false,
					loaders: {
						"css": ["vue-style-loader", {
							loader: MiniCssExtractPlugin.loader
						}],
						"scss": "vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap"
					}
				}
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: [
					path.resolve(__dirname, "../src")
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					"uglify-template-string-loader"
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					publicPath: "./"
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							sourceMap: true
						}
					},
					"css-loader?sourceMap",
					"postcss-loader?sourceMap",
					"sass-loader?sourceMap"
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			canPrint: false,
			chunkFilename: "[id].css",
			publicPath: "./"
		}),
		new CopyPlugin([
			{from: `${rootDir}/src/sound`, to: `${rootDir}/dist/sound`},
			{from: `${rootDir}/src/worklet`, to: `${rootDir}/dist/worklet`}
		])
	],
	resolve: {
		extensions: [".ts", ".js", ".vue", ".json"],
		alias: {
			"vue$": "vue/dist/vue.esm.js"
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	performance: {
		hints: false
	},
	devtool: "source-map",
	mode: process.env.NODE_ENV === "production" ? "production" : "development"
};

if (process.env.NODE_ENV === "production")
{
	module.exports.devtool = "source-map";
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new webpack.BannerPlugin({
			banner: fs.readFileSync("config/license-header.txt", "utf8").trim(),
			test: /\.(css|js)$/
		})
	]);
}
