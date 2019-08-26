/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

import { dispatch } from "../core/action";
import { createElement, raf } from "../util/dom";
import { spaceship } from "../operators";
import { translate } from "../i18n";
import { applyZ } from "../core/z";
import { getMainElement, icon } from "../core";
import { popupClosed, popupOpened } from "../core/popup";

const MessagePanel = Vue.extend({

	props: {
		buttons: {default: () => [], required: true, type: Array},
		message: {default: "", required: true, type: String},
		prompt: {default: false, required: true, type: Boolean},
		resolve: {required: true, type: Function},
		title: {default: "", required: true, type: String}
	},

	data()
	{
		return {
			isOpen: false,
			promptResult: "",
			z: 0
		};
	},

	render(h)
	{
		return h("div", {attrs: {role: "dialog"}, class: ["overlay", "is-visible", this.isOpen ? "is-open" : "is-not-open"], style: {zIndex: this.z}}, [
			h("div", {class: ["panel"], style: {width: "540px"}}, [
				h("div", {class: ["panel-header"]}, [
					h("span", {class: ["panel-title"]}, this.title)
				]),
				h("div", {class: ["panel-body"]}, [
					h("p", {domProps: {innerHTML: this.message}}),
					!this.prompt ? undefined : h("div", {class: ["form-group"]}, [
						h("input", {
							attrs: {
								type: "text"
							},
							class: ["form-control"],
							props: {
								value: this.promptResult
							},
							on: {
								input: v => this.promptResult = v.target.value,
								keydown: v => v.key === "Enter" && this.promptResult.trim() !== "" ? this.close(this.buttons[this.buttons.length - 1].id) : undefined
							}
						})
					])
				]),
				h("div", {class: ["panel-footer", "justify-content-end"]}, this.buttons.map(button => h("latte-ripple", {
					class: ["btn", ...button.classes],
					on: {
						click: () => this.close(button.id)
					},
					props: {
						as: "button"
					}
				}, [
					button.icon !== null ? icon(button.icon, h) : undefined,
					h("span", {}, button.label)
				])))
			])
		]);
	},

	methods: {

		close(buttonId)
		{
			raf(() => this.isOpen = false);
			raf(() => this.$emit("delete-me"), 300);

			popupClosed();

			this.resolve({
				button: buttonId,
				input: this.promptResult
			});
		},

		open()
		{
			applyZ(z => this.z = z);
			raf(() => raf(() => this.isOpen = true));

			popupOpened();

			if (this.prompt)
				raf(() => this.$el.querySelector("input").focus(), 300);
		}

	},

	watch: {

		isOpen()
		{
			dispatch("latte:overlay", {overlay: this.$el, open: this.isOpen});
		}

	}

});

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

export function create(title, message, buttons, prompt = false)
{
	return new Promise(resolve =>
	{
		const mount = createElement("div");
		const dialog = new MessagePanel({
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

		dialog.open();
		dialog.$on("delete-me", () =>
		{
			dialog.$destroy();
			getMainElement().removeChild(dialog.$el);
		});
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
	actualButtons.forEach(button => button.label = translate("latte-ui", button.label));

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
