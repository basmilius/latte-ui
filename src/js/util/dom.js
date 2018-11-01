/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

/**
 * Finds the closest parent.
 *
 * @param {HTMLElement|Document|Node} element
 * @param {String} selector
 *
 * @returns {HTMLElement|null}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function closest(element, selector)
{
	for (; element && element !== document; element = element.parentNode)
		if (element.matches(selector))
			return element;

	return null;
}

/***
 * Creates a new DOM element.
 *
 * @param {String} element
 * @param {Function} func
 *
 * @returns {HTMLElement}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createElement(element, func = undefined)
{
	const el = document.createElement(element);

	if (func !== undefined)
		func(el);

	return el;
}

/**
 * Downloads a file from url.
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
 * Adds a Live Event listener.
 *
 * @param {HTMLElement|Document} root
 * @param {String} selector
 * @param {String} event
 * @param {Function} callback
 * @param {*} options
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

		let el = evt.target, index;

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
 * Implementation of querySelectorAll that puts everything in an Array.
 *
 * @param {String} selector
 * @param {HTMLElement|Document} root
 *
 * @returns {Array}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function querySelectorAll(selector, root = document)
{
	const elements = [];

	root.querySelectorAll(selector).forEach(r => elements.push(r));

	return elements;
}

/**
 * Converts a string into DOM.
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

	while (child = temp.firstChild)
		fragment.appendChild(child);

	return fragment;
}
