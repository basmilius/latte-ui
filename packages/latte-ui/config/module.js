/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

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
