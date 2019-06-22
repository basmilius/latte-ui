const base = require("./webpack.config");
const merge = require("webpack-merge");
const path = require("path");

/*
 * TODO(Bas): Figure out if we can webpack a library for vue-cli.
 */

module.exports = merge(base, {
	entry: {
		"latte-ui.lib": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/dist/",
		filename: "[name].js",
		library: "@bybas/latte-ui",
		libraryTarget: "commonjs2"
	},
	target: "node"
});
