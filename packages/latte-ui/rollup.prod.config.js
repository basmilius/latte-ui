/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const postcss = require("rollup-plugin-postcss");

const babelMinify = require("rollup-plugin-babel-minify");
const commonjs = require("rollup-plugin-commonjs");
const copy = require("rollup-plugin-copy-glob");
const cssnano = require("cssnano");
const json = require("rollup-plugin-json");
const nodeResolve = require("rollup-plugin-node-resolve");
const postCssUrl = require("postcss-url");
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
			browser: true
		}),

		postcss({
			config: false,
			extensions: [".scss"],
			extract: true,
			minimize: true,
			plugins: [

				postCssUrl({
					url: "inline"
				}),

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

		babelMinify({
			comments: false,
			plugins: [
				"transform-minify-booleans",
				"minify-builtins",
				"transform-inline-consecutive-adds",
				"minify-constant-folding",
				"minify-guarded-expressions",
				"minify-infinity",
				"transform-member-expression-literals",
				"transform-merge-sibling-variables",
				"minify-numeric-literals",
				"transform-property-literals",
				"transform-regexp-constructors",
				"transform-remove-console",
				"transform-remove-debugger",
				"transform-remove-undefined",
				"minify-replace",
				"minify-simplify",
				"transform-simplify-comparison-operators",
				"minify-type-constructors",
				"transform-undefined-to-void"
			]
		}),

		copy([
			{files: "src/image/**/*", dest: "dist/image"},
			{files: "src/sound/**/*", dest: "dist/sound"},
			{files: "src/worklet/**/*", dest: "dist/worklet"}
		])

	]
};
