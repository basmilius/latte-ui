/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Clamps a value between min and max.
 *
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function clamp(value, min, max)
{
	return Math.min(Math.max(value, min), max);
}

/**
 * Pseudo random implementation.
 *
 * @param {Number} seed
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function pseudoRandom(seed)
{
	const x = Math.sin(seed) * 10000;

	return x - Math.floor(x);
}

/**
 * Implementation of the pythagorean equation.
 *
 * @param {Number} a
 * @param {Number} b
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function pythagorean(a, b)
{
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

export default {
	clamp,
	pythagorean
};
