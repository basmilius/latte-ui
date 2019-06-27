/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

import { currentOptions } from "./core";
import { format } from "./util/string";

/**
 * Replaces params in a string.
 *
 * @param {String} str
 * @param {Array} params
 *
 * @returns {*}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function replace(str, params = [])
{
	return format(str, ...params);
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
	const translations = currentOptions.i18n;

	if (!translations[domain] || !translations[domain][string])
		return replace(string, params);

	return replace(translations[domain][string], params);
}

Vue.filter("i18n", (value, domain = "root", ...params) => translate(domain, value, params));

export default {
	replace,
	translate
}
