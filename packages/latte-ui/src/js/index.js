/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import LatteSDK from "./sdk";

import { dispatch, initializeActions, removeSavedFromQueryString } from "./core/action";
import { getOptions, setOptions, timeout } from "./core";
import { initializeHoudiniApis } from "./houdini";
import { registerOutsideEvents } from "./hid/OutsideEvent";
import { initializeUI } from "./ui";
import { raf } from "./util/dom";

import * as Components from "../vue/component";
import * as Mixins from "../vue/mixin"

import { initializeEmoji } from "./ui/emoji";
import { isSomethingScrolling } from "./ui/scrollbar";
import { deepMerge } from "./util/object";

function iconFactory(icon, h = undefined, hOptions = {})
{
	if (h)
		return h("i", deepMerge({}, {class: ["mdi", `mdi-${icon}`]}, hOptions));

	return `<i class="mdi mdi-${icon}"></i>`;
}

function normalizeOptions(options)
{
	return Object.assign({}, defaultOptions, options);
}

export const defaultOptions = {
	emojiBaseUrl: "https://g.s3.bmcdn.nl/assets/joypixels/v5",
	emojiEnabled: false,
	emojiPath: "/png/64/@0.png",
	i18n: {},
	iconFactory: iconFactory,
	iconSelector: ".mdi",
	locale: navigator.language,
	root: undefined,
	tickInterval: 200
};

let foundMainElement = false;
let tickTimeout = 0;

export class LatteUI
{
	static install(Vue, options = {})
	{
		options = normalizeOptions(options);
		setOptions(options);

		if (options.emojiEnabled)
			initializeEmoji(options);

		initializeHoudiniApis();
		registerOutsideEvents();

		this.findMainElement(Vue);
		this.registerMixins(Vue);
		this.registerComponents(Vue);

		raf(() => this.onTick());

		document.addEventListener("visibilitychange", () => this.onVisibilityChange());
		window.addEventListener("load", () => this.onDOMContentLoaded(), {passive: true});
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

	static onVisibilityChange()
	{
		if (document.hidden)
			clearTimeout(tickTimeout);
		else
			LatteUI.onTick();
	}

	static onTick()
	{
		clearTimeout(tickTimeout);

		if (document.hidden === true)
			return;

		tickTimeout = timeout(getOptions().tickInterval, () => LatteUI.onTick());

		if (isSomethingScrolling)
			return;

		dispatch("latte:tick", window.performance.now());
	}
}

export const Latte = LatteSDK;
export default LatteUI;
