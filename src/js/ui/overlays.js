"use strict";

let registry = {};

export function close(name)
{
	let overlay = find(name);
	overlay.close();
}

export function find(name)
{
	if (typeof registry[name] === "undefined")
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
