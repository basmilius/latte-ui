"use strict";

export function closest(element, selector)
{
	for (; element && element !== document; element = element.parentNode)
		if (element.matches(selector))
			return element;

	return null;
}

export function createElement(element, func = undefined)
{
	const el = document.createElement(element);

	if (func !== undefined)
		func(el);

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

export function querySelectorAll(selector, root = document)
{
	const elements = [];

	root.querySelectorAll(selector).forEach(r => elements.push(r));

	return elements;
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

	querySelectorAll,

	toDOM

}
