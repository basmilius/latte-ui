/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Deep merges multiple objects.
 *
 * @param {*} sources
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function deepMerge(...sources)
{
	let acc = {};

	for (const source of sources)
	{
		if (Array.isArray(source))
		{
			if (!(Array.isArray(acc)))
				acc = [];

			acc = [...acc, ...source];
		}
		else if (isObject(source))
		{
			for (let [key, value] of Object.entries(source))
			{
				if (isObject(value) && key in acc)
					value = deepMerge(acc[key], value);

				acc = {...acc, [key]: value};
			}
		}
	}

	return acc;
}

console.log(
	deepMerge(
		[{a: true}],
		[{b: true}]
	)
);

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
	return obj !== null && typeof obj[Symbol.iterator] === "function";
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
