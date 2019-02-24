/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import LatteSDK from "./js/sdk";

import { dispatch, on } from "./js/actions";
import { interval, setOptions } from "./js/core";
import { removeSavedFromQueryString } from "./js/util/dom";
import { setCookie } from "./js/util/cookies";
import { initializeHoudiniApis } from "./js/houdini-apis";
import { initializeForms } from "./js/ui/forms";
import { initializeNotices } from "./js/ui/notices";
import { initializePanels } from "./js/ui/panels";
import { initializeTooltips } from "./js/ui/tooltip";
import { registerOutsideEvents } from "./js/hid/OutsideEvent";
import { registerPointerEventsPolyfill } from "./js/hid/PointerEvents";

import * as Components from "./vue/component";
import * as Directives from "./vue/directive";
import * as Mixins from "./vue/mixin"
import * as RTEPlugins from "./vue/rich-text-editor";
import * as Widgets from "./vue/widget";

import "./scss/app.scss";

export const DefaultOptions = Object.assign({}, self.LatteOptions || {}, {
	locale: navigator.language,
	tickInterval: 250
});

export const Latte = LatteSDK;

export const LatteUI = {

	install(Vue, options = {})
	{
		options = this.normalizeOptions(options);

		if (typeof self.LatteRoot === "undefined")
			self.LatteRoot = null;

		Vue.prototype.$latte = LatteSDK;
		Vue.prototype.$latteOptions = options;

		setOptions(options);

		registerOutsideEvents();
		registerPointerEventsPolyfill();
		initializeHoudiniApis();

		this.registerDirectives(Vue);
		this.registerMixins(Vue);
		this.registerComponents(Vue);

		interval(options.tickInterval, () => this.onTick());
		on("latte:switch-theme", data => this.onSwitchTheme(data));

		window.addEventListener("load", () => this.onDOMContentLoaded());

		removeSavedFromQueryString();

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
		Object.values(Widgets).forEach(w => Vue.component(w.name, w));
	},

	registerDirectives(Vue)
	{
		Object.values(Directives).forEach(d => Vue.directive(d.name, d));
	},

	registerMixins(Vue)
	{
		Object.values(Mixins).forEach(m => Vue.mixin(m));
	},

	onDOMContentLoaded()
	{
		initializeForms();
		initializeNotices();
		initializePanels();
		initializeTooltips();
	},

	onSwitchTheme(data)
	{
		const {themeId} = data;

		if (themeId === undefined)
			return;

		document.body.dataset.theme = themeId;
		setCookie("$ui:theme", themeId);
	},

	onTick()
	{
		if (document.hidden === true)
			return;

		dispatch("latte:tick", window.performance.now());
	}

};

export default LatteUI;
