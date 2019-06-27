/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Gets a cookie.
 *
 * @param {String} name
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function getCookie(name)
{
	name = `${name}=`;

	const decoded = decodeURIComponent(document.cookie);
	const cookies = decoded.split(";");

	for (let i = 0; i < cookies.length; i++)
	{
		let cookie = cookies[i];

		while (cookie.charAt(0) === " ")
			cookie = cookie.substring(1);

		if (cookie.indexOf(name) === 0)
			return JSON.parse(decodeURIComponent(cookie.substring(name.length)));
	}

	return undefined;
}

/**
 * Sets a cookie.
 *
 * @param {String} name
 * @param {*} value
 * @param {Number} days
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function setCookie(name, value, days = 21)
{
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

	document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=/`;
}

export default {
	getCookie,
	setCookie
}
