/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Returns TRUE if this is a touch device.
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function isTouchDevice()
{
	if ((navigator.maxTouchPoints || navigator.msMaxTouchPoints) > 0)
		return true;

	return /iPad|iPhone|iPod/.test(navigator.platform);
}

/**
 * Executes fn only if we're not on a touch device.
 *
 * @param {Function} fn
 *
 * @returns {Function}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function onlyMouse(fn)
{
	return function ()
	{
		if (isTouchDevice())
			return undefined;

		return fn.call(this, ...arguments);
	};
}

/**
 * Executes fn only if we're on a touch device.
 *
 * @param {Function} fn
 *
 * @returns {Function}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function onlyTouch(fn)
{
	return function ()
	{
		if (!isTouchDevice())
			return undefined;

		return fn.call(this, ...arguments);
	};
}

export default {
	isTouchDevice,
	onlyMouse,
	onlyTouch
};
