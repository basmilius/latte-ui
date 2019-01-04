/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

let lattePath = null;

export function closest(element, selector)
{
	for (; element && element !== document; element = element.parentNode)
		if (element === selector || (typeof selector === "string" && element.matches(selector)))
			return element;

	return null;
}

export function createElement(element, fn = undefined)
{
	const el = document.createElement(element);

	if (fn !== undefined)
		fn(el);

	return el;
}

export function downloadFile(fileName, url)
{
	createElement("a", a =>
	{
		a.download = fileName;
		a.href = url;

		document.body.appendChild(a);

		a.click();
		a.remove();
	});
}

export function getLattePath()
{
	if (lattePath !== null)
		return lattePath;

	const lattejs = document.querySelector(`script[src*="latte.js"]`);

	if (lattejs === null)
		throw new Error("Could not get latte.js path. The world ends here...");

	return lattePath = lattejs.getAttribute("src").split("latte.js")[0] || null;
}

export function isTouchOnlyDevice()
{
	return "ontouchstart" in window;
}

export function live(root, selector, event, callback, options = {passive: true})
{
	if (event.indexOf(" ") > -1)
	{
		const events = event.split(" ");

		events.forEach(event => live(root, selector, event, callback));

		return;
	}

	root.addEventListener(event, function (evt)
	{
		const qs = root.querySelectorAll(selector);

		if (!qs)
			return;

		let el = evt.target, index;

		while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1))
			el = el.parentElement;

		if (index > -1)
			callback(el, evt)

	}, options);
}

export function printDocument(url)
{
	const wnd = window.open(url);
	wnd.addEventListener("load", () =>
	{
		wnd.print();
		wnd.addEventListener("focus", () => wnd.close());
	});
}

export function raf(fn, delay = undefined)
{
	if (delay !== undefined)
		return setTimeout(() => requestAnimationFrame(fn), delay);

	requestAnimationFrame(fn);
}

export function relativeCoordsTo(element, evt)
{
	if (!evt.clientX || !evt.clientY)
		return undefined;

	const rect = element.getBoundingClientRect();

	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

export function toDOM(str)
{
	const temp = document.createElement("div");
	const fragment = document.createDocumentFragment();

	let child;

	temp.innerHTML = str;

	while ((child = temp.firstChild))
		fragment.appendChild(child);

	return fragment;
}

export default {

	closest,

	createElement,

	downloadFile,

	live,

	printDocument,

	raf,

	relativeCoordsTo,

	toDOM

}
