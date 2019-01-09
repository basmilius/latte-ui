/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const ncp = require("ncp").ncp;
const postcss = require("rollup-plugin-postcss");
const rollup = require("rollup");

const autoprefixer = require("autoprefixer");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const vue = require("rollup-plugin-vue").default;

const watcher = rollup.watch({
	input: "src/bundle.js",
	sourcemap: false,
	treeshake: false,
	output: {
		file: "dist/latte.js",
		format: "iife",
		indent: false,
		sourcemap: false
	},
	plugins: [
		vue({
			css: true,
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
				autoprefixer()
			],
			sourceMap: false,
			use: ["sass"]
		}),

		commonjs(),

		babel({
			exclude: 'node_modules/**'
		})
	],
	watch: {
		clearScreen: false,
		chokidar: true,
		include: ["src/**/*"],
		exclude: ["node_modules/**/*"]
	}
});

watcher.on("event", evt =>
{
	switch (evt.code)
	{
		case "START":
			ncp("src/worklet", "dist/worklet");
			ncp("src/image", "dist/image");
			ncp("src/sound", "dist/sound");
			console.log("watch", "Watching src/scss...");
			break;

		case "BUNDLE_START":
			console.log("watch", `Change detected, compiling ${evt.input}`);
			break;

		case "BUNDLE_END":
			console.log("watch", `Compiled successfully in ${evt.duration}ms: ${evt.input}`);
			break;

		default:
			console.log(evt);
			break;
	}
});
