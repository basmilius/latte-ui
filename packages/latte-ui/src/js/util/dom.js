/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getOptions } from "../core";

let lattePath = null;

/**
 * Returns the closest element that matches selector.
 *
 * @param {HTMLElement|Node} element
 * @param {String|HTMLElement} selector
 *
 * @returns {HTMLElement|SVGElement|null}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function closest(element, selector)
{
	for (; element && element !== document; element = element.parentNode)
		if (element === selector || (typeof selector === "string" && element.matches(selector)))
			return element;

	return null;
}

/**
 * Conditional render for vue components.
 *
 * @param {Boolean} condition
 * @param {Function} fn
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function conditionalRender(condition, fn)
{
	if (!condition)
		return undefined;

	return fn();
}

/**
 * Creates a dom element.
 *
 * @param {String} tag
 * @param {Function} fn
 *
 * @returns {HTMLElement}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createElement(tag, fn = undefined)
{
	const el = document.createElement(tag);

	if (fn !== undefined)
		fn(el);

	return el;
}

/**
 * Downloads an url as a file.
 *
 * @param {String} fileName
 * @param {String} url
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
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

/**
 * Renders each object with fn.
 *
 * @param {Array} objects
 * @param {Function} fn
 *
 * @return {Array}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function eachRender(objects, fn)
{
	return objects.map(o => fn(o));
}

/**
 * Gets coords of a touch or mouse event.
 *
 * @param {MouseEvent|TouchEvent|PointerEvent} evt
 *
 * @returns {{x: Number, y: Number}|undefined}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function getCoords(evt)
{
	let e = evt;

	if (window.TouchEvent && evt instanceof TouchEvent)
	{
		if (evt.touches.length > 0)
			e = evt.touches.item(evt.touches.length - 1);
		else
			e = evt.changedTouches.item(evt.changedTouches.length - 1);
	}

	if (!e.clientX || !e.clientY)
		return undefined;

	return {x: e.clientX, y: e.clientY};
}

/**
 * Gets the latte.css and latte.js root path.
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function getLattePath()
{
	if (lattePath !== null)
		return lattePath;

	const options = getOptions();

	if (options.root)
		return options.root;

	const lattejs = document.querySelector(`script[src*="latte-ui"]`);

	if (lattejs === null)
		return lattePath = "/"; // We're going to play it save.

	return lattePath = lattejs.getAttribute("src").split(/latte-ui(\.app)?\.js/)[0] || null;
}

/**
 * Returns TRUE when the document is ready.
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function isReady()
{
	return ["complete", "loaded", "interactive"].indexOf(document.readyState) > -1;
}

/**
 * Adds a live event.
 *
 * @param {HTMLElement} root
 * @param {String} selector
 * @param {String} event
 * @param {Function} callback
 * @param {Object} options
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
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

		let el = evt.target;
		let index;

		while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1))
			el = el.parentElement;

		if (index > -1)
			callback(el, evt)

	}, options);
}

/**
 * Prints a document.
 *
 * @param {String} url
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function printDocument(url)
{
	const wnd = window.open(url);
	wnd.addEventListener("load", () =>
	{
		wnd.print();
		wnd.addEventListener("focus", () => wnd.close());
	});
}

/**
 * Request animation frame.
 *
 * @param {Function} fn
 * @param {Number|undefined} delay
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function raf(fn, delay = undefined)
{
	if (delay !== undefined)
		return setTimeout(() => requestAnimationFrame(fn), delay);

	requestAnimationFrame(fn);
}

/**
 * Gets coords of a touch or mouseevent relative to an element.
 *
 * @param {HTMLElement} element
 * @param {MouseEvent|TouchEvent|PointerEvent} evt
 *
 * @returns {{x: Number, y: Number}|undefined}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function relativeCoordsTo(element, evt)
{
	const coords = getCoords(evt);

	if (!coords)
		return undefined;

	const rect = element.getBoundingClientRect();

	return {
		x: coords.x - rect.left,
		y: coords.y - rect.top
	};
}

/**
 * Terminates an event.
 *
 * @param {Event} evt
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function terminateEvent(evt)
{
	evt.preventDefault();
	evt.stopPropagation();
}

/**
 * Converts a string containing html code to dom elements.
 *
 * @param {String} str
 *
 * @returns {DocumentFragment}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
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
	getCoords,
	getLattePath,
	isReady,
	live,
	printDocument,
	raf,
	relativeCoordsTo,
	terminateEvent,
	toDOM
}
