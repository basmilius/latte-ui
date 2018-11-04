const ncp = require("ncp").ncp;
const postcss = require("rollup-plugin-postcss");
const rollup = require("rollup");

const autoprefixer = require("autoprefixer");

const watcher = rollup.watch({
	input: "src/bundle-css.js",
	output: {
		file: "dist/latte.css",
		format: "iife",
		sourcemap: true
	},
	plugins: [
		postcss({
			extract: true,
			minimize: true,
			plugins: [
				autoprefixer()
			],
			sourceMap: true
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
			console.log("watch:css", "Watching src/scss...");
			break;

		case "BUNDLE_START":
			console.log("watch:css", `Change detected, compiling ${evt.input}`);
			break;

		case "BUNDLE_END":
			ncp("src/image", "dist/image");
			console.log("watch:css", `Compiled successfully in ${evt.duration}ms: ${evt.input}`);
			break;

		default:
			console.log(evt);
			break;
	}
});
