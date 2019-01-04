/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const postcss = require("rollup-plugin-postcss");
const rollup = require("rollup");

const autoprefixer = require("autoprefixer");

async function build()
{
	console.log("[build]", "Building css bundle...");

	const outputOptions = {
		file: "dist/latte.css",
		format: "iife",
		indent: false,
		sourcemap: false
	};

	const bundle = await rollup.rollup({
		input: "src/bundle-css.js",
		output: outputOptions,
		plugins: [
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
			})
		]
	});

	await bundle.write(outputOptions);
}

build()
	.then(() => console.log("Building complete!"))
	.catch(err => console.error(err));
