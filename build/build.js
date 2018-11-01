const postcss = require("rollup-plugin-postcss");
const rollup = require("rollup");

const autoprefixer = require("autoprefixer");
const babel = require("rollup-plugin-babel");
const cleanup = require("rollup-plugin-cleanup");
const comments = require("postcss-discard-comments");
const commonjs = require("rollup-plugin-commonjs");
const replace = require("rollup-plugin-replace");
const uglify = require("rollup-plugin-uglify").uglify;

async function build()
{
	const bundle = await rollup.rollup({
		input: "src/bundle.js",
		plugins: [
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
		format: "cjs",
		sourcemap: true
	});
}

build()
	.then(() => console.log("Building complete!"))
	.catch(err => console.error(err));
