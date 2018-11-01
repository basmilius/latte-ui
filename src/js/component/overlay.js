/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { timeout } from "../util/core.js";
import { register } from "../sdk.js";

const appMount = document.querySelector("body");
const overlays = {

	registry: {},

	counter: 0,

	/**
	 * Finds an overlay by name.
	 *
	 * @param {String} name
	 *
	 * @returns {*}
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	find(name)
	{
		if (typeof this.registry[name] === "undefined")
			throw new Error(`Overlay ${name} is not registred!`);

		return this.registry[name];
	},

	/**
	 * Registers an overlay.
	 *
	 * @param {String} name
	 * @param {*} overlay
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	register(name, overlay)
	{
		this.registry[name] = overlay;
	},

	/**
	 * Closes an overlay by name.
	 *
	 * @param {String} name
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	close(name)
	{
		let overlay = this.find(name);
		overlay.close();
	},

	/**
	 * Opens an overlay by name.
	 *
	 * @param {String} name
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	open(name)
	{
		let overlay = this.find(name);
		overlay.open();

		setTimeout(() => overlay.$el.style.zIndex = `${2000000 + this.counter}`, 1);

		this.counter++;
	}

};

export const Overlays = overlays;

/**
 * Creates our latte-overlay component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component("latte-overlay", {

		props: {

			name: {
				required: true,
				type: String
			},

			opened: {
				default: false,
				type: Boolean
			}

		},

		template: ` <div class="latte-overlay" role="dialog" :class="{'is-visible': isVisible, 'is-open': isOpen}" v-if="isVisible" v-cloak>
						<slot></slot>
					</div>`,

		/**
		 * Provides the initial data for our Vue Component.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				isOpen: false,
				isVisible: false
			};
		},

		/**
		 * Invoked when our Component is destroyed.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		destroyed()
		{
			delete overlays[this.name];
		},

		/**
		 * Invoked when our Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			overlays.register(this.name, this);

			this.$el.parentNode.removeChild(this.$el);
			appMount.appendChild(this.$el);

			if (this.opened)
				overlays.open(this.name);
		},

		methods: {

			/**
			 * Closes the overlay.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			close()
			{
				this.isOpen = false;
				timeout(270, () => this.isVisible = false);

				document.dispatchEvent(new CustomEvent("latte:overlay", {detail: {overlay: this, open: false}}));
				this.$emit("close", this);
			},

			/**
			 * Opens the overlay.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			open()
			{
				if (this.isVisible)
					return;

				this.isVisible = true;
				timeout(20, () => this.isOpen = true);

				document.dispatchEvent(new CustomEvent("latte:overlay", {detail: {overlay: this, open: true}}));
				this.$emit("open", this);
			}

		}

	});

	Vue.directive("latte-overlay", {

		/**
		 * Invoked when the Directive is bound to {@see el}.
		 *
		 * @param {HTMLElement} el
		 * @param {*} binding
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		bind(el, binding)
		{
			el.addEventListener("click", event =>
			{
				event.preventDefault();
				event.stopPropagation();

				overlays.open(binding.value["overlay"]);
			});
		}

	});

	Vue.directive("latte-overlay-close", {

		/**
		 * Invoked when the Directive is bound to {@see el}.
		 *
		 * @param {HTMLElement} el
		 * @param {*} binding
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		bind(el, binding)
		{
			el.addEventListener("click", event =>
			{
				event.preventDefault();
				event.stopPropagation();

				overlays.close(binding.value["overlay"]);
			});
		}

	});

	register(latte => latte.overlays = overlays);

}
