/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function combine(a, b)
{
	return function (evt)
	{
		if (a)
			a(evt);

		if (b)
			b(evt);
	};
}

export function terminate(evt, fn = undefined)
{
	evt.preventDefault();
	evt.stopPropagation();

	if (fn)
		fn();
}
