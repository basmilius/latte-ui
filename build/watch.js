const ncp = require("ncp").ncp;
const postcss = require("rollup-plugin-postcss");
const rollup = require("rollup");

const autoprefixer = require("autoprefixer");
const babel = require("rollup-plugin-babel");
const comments = require("postcss-discard-comments");
const commonjs = require("rollup-plugin-commonjs");
const vue = require("rollup-plugin-vue").default;

const watcher = rollup.watch({
	input: "src/bundle.js",
	sourcemap: false,
	treeshake: true,
	output: {
		file: "dist/latte.js",
		format: "iife",
		indent: false,
		sourcemap: false
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
			sourceMap: false
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
			ncp("src/image", "dist/image");
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
