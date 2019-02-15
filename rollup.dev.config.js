/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const postcss = require("rollup-plugin-postcss");

const commonjs = require("rollup-plugin-commonjs");
const copy = require("rollup-plugin-copy-glob");
const cssnano = require("cssnano");
const json = require("rollup-plugin-json");
const nodeResolve = require("rollup-plugin-node-resolve");
const vue = require("rollup-plugin-vue");

const pkg = require("./package.json");
const external = Object.keys(pkg.dependencies);

export default {
	input: "src/js/app.js",
	output: {
		file: "dist/latte.js",
		format: "umd",
		globals: {
			"moment": "moment",
			"vue": "Vue"
		},
		intro: "const LatteRoot = '../src/';",
		name: "LatteUI",
		sourceMap: false,
		treeshake: false
	},
	external,
	plugins: [

		json(),

		nodeResolve({
			jsnext: true,
			main: true,
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
			{files: "src/image/**/*", dest: "dist/image"},
			{files: "src/sound/**/*", dest: "dist/sound"},
			{files: "src/worklet/**/*", dest: "dist/worklet"}
		])

	]
};
