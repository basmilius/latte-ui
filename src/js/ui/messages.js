/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { register } from "../sdk.js";
import { createElement } from "../util/dom.js";
import { timeout } from "../util/core.js";
import { rootElement } from "./root.js";
import { spaceship } from "../operator/spaceship.js";
import { translate } from "../i18n.js";

/**
 * Initializes the messages system.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initialize()
{
	register(latte => createSDK(latte));
}

export const Buttons = {
	OK: 1,
	CANCEL: 2,
	YES: 4,
	NO: 8,
	UPDATE: 16,
	SAVE: 32,
	REMOVE: 64,
	CREATE: 128,
	GO: 256,
	PROCEED: 512
};

export const ButtonsDescribed = [
	{id: Buttons.OK, icon: "check-circle", label: "OK", type: "primary", weight: 1},
	{id: Buttons.CANCEL, icon: null, label: "Cancel", type: "light", weight: 0},
	{id: Buttons.YES, icon: "check-circle", label: "Yes", type: "primary", weight: 1},
	{id: Buttons.NO, icon: null, label: "No", type: "light", weight: 0},
	{id: Buttons.UPDATE, icon: "check-circle", label: "Update", type: "primary", weight: 1},
	{id: Buttons.SAVE, icon: "check-circle", label: "Save", type: "primary", weight: 1},
	{id: Buttons.REMOVE, icon: "alert-circle", label: "Remove", type: "error", weight: 1},
	{id: Buttons.CREATE, icon: "check-circle", label: "Create", type: "primary", weight: 1},
	{id: Buttons.GO, icon: "arrow-right-bold-circle", label: "Go", type: "primary", weight: 1},
	{id: Buttons.PROCEED, icon: "arrow-right-bold-circle", label: "Proceed", type: "primary", weight: 1}
];

/**
 * Creates a message.
 *
 * @param title
 * @param message
 * @param buttons
 * @param prompt
 *
 * @returns {Promise<*>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function createMessage(title, message, buttons, prompt = false)
{
	return new Promise(resolve =>
	{
		const overlay = createElement("div", el => el.classList.add("latte-overlay", "is-visible"));
		const panel = createElement("div", el => el.classList.add("panel", "panel-alert"));
		const panelTitle = createElement("div", el => el.classList.add("panel-header"));
		const panelContent = createElement("div", el => el.classList.add("panel-body"));
		const panelFooter = createElement("div", el => el.classList.add("panel-footer", "justify-content-end"));

		overlay.style.setProperty("z-index", "7000000");
		overlay.setAttribute("role", "dialog");

		let promptInput;

		buttons = buttonsToButtons(buttons);

		panelTitle.appendChild(createElement("span", span =>
		{
			span.classList.add("panel-title");
			span.innerHTML = title;
		}));
		panelContent.appendChild(createElement("p", p => p.innerHTML = message));

		if (prompt)
		{
			const formGroup = createElement("div", el => el.classList.add("form-group", "mb-0"));

			promptInput = createElement("input", el =>
			{
				el.classList.add("form-control");
				el.setAttribute("type", "text");
				formGroup.appendChild(el);
			});

			panelContent.appendChild(formGroup);
		}

		for (const button of buttons)
		{
			const el = createElement("button", el => el.classList.add("btn", "btn-contained", `btn-${button.type}`));

			if (button.icon !== null)
				el.appendChild(createElement("i", i => i.classList.add("mdi", `mdi-${button.icon}`)));

			el.appendChild(createElement("span", span => span.innerHTML = button.label));

			el.addEventListener("click", () =>
			{
				timeout(0, () => overlay.classList.remove("is-open"));
				timeout(270, () => overlay.classList.remove("is-visible"));

				resolve({
					button: button.id,
					input: (prompt ? promptInput.value : undefined)
				});
			});

			panelFooter.appendChild(el);
		}

		panel.appendChild(panelTitle);
		panel.appendChild(panelContent);
		panel.appendChild(panelFooter);

		overlay.appendChild(panel);

		rootElement.appendChild(overlay);

		timeout(0, () => overlay.classList.add("is-visible"));
		timeout(20, () => overlay.classList.add("is-open"));
	});
}

/**
 * Creates an alert.
 *
 * @param title
 * @param message
 *
 * @returns {Promise<*>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function alert(title, message)
{
	return createMessage(title, message, Buttons.OK);
}

/**
 * Creates a confirm alert.
 *
 * @param title
 * @param message
 *
 * @returns {Promise<*>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function confirm(title, message)
{
	return createMessage(title, message, Buttons.OK | Buttons.CANCEL);
}

/**
 * Creates a prompt alert.
 *
 * @param title
 * @param message
 *
 * @returns {Promise<*>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function prompt(title, message)
{
	return createMessage(title, message, Buttons.OK | Buttons.CANCEL, true);
}

/**
 * Creates SDK definitions.
 *
 * @param {*} latte
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function createSDK(latte)
{
	latte.ui = Object.assign(latte.ui || {}, {Buttons, ButtonsDescribed, alert, confirm, createMessage, prompt});
}

/**
 * Returns Buttons for buttons.
 *
 * @param {Number} buttons
 *
 * @returns {*[]}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function buttonsToButtons(buttons)
{
	let actualButtons = [];

	for (let button of ButtonsDescribed)
		if ((buttons & button.id) === button.id)
			actualButtons.push(button);

	actualButtons = actualButtons.sort((a, b) => spaceship(a.weight, b.weight));
	actualButtons.forEach(button => button.label = translate("root", button.label));

	return actualButtons;
}
