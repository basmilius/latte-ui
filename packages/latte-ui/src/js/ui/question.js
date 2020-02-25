/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";
import QuestionDialog from "../../vue/component/base/QuestionDialog.vue";

import { createElement } from "../util/dom";
import { getMainElement } from "../options";

const defaultOptions = {
	width: "300px"
};

export function create(icon, message, buttons, options = {})
{
	options = Object.assign({}, defaultOptions, options);

	return new Promise(resolve =>
	{
		const QuestionDialogClass = Vue.extend(QuestionDialog);

		const mount = createElement("div");
		const question = new QuestionDialogClass({
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
		question.$on("delete-me", () => question.$destroy());
	});
}

export default {
	create
};
