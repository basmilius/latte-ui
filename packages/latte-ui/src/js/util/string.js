/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Implodes commas between strings and replaces the last comma with an &.
 *
 * @param {String[]} strs
 *
 * @return {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function commaCommaAnd(strs)
{
	return strs.join(", ").replace(/(.*),/, "$1 &");
}

/**
 * Applies parameters to a string.
 *
 * @param {String} str
 * @param {String} params
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.8.0
 */
export function format(str, ...params)
{
	for (let i = 0; i < params.length; i++)
		str = str.replace(new RegExp(`@${i}`, "g"), params[i]);

	return str;
}

/**
 * Returns TRUE if {@see str} is undefined, NULL or contains only whitespace.
 *
 * @param {String} str
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function isNullOrWhitespace(str)
{
	if (!str)
		return true;

	return str.replace(/\s/g, "").length < 1;
}

export default {
	commaCommaAnd,
	format,
	isNullOrWhitespace
};
