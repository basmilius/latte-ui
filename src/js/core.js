/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

let currentOptions = {};
let dateFormatterOptions = {
	day: "numeric",
	month: "long",
	weekday: "long",
	year: "numeric"
};

/**
 * Deep merges multiple objects.
 *
 * @param {*} target
 * @param {*} sources
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function deepMerge(target, ...sources)
{
	if (sources.length === 0)
		return target;

	const source = sources.shift();

	if (!isObject(target) || !isObject(source))
		return deepMerge(target, ...sources);

	for (const key in source)
	{
		if (!source.hasOwnProperty(key))
			continue;

		if (isObject(source[key]))
		{
			if (!target[key])
				Object.assign(target, {[key]: source[key]});

			deepMerge(target[key], source[key]);
		}
		else
		{
			Object.assign(target, {[key]: source[key]});
		}
	}

	return deepMerge(target, ...sources);
}

/**
 * Formats a datetime.
 *
 * @param {Date} date
 * @param {Object} options
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function formatDateTime(date, options = dateFormatterOptions)
{
	const f = new Intl.DateTimeFormat(currentOptions.locale, options);

	return f.format(date);
}

/**
 * Gets the main#app element.
 *
 * @returns {HTMLMainElement}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function getMainElement()
{
	return document.querySelector("main#app");
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
	Latte.messages.alert("Aw snap!", `<pre>${err.stack}</pre>`);

	if (fn)
		fn();
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
	if (obj === null)
		return false;

	return typeof obj[Symbol.iterator] === "function";
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

/**
 * Updates the URL hash.
 *
 * @param {Object} data
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function updateURLHash(data)
{
	let parts = [];

	for (let key in data)
	{
		if (!data.hasOwnProperty(key))
			continue;

		let str = key;
		let d = data[key];

		if (d.value)
			str += `=${d.value}`;

		for (let vk in d.vars)
			if (d.vars.hasOwnProperty(vk))
				str += `/${vk}:${d.vars[vk]}`;

		parts.push(str);
	}

	const hash = parts.join("&");

	if (hash.length > 0)
		location.hash = hash;
	else
		history.replaceState({}, document.title, location.pathname + location.search);
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

	deepMerge,

	formatDateTime,

	getMainElement,

	handleError,

	interval,

	isObject,

	isIterable,

	randomPassword,

	register,

	timeout,

	updateURLHash

}
