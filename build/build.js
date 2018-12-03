const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
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
	const root = path.resolve(__dirname, "..");
	const dist = path.join(root, "dist");

	const bundles = [
		path.join(dist, "latte.css"),
		path.join(dist, "latte.css.map"),
		path.join(dist, "latte.js"),
		path.join(dist, "latte.js.map")
	];

	for (const bundle of bundles)
	{
		if (!fs.existsSync(bundle))
			continue;

		console.log("[build]", `Removing old bundle file: ${bundle}`);
		await fs.promises.unlink(bundle);
	}

	console.log("[build]", "Building css and js bundles...");

	const outputOptions = {
		file: "dist/latte.js",
		format: "iife",
		indent: false,
		sourcemap: true
	};

	const bundle = await rollup.rollup({
		input: "src/bundle.js",
		output: outputOptions,
		plugins: [
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
					autoprefixer(),
					comments({
						removeAll: true
					})
				],
				sourceMap: false,
				use: ["sass"]
			}),

			commonjs(),

			babel({
				exclude: 'node_modules/**'
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

	await bundle.write(outputOptions);

	console.log("[build]", "Copying images...");
	await new Promise(resolve => ncp("src/image", "dist/image", () => resolve()));

	console.log("[build]", "Copying sounds...");
	await new Promise(resolve => ncp("src/sound", "dist/sound", () => resolve()));
}

build()
	.then(() => console.log("Building complete!"))
	.catch(err => console.error(err));
