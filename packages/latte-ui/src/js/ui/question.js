/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

import { createElement, raf, toDOM } from "../util/dom";
import { applyZ } from "../z";
import { dispatch } from "../core/action";

const defaultOptions = {
	width: "300px"
};

export function create(icon, message, buttons, options = {})
{
	return new Promise(resolve =>
	{
		options = Object.assign({}, defaultOptions, options);

		function closeQuestion(id)
		{
			raf(() => overlay.classList.remove("is-open"));
			raf(() => overlay.classList.remove("is-visible"), 270);
			raf(() => overlay.remove(), 300);

			dispatch("latte:overlay", {overlay, open: false});

			resolve(id);
		}

		const messageDOM = toDOM(message);

		const overlay = createElement("div", el =>
		{
			el.classList.add("latte-overlay", "is-visible");
			el.setAttribute("role", "dialog");

			applyZ(z => el.style.setProperty("z-index", z));
		});
		const panel = createElement("div", el =>
		{
			el.classList.add("panel");
			el.style.setProperty("width", options.width);
		});
		const panelHeader = createElement("div", el => el.classList.add("panel-header", "justify-content-center", "border-bottom-0", "py-4"));
		const panelBody = createElement("div", el => el.classList.add("panel-body", "py-0", "text-center"));
		const panelFooter = createElement("div", el => el.classList.add("d-flex", "flex-column", "p-3"));

		panelHeader.appendChild(createElement("i", i =>
		{
			i.classList.add("mdi", `mdi-${icon}`, "text-primary");
			i.style.setProperty("font-size", "36px");
		}));
		panelBody.appendChild(messageDOM);

		for (let button of buttons)
		{
			panelFooter.appendChild(createElement("button", b =>
			{
				b.classList.add("btn", "btn-text", "btn-pill", "btn-primary");
				b.innerHTML = button.label;
				b.style.setProperty("--btn-height", "42px");
				b.style.setProperty("font-size", ".9em");

				b.addEventListener("click", () => closeQuestion(button.id));
			}));
		}

		panel.appendChild(panelHeader);
		panel.appendChild(panelBody);
		panel.appendChild(panelFooter);

		overlay.appendChild(panel);

		document.body.appendChild(overlay);

		dispatch("latte:overlay", {overlay, open: true});

		raf(() =>
		{
			overlay.classList.add("is-visible");

			raf(() => overlay.classList.add("is-open"));
		});
	});
}

export default {
	create
};
