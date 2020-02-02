/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function findEditor(component)
{
	return findGrandparent(component, "Editor");
}

export function findGrandparent(component, name)
{
	while ((component = component.$parent) !== undefined)
		if (component.$options.name === name)
			return component;

	return undefined;
}

export function either(condition, fn1, fn2)
{
	return condition ? fn1() : fn2();
}

export function optional(condition, fn, defaultValue = undefined)
{
	if (!condition)
		return defaultValue;

	return fn();
}
