/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { createElement, raf } from "../util/dom";
import { timeout } from "../core";
import { spaceship } from "../operators";
import { translate } from "../i18n";
import { needsZIndex } from "../z";

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
	PROCEED: 512,
	ALLOW: 1024,
	DENY: 2048
};

export const ButtonsDescribed = [
	{id: Buttons.OK, icon: "check-circle", label: "OK", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.CANCEL, icon: null, label: "Cancel", classes: ["btn-text", "btn-dark"], weight: 0},
	{id: Buttons.YES, icon: "check-circle", label: "Yes", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.NO, icon: null, label: "No", classes: ["btn-text", "btn-dark"], weight: 0},
	{id: Buttons.UPDATE, icon: "check-circle", label: "Update", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.SAVE, icon: "check-circle", label: "Save", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.REMOVE, icon: "alert-circle", label: "Remove", classes: ["btn-contained", "btn-error"], weight: 1},
	{id: Buttons.CREATE, icon: "check-circle", label: "Create", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.GO, icon: "arrow-right-bold-circle", label: "Go", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.PROCEED, icon: "arrow-right-bold-circle", label: "Proceed", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.ALLOW, icon: "check-circle", label: "Allow", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.DENY, icon: "close-circle", label: "Deny", classes: ["btn-text", "btn-dark"], weight: 0}
];

export function createMessage(title, message, buttons, prompt = false)
{
	return new Promise(resolve =>
	{
		const overlay = createElement("div", el => el.classList.add("latte-overlay", "is-visible"));
		const panel = createElement("div", el => el.classList.add("panel", "panel-alert"));
		const panelTitle = createElement("div", el => el.classList.add("panel-header"));
		const panelContent = createElement("div", el => el.classList.add("panel-body"));
		const panelFooter = createElement("div", el => el.classList.add("panel-footer", "justify-content-end"));

		needsZIndex(z => overlay.style.setProperty("z-index", z));

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
			const el = createElement("button", el => el.classList.add("btn", "btn-contained", ...button.classes));

			if (button.icon !== null)
				el.appendChild(createElement("i", i => i.classList.add("mdi", `mdi-${button.icon}`)));

			el.appendChild(createElement("span", span => span.innerHTML = button.label));

			el.addEventListener("click", () =>
			{
				raf(() => overlay.classList.remove("is-open"));
				raf(() => overlay.classList.remove("is-visible"), 270);

				Latte.actions.dispatch("latte:overlay", {overlay, open: false});

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

		document.body.appendChild(overlay);

		Latte.actions.dispatch("latte:overlay", {overlay, open: true});

		raf(() =>
		{
			overlay.classList.add("is-visible");

			raf(() => overlay.classList.add("is-open"));
		});
	});
}

export function alert(title, message)
{
	return createMessage(title, message, Buttons.OK);
}

export function confirm(title, message)
{
	return createMessage(title, message, Buttons.OK | Buttons.CANCEL);
}

export function prompt(title, message)
{
	return createMessage(title, message, Buttons.OK | Buttons.CANCEL, true);
}

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

export default {

	Buttons,

	ButtonsDescribed,

	createMessage,

	alert,

	confirm,

	prompt

}
