/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const events = {};

/**
 * Adds an event listener and returns an unique symbol.
 *
 * @param {Element} elm
 * @param {String} eventName
 * @param {Function} fn
 * @param {*} options
 *
 * @returns {Function}
 * @author Bas Milius <bas@mili.us>
 * @since 1.9.0
 */
export function addEventListener(elm, eventName, fn, options = {passive: true})
{
	const symbol = Symbol();

	events[symbol] = fn;

	elm.addEventListener(eventName, fn, options);

	return function ()
	{
		removeEventListener(elm, eventName, symbol);
	};
}

/**
 * Removes an event listener by its unique symbol.
 * @param {Element} elm
 * @param {String} eventName
 * @param {symbol} symbol
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.9.0
 */
export function removeEventListener(elm, eventName, symbol)
{
	if (!events[symbol])
		return;

	elm.removeEventListener(eventName, events[symbol]);

	delete events[symbol];
}
