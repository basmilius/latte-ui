/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function handleComponentError(err, component = undefined, data = undefined)
{
	console.error(`${component ? `Got a selection error in component ${component}` : "Got a selection error"}: ${err.message}`);

	if (data)
		console.dir(data);
}
