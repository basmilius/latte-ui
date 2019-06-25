/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

let currentZ = 2000;

/**
 * Generates a z-value to be used with z-index.
 *
 * @param {Function} fn
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function applyZ(fn)
{
	fn(currentZ);
	currentZ++;
}

export default {
	applyZ
}
