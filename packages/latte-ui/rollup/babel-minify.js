const envPreset = require("@babel/preset-env");
const bannerPlugin = require("@comandeer/babel-plugin-banner");
const importPlugin = require("@babel/plugin-syntax-dynamic-import");
const minifyPreset = require("babel-preset-minify");

const decodeSourceMap = require("sourcemap-codec").decode;
const encodeSourceMap = require("sourcemap-codec").encode;
const getCommentContent = require("@comandeer/babel-plugin-banner").getCommentContent;

const {transform} = require("@babel/core");

function addNewLine(code, map, banner)
{
	map = Object.assign({}, map);
	code = code.replace(banner, `${banner}\n`);

	const mappings = decodeSourceMap(map.mappings);

	let codeStart = banner.match(/\n/g);
	codeStart = codeStart ? codeStart.length + 1 : 1;

	let whitespaceAtStart = code.replace(`${banner}\n`, '').match(/^(\s)+/g);
	whitespaceAtStart = whitespaceAtStart ? whitespaceAtStart.length : 0;

	mappings.unshift([]);

	if (Array.isArray(mappings[codeStart]) && mappings[codeStart].length)
	{
		const offset = mappings[codeStart][0][0] - whitespaceAtStart;

		mappings[codeStart].forEach((segment) => segment[0] -= offset);
	}

	map.mappings = encodeSourceMap(mappings);

	return {
		code,
		map
	};
}

function filterMinifyOptions(options)
{
	const disallowedProperties = [
		"banner",
		"bannerNewLine",
		"sourceMap",
		"comments",
		"plugins"
	];

	return Object.keys(options).reduce((newOptions, option) =>
	{
		if (disallowedProperties.indexOf(option) === -1)
			newOptions[option] = options[option];

		return newOptions;
	}, {});
}

function isString(v)
{
	return typeof v === 'string';
}

function isFn(v)
{
	return typeof v === 'function';
}

function isFnOrString(v)
{
	return isString(v) || isFn(v);
}

module.exports = {

	babelMinify(options = {})
	{
		let bundleBanner;

		return {

			name: "babel-minify",

			renderChunk(bundle)
			{
				const minifyOptions = filterMinifyOptions(options);
				const babelConf = {
					presets: [
						[envPreset, {targets: "last 1 version, > 1%, not dead"}],
						[minifyPreset, minifyOptions]
					],
					sourceMaps: typeof options.sourceMap !== "undefined" ? Boolean(options.sourceMap) : true,
					comments: typeof options.comments !== "undefined" ? Boolean(options.comments) : true,
					plugins: Array.isArray(options.plugins) ? options.plugins.concat([importPlugin]) : [importPlugin]
				};

				let banner;

				if (isFnOrString(options.banner) || isFnOrString(bundleBanner))
				{
					banner = options.banner || bundleBanner;
					banner = isFn(banner) ? banner() : banner;
					const bannerContent = getCommentContent(banner);
					let isAlreadyInserted = false;

					babelConf.plugins = babelConf.plugins.concat([
						[bannerPlugin, {
							banner
						}]
					]);

					if (!babelConf.comments)
					{
						babelConf.shouldPrintComment = (comment) =>
						{
							if (!isAlreadyInserted && comment === bannerContent)
							{
								isAlreadyInserted = true;

								return true;
							}

							return false;
						};
					}
				}

				let {code, map} = transform(bundle, babelConf);

				if (options.bannerNewLine)
				{
					({code, map} = addNewLine(code, map, banner));
				}

				return {
					code,
					map
				};
			}

		};
	}

};
