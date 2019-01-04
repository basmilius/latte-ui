/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

/**
 * Replaces params in a string.
 *
 * @param {String} string
 * @param {Array} params
 *
 * @returns {*}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function replace(string, params = [])
{
	for (let i = 0; i < params.length; i++)
		string = string.replace(new RegExp(`@${i}`, 'g'), params[i]);

	return string;
}

/**
 * Translates a string.
 *
 * @param {String} domain
 * @param {String} string
 * @param {Array} params
 *
 * @returns {String}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function translate(domain, string, params = [])
{
	const translations = window.LatteI18n || {};

	if (translations === null || typeof translations[domain] === "undefined" || typeof translations[domain][string] === "undefined")
		return replace(string, params);

	return replace(translations[domain][string], params);
}

Vue.filter("i18n", (value, domain = "root", ...params) => Latte.i18n.translate(domain, value, params));

export default {

	replace,

	translate

}
