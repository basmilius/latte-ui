/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Deep merges multiple objects.
 *
 * @param {*} target
 * @param {*} sources
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function deepMerge(target, ...sources)
{
	if (sources.length === 0)
		return target;

	const source = sources.shift();

	if (!isObject(target) || !isObject(source))
		return deepMerge(target, ...sources);

	for (const key in source)
	{
		if (!source.hasOwnProperty(key))
			continue;

		if (isObject(source[key]))
		{
			if (!target[key])
				Object.assign(target, {[key]: source[key]});

			deepMerge(target[key], source[key]);
		}
		else if (Array.isArray(source[key]))
		{
			let arr = target[key] || [];
			arr.push(...source[key]);

			Object.assign(target, {[key]: arr});
		}
		else
		{
			Object.assign(target, {[key]: source[key]});
		}
	}

	return deepMerge(target, ...sources);
}

/**
 * Returns TRUE when obj is iterable.
 *
 * @param {*} obj
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function isIterable(obj)
{
	if (obj === null)
		return false;

	return typeof obj[Symbol.iterator] === "function";
}

/**
 * Returns TRUE when obj is an object.
 *
 * @param {*} obj
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function isObject(obj)
{
	return obj && typeof obj === "object" && !Array.isArray(obj);
}

export default {
	deepMerge,
	isIterable,
	isObject
};
