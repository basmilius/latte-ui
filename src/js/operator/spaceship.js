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
 * Implementation of PHPs <=> (spaceship) operator.
 *
 * @param {*} a
 * @param {*} b
 *
 * @returns {Number}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function spaceship(a, b)
{
	if ((a === null || b === null) || typeof a !== typeof b)
		return null;

	if (typeof a === "string")
		return a.localeCompare(b);

	if (a > b)
		return 1;
	else if (a < b)
		return -1;

	return 0;
}
