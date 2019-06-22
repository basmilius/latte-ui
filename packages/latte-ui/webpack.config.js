let path = require("path");
let webpack = require("webpack");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

let {VueLoaderPlugin} = require("vue-loader");

module.exports = {
	entry: {
		"latte-ui": "./src/js/index.js"
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist/",
		filename: "[name].js"
	},
	externals: {
		moment: "moment",
		vue: "Vue"
	},
	optimization: {
		minimizer: [
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({
				cssProcessor: require("cssnano"),
				cssProcessorPluginOptions: {
					preset: ["advanced", {
						autoprefixer: {
							add: true
						},
						discardComments: {
							removeAll: true
						}
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
					extractCSS: true,
					loaders: {
						"css": ["vue-style-loader", {
							loader: MiniCssExtractPlugin.loader
						}],
						"scss": "vue-style-loader!css-loader!sass-loader",
						"sass": "vue-style-loader!css-loader!sass-loader?indentedSyntax"
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
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]?[hash]"
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
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
	devtool: "#eval-source-map",
	mode: process.env.NODE_ENV === "production" ? "production" : "development"
};

if (process.env.NODE_ENV === "production")
{
	module.exports.devtool = "#source-map";
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}
