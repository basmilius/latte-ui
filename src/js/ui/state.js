/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getCookie, setCookie } from "../util/cookies.js";
import { querySelectorAll } from "../util/dom.js";

/**
 * Creates the UI state.
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function create$UIMixin()
{
	const mixin = new Vue({

		/**
		 * Provides the dataset for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				is_compact: getCookie("$ui:collapsed") === true,
				is_nav_open: false
			};
		},

		methods: {

			/**
			 * Toggles the primary nav.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			toggleNav()
			{
				this.is_compact = !this.is_compact;
				this.is_nav_open = !this.is_nav_open;
			}

		},

		watch: {

			/**
			 * Invoked when is_compact has changed.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			is_compact()
			{
				setCookie("$ui:collapsed", this.is_compact);

				if (this.is_compact)
					querySelectorAll("[data-ui-is-compact]").forEach(el => el.classList.add("is-compact"));
				else
					querySelectorAll("[data-ui-is-compact]").forEach(el => el.classList.remove("is-compact"));
			},

			/**
			 * Invoked when is_nav_open has changed.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			is_nav_open()
			{
				if (this.is_nav_open)
					querySelectorAll("[data-ui-is-nav-open]").forEach(el => el.classList.add("is-nav-open"));
				else
					querySelectorAll("[data-ui-is-nav-open]").forEach(el => el.classList.remove("is-nav-open"));
			}

		}

	});

	Vue.mixin({

		/**
		 * Invoked before our Vue Object is created.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		beforeCreate()
		{
			this.$ui = mixin;
		}

	});

	return mixin;
}
