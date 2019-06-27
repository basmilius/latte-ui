/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { on } from "../core/action";

let registry = {};

export function initializeOverlays()
{
	on("latte:ui:overlay", data => open(data.name || undefined));
	on("latte:ui:overlay:close", data => close(data.name || undefined));
}

export function close(name)
{
	let overlay = find(name);
	overlay.close();
}

export function find(name)
{
	if (name === undefined || !registry[name])
		throw new Error(`Overlay ${name} is not registred!`);

	return registry[name];
}

export function open(name)
{
	let overlay = find(name);
	overlay.open();
}

export function register(name, overlay)
{
	registry[name] = overlay;
}

export function remove(name)
{
	delete registry[name];
}

export default {
	close,
	find,
	open,
	register,
	remove
}
