/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { on } from "../core/action";
import { globalKeyEvent } from "../util/event";
import { spaceship } from "../operators";
import { terminateEvent } from "../util/dom";

let registry = {};

export function initializeOverlays()
{
	on("latte:ui:overlay", data => open(data.name || undefined));
	on("latte:ui:overlay:close", data => close(data.name || undefined));

	window.addEventListener("keydown", globalKeyEvent("Escape", onEscape));
}

export function close(name)
{
	let overlay = find(name);
	overlay.close();
}

export function find(name)
{
	if (!name || !registry[name])
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

function onEscape(evt)
{
	const overlay = Object.values(registry)
		.filter(o => o.isOpen)
		.sort((a, b) => spaceship(b.z, a.z))
		.shift();

	if (!overlay)
		return;

	terminateEvent(evt);

	overlay.close();
}

export default {
	close,
	find,
	open,
	register,
	remove
}
