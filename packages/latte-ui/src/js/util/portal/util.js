/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function extractAttributes(elm)
{
	const map = elm.hasAttributes() ? elm.attributes : [];
	const attrs = {};

	for (let i = 0; i < map.length; i++)
	{
		const attr = map[i];

		if (attr.value)
			attrs[attr.name] = attr.value === "" ? true : attr.value;
	}

	let cls;
	let style;

	if (attrs.class)
	{
		cls = attrs.class;
		delete attrs.class;
	}

	if (attrs.style)
	{
		style = attrs.style;
		delete attrs.style;
	}

	return {
		attrs,
		class: cls,
		style
	};
}

export function freeze(item)
{
	if (Array.isArray(item) || typeof item === "object")
		return Object.freeze(item);

	return item;
}

export function combinePassengers(transports, slotProps = {})
{
	return transports.reduce((passengers, transport) =>
	{
		let newPassengers = transport.passengers[0];

		return passengers.concat(typeof newPassengers === "function" ? newPassengers(slotProps) : transport.passengers);
	}, []);
}

export function stableSort(array, compareFn)
{
	return array
		.map((v, idx) => [idx, v])
		.sort(function (a, b)
		{
			return this(a[1], b[1]) || a[0] - b[0]
		}.bind(compareFn))
		.map(c => c[1]);
}
