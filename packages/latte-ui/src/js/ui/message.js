/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";
import MessageDialog from "../../vue/component/base/MessageDialog.vue";

import { createElement } from "../util/dom";
import { spaceship } from "../operators";
import { translate } from "../i18n";
import { getMainElement } from "../options";

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
	{id: Buttons.OK, icon: "check-circle", label: "ok", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.CANCEL, icon: null, label: "cancel", classes: ["btn-text"], weight: 0},
	{id: Buttons.YES, icon: "check-circle", label: "yes", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.NO, icon: null, label: "no", classes: ["btn-text"], weight: 0},
	{id: Buttons.UPDATE, icon: "check-circle", label: "update", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.SAVE, icon: "check-circle", label: "save", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.REMOVE, icon: "alert-circle", label: "remove", classes: ["btn-contained", "btn-error"], weight: 1},
	{id: Buttons.CREATE, icon: "check-circle", label: "create", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.GO, icon: "arrow-right-bold-circle", label: "go", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.PROCEED, icon: "arrow-right-bold-circle", label: "proceed", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.ALLOW, icon: "check-circle", label: "allow", classes: ["btn-contained", "btn-primary"], weight: 1},
	{id: Buttons.DENY, icon: "close-circle", label: "deny", classes: ["btn-text"], weight: 0}
];

export function create(title, message, buttons, prompt = false)
{
	return new Promise(resolve =>
	{
		const MessageDialogClass = Vue.extend(MessageDialog);

		const mount = createElement("div");
		const dialog = new MessageDialogClass({
			propsData: {
				buttons: buttonsToButtons(buttons),
				message,
				prompt,
				resolve,
				title
			}
		});

		getMainElement().appendChild(mount);

		dialog.$mount(mount);
		dialog.$on("delete-me", () => dialog.$destroy());
	});
}

export function alert(title, message)
{
	return create(title, message, Buttons.OK);
}

export function confirm(title, message)
{
	return create(title, message, Buttons.OK | Buttons.CANCEL);
}

export function prompt(title, message)
{
	return create(title, message, Buttons.OK | Buttons.CANCEL, true);
}

function buttonsToButtons(buttons)
{
	let actualButtons = [];

	for (let i in ButtonsDescribed)
		if (ButtonsDescribed.hasOwnProperty(i) && (buttons & ButtonsDescribed[i].id) === ButtonsDescribed[i].id)
			actualButtons.push(ButtonsDescribed[i]);

	actualButtons = actualButtons.sort((a, b) => spaceship(a.weight, b.weight));
	actualButtons.forEach(button => button.label = translate("latte_ui", button.label));

	return actualButtons;
}

export default {
	Buttons,
	ButtonsDescribed,
	create,
	alert,
	confirm,
	prompt
}
