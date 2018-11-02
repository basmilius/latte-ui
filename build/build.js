const postcss = require("rollup-plugin-postcss");
const rollup = require("rollup");

const autoprefixer = require("autoprefixer");
const babel = require("rollup-plugin-babel");
const buble = require("rollup-plugin-buble");
const cleanup = require("rollup-plugin-cleanup");
const comments = require("postcss-discard-comments");
const commonjs = require("rollup-plugin-commonjs");
const replace = require("rollup-plugin-replace");
const uglify = require("rollup-plugin-uglify").uglify;
const vue = require("rollup-plugin-vue").default;

async function build()
{
	const bundle = await rollup.rollup({
		input: "src/bundle.js",
		output: {
			file: "dist/latte.js",
			format: "iife",
			sourcemap: true
		},
		plugins: [
			vue({
				compileTemplate: true,
				template: {
					isProduction: true
				}
			}),

			postcss({
				extract: true,
				minimize: true,
				plugins: [
					autoprefixer(),

					comments({
						removeAll: true
					})
				],
				sourceMap: true
			}),

			commonjs(),

			babel({
				exclude: 'node_modules/**',
			}),

			buble(),

			cleanup(),

			uglify(),

			replace({
				values: {
					"\\t": "",
					"\\n": ""
				}
			})
		]
	});

	await bundle.write({
		file: "dist/latte.js",
		format: "iife",
		sourcemap: true
	});
}

build()
	.then(() => console.log("Building complete!"))
	.catch(err => console.error(err));
