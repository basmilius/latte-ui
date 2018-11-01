/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { spaceship } from "./operator/spaceship.js";
import { id, request } from "./util/api.js";
import { copy, paste } from "./util/clipboard.js";
import { getCookie, setCookie } from "./util/cookies.js";
import { deepMerge, interval, isIterable, isObject, randomPassword, timeout } from "./util/core.js";
import { closest, createElement, downloadFile, live, printDocument, querySelectorAll } from "./util/dom.js";
import { isJson } from "./util/json.js";

/**
 * Initializes the Latte SDK.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initialize()
{
	Array.prototype.contains = function (needle)
	{
		return this.indexOf(needle) > -1;
	};

	window.Latte = {
		api: {id, request},
		clipboard: {copy, paste},
		cookie: {getCookie, setCookie},
		core: {deepMerge, handleError, interval, isIterable, isObject, randomPassword, register, timeout},
		dom: {closest, createElement, downloadFile, live, printDocument, querySelectorAll},
		operators: {spaceship},
		util: {isJson},
		vue: Vue
	};
}

/**
 * Displays an on-screen error.
 *
 * @param {Error|String|*} err
 * @param {Function|undefined} fn
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function handleError(err, fn = undefined)
{
	Latte.ui.alert("Aw snap!", `<pre>${err.stack}</pre>`);

	if (fn)
		fn();
}

/**
 * Registers a SDK object in the Latte object.
 *
 * @param {Function} func
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function register(func)
{
	func(window.Latte);
}
