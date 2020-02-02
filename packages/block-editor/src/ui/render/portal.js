/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function portal(h, to, children)
{
	return h("latte-portal", {props: {to}}, children);
}

export function target(h, name)
{
	return h("latte-portal-target", {props: {name}});
}
