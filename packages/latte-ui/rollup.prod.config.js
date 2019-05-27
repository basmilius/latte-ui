/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const deepMerge = require("./rollup/deep-merge");

const babelMinify = require("./rollup/babel-minify").babelMinify;
const commonjs = require("rollup-plugin-commonjs");
const copy = require("rollup-plugin-copy-glob");
const cssnano = require("cssnano");
const json = require("rollup-plugin-json");
const nodeResolve = require("rollup-plugin-node-resolve");
const postcss = require("rollup-plugin-postcss");
const postcssBanner = require("postcss-banner");
const postcssUrl = require("postcss-url");
const vue = require("rollup-plugin-vue");

const pkg = require("./package.json");
const external = Object.keys(pkg.dependencies);

const banner = `/*!
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 * 
 * This file is part of the Latte UI package.
 * 
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */`;

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
		compact: true,
		format: "umd",
		indent: false,
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

		vue({
			compileTemplate: true,
			template: {
				isProduction: true
			}
		}),

		postcss({
			config: false,
			extensions: [".scss"],
			extract: true,
			minimize: true,
			plugins: [

				postcssUrl({
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
				}),

				postcssBanner({
					banner: banner.substr(3, banner.length - 6),
					important: true,
					inline: true
				})

			],
			sourceMap: true,
			use: ["sass"]
		}),

		commonjs(),

		babelMinify({
			banner: banner,
			bannerNewLine: true,
			comments: false,
			plugins: [
				"transform-minify-booleans",
				// "minify-builtins",
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

export default bundles.map(bundle => deepMerge(defaultOptions, bundle));
