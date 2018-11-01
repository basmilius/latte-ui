/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { request } from "../util/api.js";
import { create } from "../notices.js";
import { handleError } from "../sdk.js";

/**
 * Creates the latte-view-dashboard view.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createView()
{
	Vue.component("latte-view-dashboard", {

		/**
		 * Provides the initial data for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				columns: 12,
				isLoading: true,
				widgets: []
			};
		},

		/**
		 * Invoked when our Vue Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			request("/api/latte/widgets")
				.then(r => r.json())
				.then(r => this.onReceivedWidgets(r))
				.catch(err => handleError(err, () => this.isLoading = false));

			window.addEventListener("resize", () => this.onResize(), {passive: true});
		},

		methods: {

			insertWidget(type)
			{
				if (this.isLoading)
					return;

				this.isLoading = true;

				const data = {dashboard: "private", type: type};

				request("/api/latte/widgets", {body: JSON.stringify(data), method: "POST"})
					.then(r => r.json())
					.then(r => console.log(r))
					.catch(err => create(err.message, "error", true))
					.then(() => this.isLoading = false);
			},

			onReceivedWidgets(response)
			{
				this.widgets = response.data;
				this.onResize();
				this.isLoading = false;
			},

			onResize()
			{
				let columns = 12;

				if (window.innerWidth < 1600)
					columns = 8;

				if (window.innerWidth < 1400)
					columns = 6;

				if (window.innerWidth < 1000)
					columns = 4;

				if (window.innerWidth < 600)
					columns = 2;

				if (window.innerWidth < 400)
					columns = 1;

				this.columns = columns;
			},

			onWidgetMoved(id, x, y)
			{
				for (let i in this.widgets)
				{
					if (!this.widgets.hasOwnProperty(i) || this.widgets[i].id !== id)
						continue;

					this.widgets[i].x = x;
					this.widgets[i].y = y;
				}
			},

			onWidgetResized(id, height, width)
			{
				for (let i in this.widgets)
				{
					if (!this.widgets.hasOwnProperty(i) || this.widgets[i].id !== id)
						continue;

					this.widgets[i].height = height;
					this.widgets[i].width = width;
				}
			}

		}

	});
}
