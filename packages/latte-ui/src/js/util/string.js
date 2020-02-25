/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { sprintf as _sprintf, vsprintf as _vsprintf } from "sprintf-js";

/**
 * Formats the given string with the given args.
 *
 * @param {String} str
 * @param {*} args
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.9.0
 */
export function sprintf(str, ...args)
{
	return _sprintf(str, ...args);
}

/**
 * Formats the given string with the given args.
 *
 * @param {String} str
 * @param {*} args
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.9.0
 */
export function vsprintf(str, args)
{
	return _vsprintf(str, args);
}

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
	if (!str)
		return true;

	return str.replace(/\s/g, "").length < 1;
}

export default {
	commaCommaAnd,
	isNullOrWhitespace,
	sprintf,
	vsprintf
};
