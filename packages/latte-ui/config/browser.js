const base = require("./webpack.config");
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge(base, {
	entry: {
		"latte-ui": "./src/js/index.js"
	},
	externals: {
		moment: "moment",
		vue: "Vue"
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/dist/",
		filename: "[name].js"
	}
});
