/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function isTouchDevice()
{
	if ((navigator.maxTouchPoints || navigator.msMaxTouchPoints) > 0)
		return true;

	return /iPad|iPhone|iPod/.test(navigator.platform);
}

export function onlyMouse(fn)
{
	return function ()
	{
		if (isTouchDevice())
			return undefined;

		return fn.call(this, ...arguments);
	};
}

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
