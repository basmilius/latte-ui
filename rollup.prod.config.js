/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const postcss = require("rollup-plugin-postcss");

const babel = require("rollup-plugin-babel");
const buble = require("rollup-plugin-buble");
const cleanup = require("rollup-plugin-cleanup");
const commonjs = require("rollup-plugin-commonjs");
const copy = require("rollup-plugin-copy-glob");
const cssnano = require("cssnano");
const json = require("rollup-plugin-json");
const nodeResolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const uglify = require("rollup-plugin-uglify").uglify;
const vue = require("rollup-plugin-vue");

const pkg = require("./package.json");
const external = Object.keys(pkg.dependencies);

export default {
	input: "src/js/app.js",
	output: {
		compact: true,
		file: "dist/latte.js",
		format: "umd",
		indent: false,
		intro: "var LatteRoot = null;",
		name: "LatteUI",
		sourcemap: true,
		globals: {
			"moment": "moment",
			"vue": "Vue"
		}
	},
	external,
	treeshake: true,
	plugins: [

		json(),

		nodeResolve({
			jsnext: true,
			main: true,
			browser: true
		}),

		postcss({
			config: false,
			extensions: [".scss"],
			extract: true,
			minimize: true,
			plugins: [

				cssnano({
					preset: ["advanced", {
						autoprefixer: {
							add: true
						},
						discardComments: {
							removeAll: true
						}
					}]
				})

			],
			sourceMap: true,
			use: ["sass"]
		}),

		vue({
			compileTemplate: true,
			template: {
				compilerOptions: {
					whitespace: "condense"
				},
				isProduction: true
			}
		}),

		commonjs(),

		babel({
			exclude: 'node_modules/**'
		}),

		buble(),

		cleanup(),

		uglify({
			compress: {
				drop_console: true,
				passes: 1,
				toplevel: true
			},
			mangle: {
				toplevel: true
			},
			sourcemap: true
		}),

		replace({
			"\\t": "",
			"\\n": ""
		}),

		copy([
			{files: "src/image/**/*", dest: "dist/image"},
			{files: "src/sound/**/*", dest: "dist/sound"},
			{files: "src/worklet/**/*", dest: "dist/worklet"}
		])

	]
};
