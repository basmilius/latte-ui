/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const deepMerge = require("./rollup/deep-merge");

const commonjs = require("rollup-plugin-commonjs");
const copy = require("rollup-plugin-copy-glob");
const cssnano = require("cssnano");
const json = require("rollup-plugin-json");
const nodeResolve = require("rollup-plugin-node-resolve");
const postcss = require("rollup-plugin-postcss");
const postcssUrl = require("postcss-url");
const vue = require("rollup-plugin-vue");

const pkg = require("./package.json");
const external = Object.keys(pkg.dependencies);

const bundles = [
	{
		input: "src/js/index.js",
		output: {
			file: "dist/latte-ui.js",
			name: "LatteUI"
		}
	},
	{
		input: "src/js/app.js",
		output: {
			file: "dist/latte-ui.app.js",
			name: "LatteUI"
		}
	}
];
const defaultOptions = {
	output: {
		format: "umd",
		globals: {
			"moment": "moment",
			"vue": "Vue"
		},
		sourceMap: false,
		treeshake: false
	},
	external,
	plugins: [

		json(),

		nodeResolve({
			browser: true
		}),

		vue({
			compileTemplate: true,
			template: {
				isProduction: false
			}
		}),

		postcss({
			config: false,
			extensions: [".scss"],
			extract: true,
			minimize: false,
			plugins: [

				postcssUrl({
					url: "inline"
				}),

				cssnano({
					preset: ["advanced", {
						autoprefixer: {
							add: true
						}
					}]
				})

			],
			sourceMap: false,
			use: ["sass"]
		}),

		commonjs(),

		copy([
			{files: "src/sound/**/*", dest: "dist/sound"},
			{files: "src/worklet/**/*", dest: "dist/worklet"}
		])

	]
};

export default bundles.map(bundle => deepMerge(defaultOptions, bundle));
