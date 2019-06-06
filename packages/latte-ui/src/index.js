/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import LatteSDK from "./js/sdk";

import { dispatch, initializeActions, on, removeSavedFromQueryString } from "./js/core/action";
import { getOptions, interval, setOptions } from "./js/core";
import { setCookie } from "./js/util/cookies";
import { initializeHoudiniApis } from "./js/houdini";
import { registerOutsideEvents } from "./js/hid/OutsideEvent";

import * as Components from "./vue/component";
import * as Mixins from "./vue/mixin"
import * as RTEPlugins from "./vue/rich-text-editor";

import "./scss/app.scss";
import { initializeUI } from "./js/ui";

export const DefaultOptions = Object.assign({}, {
	i18n: {},
	locale: navigator.language,
	tickInterval: 250
}, self["LatteOptions"] || {});

export const Latte = LatteSDK;

let foundMainElement = false;
let lastScroll = 0;

export const LatteUI = {

	install(Vue, options = {})
	{
		options = this.normalizeOptions(options);

		Vue.prototype.$latte = LatteSDK;

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

		setOptions(options);

		registerOutsideEvents();
		initializeHoudiniApis();

		this.registerMixins(Vue);
		this.registerComponents(Vue);

		interval(options.tickInterval, () => this.onTick());
		on("latte:switch-theme", data => this.onSwitchTheme(data));

		window.addEventListener("load", () => this.onDOMContentLoaded(), {passive: true});
		window.addEventListener("scroll", () => this.onWindowScroll(), {passive: true});

		if (window)
			window.Latte = LatteSDK;
		else
			self.Latte = LatteSDK;
	},

	normalizeOptions(options)
	{
		return Object.assign({}, DefaultOptions, options);
	},

	registerComponents(Vue)
	{
		Object.values(Components).forEach(c => Vue.component(c.name, c));
		Object.values(RTEPlugins).forEach(p => Vue.component(p.name, p));
	},

	registerMixins(Vue)
	{
		Object.values(Mixins).forEach(m => Vue.mixin(m));
	},

	onDOMContentLoaded()
	{
		initializeActions(getOptions().useHashActions === true);
		initializeUI();
		removeSavedFromQueryString();
	},

	onSwitchTheme(data)
	{
		const {themeId} = data;

		if (themeId === undefined)
			return;

		document.documentElement.dataset.theme = themeId;
		setCookie("$ui:theme", themeId);
	},

	onTick()
	{
		if (document.hidden === true)
			return;

		if (Date.now() - lastScroll < 100)
			return;

		dispatch("latte:tick", window.performance.now());
	},

	onWindowScroll()
	{
		lastScroll = Date.now();
	}

};

export default LatteUI;
