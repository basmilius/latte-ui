/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";
import SnackbarDialog from "../../vue/component/base/SnackbarDialog.vue";

import { Locations } from "./snackbar-shared";
import { on } from "../core/action";
import { createElement } from "../util/dom";
import { getMainElement } from "../options";

let isSnackbarOpen = false;
let snackbars = [];

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

export function create(options = {})
{
	options = Object.assign({}, defaultOptions, options);

	if (options.action)
		options.action = Object.assign({}, defaultActionOptions, options.action);

	return new Promise(resolve =>
	{
		const SnackbarDialogClass = Vue.extend(SnackbarDialog);

		const mount = createElement("div");
		const snackbar = new SnackbarDialogClass({
			propsData: {
				options,
				resolve
			}
		});

		snackbars.push(snackbar);

		getMainElement().appendChild(mount);

		snackbar.$mount(mount);
		snackbar.$on("delete-me", () => snackbar.$destroy());

		onTick();
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
