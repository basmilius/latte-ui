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

module.exports = merge(base, {
	entry: {
		"latte-ui": "./src/js/index-browser.js"
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
