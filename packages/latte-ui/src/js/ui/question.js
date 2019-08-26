/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

import { createElement, raf } from "../util/dom";
import { applyZ } from "../core/z";
import { dispatch } from "../core/action";
import { getMainElement, icon } from "../core";

const defaultOptions = {
	width: "300px"
};

const QuestionPanel = Vue.extend({

	props: {
		buttons: {default: () => [], required: true, type: Array},
		icon: {default: "home-outline", type: String},
		message: {default: "", required: true, type: String},
		options: {default: () => ({}), required: true, type: Object},
		resolve: {required: true, type: Function}
	},

	data()
	{
		return {
			isOpen: false,
			z: 0
		};
	},

	render(h)
	{
		return h("div", {attrs: {role: "dialog"}, class: ["overlay", "is-visible", this.isOpen ? "is-open" : "is-not-open"], style: {zIndex: this.z}}, [
			h("div", {class: ["panel"], style: {width: this.options.width}}, [
				h("div", {class: ["panel-header", "justify-content-center", "border-bottom-0", "py-4"]}, [
					icon(this.icon, h, {class: ["text-primary"], style: {fontSize: "36px"}})
				]),
				h("div", {class: ["panel-body", "py-0", "text-center"], domProps: {innerHTML: this.message}}),
				h("div", {class: ["d-flex", "flex-column", "p-3"]}, this.buttons.map(button => h("latte-ripple", {
					class: ["btn", "btn-text", "btn-pill", "btn-primary"],
					props: {as: "button"},
					on: {
						click: () => this.close(button.id)
					},
					style: {
						"--btn-height": "42px",
						fontSize: ".9em"
					}
				}, button.label)))
			])
		]);
	},

	methods: {

		close(buttonId)
		{
			raf(() => this.isOpen = false);
			raf(() => this.$emit("delete-me"), 300);

			this.resolve(buttonId);
		},

		open()
		{
			applyZ(z => this.z = z);
			raf(() => raf(() => this.isOpen = true));
		}

	},

	watch: {

		isOpen()
		{
			dispatch("latte:overlay", {overlay: this.$el, open: this.isOpen});
		}

	}

});

export function create(icon, message, buttons, options = {})
{
	options = Object.assign({}, defaultOptions, options);

	return new Promise(resolve =>
	{
		const mount = createElement("div");
		const question = new QuestionPanel({
			propsData: {
				buttons,
				icon,
				message,
				options,
				resolve
			}
		});

		getMainElement().appendChild(mount);
		question.$mount(mount);

		question.open();
		question.$on("delete-me", () =>
		{
			question.$destroy();
			getMainElement().removeChild(question.$el);
		});
	});
}

export default {
	create
};
