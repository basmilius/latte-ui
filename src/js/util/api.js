/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

/**
 * Returns an unique ID.
 *
 * @returns {String}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function id()
{
	const array = new Uint32Array(3);

	window.crypto.getRandomValues(array);

	return "latte-" + array.join("-");
}

/**
 * Fetches an API endpoint.
 *
 * @param {String} url
 * @param {RequestInit} options
 *
 * @returns {Promise<Response>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function request(url, options = {})
{
	let completeOptions = Object.assign({}, {credentials: "include"}, options);

	return fetch(url, completeOptions);
}
