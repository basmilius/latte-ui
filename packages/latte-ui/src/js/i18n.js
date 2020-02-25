/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

import { getOptions } from "./options";
import { deepMerge } from "./util/object";
import { vsprintf } from "./util/string";

import {strings as latte_ui_strings} from "../i18n/latte_ui.json";

const defaultStrings = {
	latte_ui: latte_ui_strings
};

/**
 * Translates a string.
 *
 * @param {String} domain
 * @param {String} key
 * @param {Array} params
 *
 * @returns {String}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function translate(domain, key, params = [])
{
	const options = getOptions();
	const translations = deepMerge({}, defaultStrings, options.i18n.strings || {});
	const domainStrings = translations[domain] || {};

	if (!domainStrings[key])
		return key;

	return vsprintf(domainStrings[key], params);
}

Vue.filter("i18n", (value, domain = "latte_ui", ...params) => translate(domain, value, params));

export default {
	translate
}
