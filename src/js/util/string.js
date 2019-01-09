/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
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
	if (typeof str === "undefined" || str === null)
		return true;

	return str.replace(/\s/g, '').length < 1;
}

export default {

	commaCommaAnd,

	isNullOrWhitespace

};
