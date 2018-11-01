/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { register } from "./sdk.js";

const isInFrame = window.top !== window;
let translations = null;

/**
 * Initializes the I18n system.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initialize()
{
	register(latte => latte.i18n = {forObject, replace, translate});

	if (isInFrame)
		onTranslationsLoaded(undefined);
	else
		onTranslationsLoaded({data: window.LatteI18n || {}});
}

/**
 * Translates an object.
 *
 * @param {*} obj
 * @param {String} domain
 *
 * @return {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function forObject(obj, domain = "root")
{
	for (let key in obj)
		if (obj.hasOwnProperty(key))
			obj[key] = translate(domain, obj[key]);

	return obj;
}

/**
 * Replaces params in a string.
 *
 * @param {String} string
 * @param {*} params
 *
 * @returns {String}
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
 * @param {*} params
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function translate(domain, string, params = [])
{
	if (translations === null || typeof translations[domain] === "undefined" || typeof translations[domain][string] === "undefined")
		return replace(string, params);

	return replace(translations[domain][string], params);
}

/**
 * Invoked when translations are loaded.
 *
 * @param {*} response
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function onTranslationsLoaded(response)
{
	if (typeof response !== "undefined")
		translations = response.data;

	const event = new CustomEvent("latte:i18n:translations-loaded", {
		detail: translations,
		bubbles: true,
		cancelable: false
	});

	window.dispatchEvent(event);
}
