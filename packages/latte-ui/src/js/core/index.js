/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import popup from "./popup";
import z from "./z";

export let currentOptions = {};

/**
 * Gets the main#app element.
 *
 * @returns {HTMLElement}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function getMainElement()
{
	return currentOptions.mainElement || document.body; // Fallback to body then..!
}

/**
 * Gets the used latte options for local use.
 *
 * @returns {Object}
 * @author Bas Milius <bas@mili.us>
 * @since 1.6.0
 */
export function getOptions()
{
	return currentOptions;
}

/**
 * Handles an Error.
 *
 * @param {Error} err
 * @param {Function|undefined} fn
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function handleError(err, fn = undefined)
{
	Latte.ui.message.alert("Aw snap!", `<pre>${err.stack}</pre>`);

	if (fn)
		fn();
}

/**
 * Sets an interval.
 *
 * @param {Number} timeout
 * @param {Function} func
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function interval(timeout, func)
{
	func();

	return setInterval(func, timeout);
}

/**
 * Generates a random password-like string.
 *
 * @param {Number} length
 * @param {String} availableSets
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function randomPassword(length = 9, availableSets = "luds")
{
	const sets = [];

	if (availableSets.indexOf("l") > -1)
		sets.push("abcdefghjkmnpqrstuvwxyz");

	if (availableSets.indexOf("u") > -1)
		sets.push("ABCDEFGHJKMNPQRSTUVWXYZ");

	if (availableSets.indexOf("d") > -1)
		sets.push("123456789");

	if (availableSets.indexOf("s") > -1)
		sets.push("!@#$%&*?");

	let all = "";
	let password = "";

	sets.forEach(set =>
	{
		password += set[Math.floor(Math.random() * set.length)];
		all += set;
	});

	for (let i = 0; i < length - sets.length; i++)
		password += all[Math.floor(Math.random() * all.length)];

	return shuffleString(password);
}

/**
 * Registers a Latte module.
 *
 * @param {Function} func
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function register(func)
{
	func(window.Latte);
}

/**
 * Sets the used latte options for local use.
 *
 * @param {Object} options
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.3.0
 */
export function setOptions(options)
{
	currentOptions = options;
}

/**
 * Sets a timeout.
 *
 * @param {Number} timeout
 * @param {Function} func
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function timeout(timeout, func)
{
	return setTimeout(func, timeout);
}

function shuffleString(str)
{
	const a = str.split("");
	const n = a.length;

	for (let i = n - 1; i > 0; i--)
	{
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = a[i];

		a[i] = a[j];
		a[j] = tmp;
	}

	return a.join("");
}

export default {
	popup,
	z,

	getMainElement,
	getOptions,
	handleError,
	interval,
	randomPassword,
	register,
	timeout
}
