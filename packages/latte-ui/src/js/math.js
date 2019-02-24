/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function pseudoRandom(seed)
{
	const x = Math.sin(seed) * 10000;

	return x - Math.floor(x);
}

export function pythagorean(a, b)
{
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

export default {

	pythagorean

};
