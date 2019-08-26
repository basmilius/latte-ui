/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";
import { on } from "../core/action";
import { conditionalRender, createElement, raf } from "../util/dom";
import { getMainElement } from "../core";
import { applyZ } from "../core/z";

let isSnackbarOpen = false;
let snackbars = [];

export const Locations = {
	BOTTOM: 1,
	BOTTOM_LEFT: 2,
	BOTTOM_RIGHT: 4,
	TOP: 8,
	TOP_LEFT: 16,
	TOP_RIGHT: 32
};

const defaultOptions = {
	action: null,
	duration: 4000,
	location: Locations.BOTTOM,
	message: ""
};

const defaultActionOptions = {
	color: "primary",
	label: "OK"
};

const Snackbar = Vue.extend({

	props: {
		options: {required: true, type: Object},
		resolve: {required: true, type: Function}
	},

	data()
	{
		return {
			isOpen: false,
			timer: 0,
			z: 0
		};
	},

	render(h)
	{
		return h("div", {class: ["snackbar", locationToClass(this.options.location), this.isOpen ? "is-open" : "is-not-open"], style: {zIndex: this.z}}, [
			h("div", {class: "snackbar-body"}, this.options.message),
			conditionalRender(this.options.action, () => h("button", {
				class: ["btn", "btn-text", `btn-${this.options.action.color}`],
				on: {
					click: () => this.close(true)
				}
			}, this.options.action.label))
		]);
	},

	methods: {

		close(wasAction = false)
		{
			this.isOpen = false;

			if (this.timer !== 0)
				clearTimeout(this.timer);

			this.resolve(wasAction);
			raf(() => this.$emit("delete-me"), 240);
		},

		open()
		{
			applyZ(z => this.z = z);
			raf(() => raf(() => this.isOpen = true));

			if (this.options.duration > 0)
				this.timer = setTimeout(() => this.close(), this.options.duration);
		}

	}

});

export function create(options = {})
{
	options = Object.assign({}, defaultOptions, options);

	if (options.action)
		options.action = Object.assign({}, defaultActionOptions, options.action);

	return new Promise(resolve =>
	{
		const mount = createElement("div");
		const snackbar = new Snackbar({
			propsData: {
				options,
				resolve
			}
		});

		snackbars.push(snackbar);

		getMainElement().appendChild(mount);
		snackbar.$mount(mount);

		onTick();

		snackbar.$on("delete-me", () =>
		{
			snackbar.$destroy();
			getMainElement().removeChild(snackbar.$el);
		});
	}).then(r =>
	{
		isSnackbarOpen = false;
		onTick();

		return r;
	});
}

export function initializeSnackbars()
{
	on("latte:tick", onTick);
}

function locationToClass(location)
{
	switch (location)
	{
		case Locations.BOTTOM:
			return "snackbar-bottom";

		case Locations.BOTTOM_LEFT:
			return "snackbar-bottom-left";

		case Locations.BOTTOM_RIGHT:
			return "snackbar-bottom-right";

		case Locations.TOP:
			return "snackbar-top";

		case Locations.TOP_LEFT:
			return "snackbar-top-left";

		case Locations.TOP_RIGHT:
			return "snackbar-top-right";


	}
}

function onTick()
{
	if (isSnackbarOpen || snackbars.length === 0)
		return;

	const snackbar = snackbars.shift();
	snackbar.open();

	isSnackbarOpen = true;
}

export default {
	Locations,
	create
};
