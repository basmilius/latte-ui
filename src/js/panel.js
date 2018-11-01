/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { register } from "./sdk.js";
import { closest, querySelectorAll } from "./util/dom.js";

/**
 * Initializes the Panel System.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initialize()
{
	querySelectorAll("div.panel > table").forEach(table => closest(table, "div.panel").classList.add("panel-table"));
	querySelectorAll("div.panel.panel-toggleable").forEach(panel => initializePanel(panel));

	register(latte => latte.panel = {close, open});
}

/**
 * Initializes a panel.
 *
 * @param {HTMLDivElement} panel
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initializePanel(panel)
{
	const title = panel.querySelector("div.panel-header");

	if (title === null)
		return;

	const hasRightItems = title.querySelectorAll(".ml-auto").length > 0;

	const toggle = document.createElement("button");
	toggle.setAttribute("type", "button");
	toggle.classList.add("panel-toggle", "btn", "btn-icon", "btn-dark");

	if (!hasRightItems)
		toggle.classList.add("ml-auto");

	toggle.innerHTML = '<i class="mdi mdi-chevron-down"></i>';

	title.appendChild(toggle);

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

/**
 * Closes a panel.
 *
 * @param {HTMLDivElement} panel
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
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

/**
 * Opens a panel.
 *
 * @param {HTMLDivElement} panel
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
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
