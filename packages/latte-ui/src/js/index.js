/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import LatteSDK from "./sdk";

import { dispatch, initializeActions, on, removeSavedFromQueryString } from "./core/action";
import { getOptions, interval, setOptions } from "./core";
import { setCookie } from "./util/cookies";
import { initializeHoudiniApis } from "./houdini";
import { registerOutsideEvents } from "./hid/OutsideEvent";
import { initializeUI } from "./ui";
import { raf } from "./util/dom";

import * as Components from "../vue/component";
import * as Mixins from "../vue/mixin"
import * as RTEPlugins from "../vue/rich-text-editor";

import "../scss/app.scss";

export const defaultOptions = {
	i18n: {},
	locale: navigator.language,
	tickInterval: 250
};

function normalizeOptions(options)
{
	return Object.assign({}, defaultOptions, options);
}

let foundMainElement = false;
let lastScroll = 0;

export class LatteUI
{
	static install(Vue, options = {})
	{
		options = normalizeOptions(options);

		initializeHoudiniApis();
		registerOutsideEvents();
		setOptions(options);

		LatteUI.findMainElement(Vue);
		LatteUI.registerMixins(Vue);
		LatteUI.registerComponents(Vue);

		interval(options.tickInterval, () => raf(() => LatteUI.onTick()));
		on("latte:switch-theme", data => LatteUI.onSwitchTheme(data));

		window.addEventListener("load", () => LatteUI.onDOMContentLoaded(), {passive: true});
		window.addEventListener("scroll", () => LatteUI.onWindowScroll(), {passive: true});
	}

	static findMainElement(Vue)
	{
		Vue.mixin({
			created()
			{
				if (foundMainElement)
					return;

				foundMainElement = true;

				setOptions(Object.assign({}, getOptions(), {
					mainElement: this.$root.$el
				}));
			}
		});
	}

	static registerComponents(Vue)
	{
		Object.values(Components).forEach(c => Vue.component(c.name, c));
		Object.values(RTEPlugins).forEach(p => Vue.component(p.name, p));
	}

	static registerMixins(Vue)
	{
		Object.values(Mixins).forEach(m => Vue.mixin(m));
	}

	static onDOMContentLoaded()
	{
		initializeActions();
		initializeUI();
		removeSavedFromQueryString();
	}

	static onSwitchTheme(data)
	{
		const {themeId} = data;

		if (themeId === undefined)
			return;

		document.documentElement.dataset.theme = themeId;
		setCookie("$ui:theme", themeId);
	}

	static onTick()
	{
		if (document.hidden === true)
			return;

		if (Date.now() - lastScroll < 100)
			return;

		dispatch("latte:tick", window.performance.now());
	}

	static onWindowScroll()
	{
		lastScroll = Date.now();
	}
}

export const Latte = LatteSDK;
export default LatteUI;
