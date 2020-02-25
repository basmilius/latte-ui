/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import LatteSDK from "./sdk";

import { dispatch, initializeActions, removeSavedFromQueryString } from "./core/action";
import { timeout } from "./core";
import { getOptions, setMainElement, setOptions } from "./options";
import { initializeHoudiniApis } from "./houdini";
import { registerOutsideEvents } from "./hid/OutsideEvent";
import { initializeUI } from "./ui";
import { raf } from "./util/dom";

import * as Components from "../vue/component";
import * as Mixins from "../vue/mixin"

import { initializeEmoji } from "./ui/emoji";
import { isSomethingScrolling } from "./ui/scrollbar";

let foundMainElement = false;
let tickTimeout = 0;

export class LatteUI
{
	static install(Vue, options = {})
	{
		options = setOptions(options);

		if (options.emoji.enabled)
			initializeEmoji(options);

		initializeHoudiniApis();
		registerOutsideEvents();

		this.findMainElement(Vue);
		this.registerMixins(Vue);
		this.registerComponents(Vue);

		raf(() => this.onTick());

		window.Latte = LatteSDK;

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

				setMainElement(this.$root.$el);
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

		tickTimeout = timeout(getOptions().core.tick, () => LatteUI.onTick());

		if (isSomethingScrolling)
			return;

		dispatch("latte:tick", window.performance.now());
	}
}

export const Latte = LatteSDK;
export default LatteUI;
