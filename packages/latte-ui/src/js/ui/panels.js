/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

export function initializePanels()
{
	document.querySelectorAll("div.panel > table").forEach(t => t.parentNode.classList.add("panel-table"));
	document.querySelectorAll("div.panel.panel-toggleable").forEach(panel => initializePanel(panel));
}

export function initializePanel(panel)
{
	const header = panel.querySelector("div.panel-header");

	if (header === null)
		return;

	const hasRightItems = header.querySelectorAll(".ml-auto").length > 0;

	const toggle = document.createElement("button");
	toggle.setAttribute("type", "button");
	toggle.classList.add("panel-toggle", "btn", "btn-text", "btn-icon", "btn-dark");

	if (!hasRightItems)
		toggle.classList.add("ml-auto");

	toggle.innerHTML = '<i class="mdi mdi-chevron-down"></i>';

	header.appendChild(toggle);

	if (panel.classList.contains("is-open"))
		open(panel);
	else
		close(panel);

	toggle.addEventListener("click", () =>
	{
		if (panel.classList.contains("is-open"))
			close(panel);
		else
			open(panel);
	});
}

export function close(panel)
{
	let p = panel;

	if (p.querySelector(":scope > form") !== null)
		p = p.querySelector(":scope > form");

	const hidableItems = p.querySelectorAll(":scope > div:not(.panel-header)");
	for (let i = 0; i < hidableItems.length; i++)
		hidableItems.item(i).classList.add("d-none");

	const toggle = p.querySelector("div.panel-header > button.panel-toggle");
	toggle.querySelector("i.mdi").classList.remove("mdi-rotate-180");

	panel.classList.add("is-closed");
	panel.classList.remove("is-open");
}

export function open(panel)
{
	let p = panel;

	if (p.querySelector(":scope > form") !== null)
		p = p.querySelector(":scope > form");

	const hidableItems = p.querySelectorAll(":scope > div:not(.panel-header)");
	for (let i = 0; i < hidableItems.length; i++)
		hidableItems.item(i).classList.remove("d-none");

	const toggle = p.querySelector("div.panel-header > button.panel-toggle");
	toggle.querySelector("i.mdi").classList.add("mdi-rotate-180");

	panel.classList.remove("is-closed");
	panel.classList.add("is-open");
}

export default {

	close,

	initializePanel,

	open

}
