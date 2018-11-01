/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

/**
 * Creates the latte-repeating-form component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component("latte-repeating-form", {

		props: {

			action: {
				required: true,
				type: String
			},

			method: {
				required: true,
				type: String,
				validator: type => ["get", "post"].indexOf(type) > -1
			}

		},

		template: `	<form :action="action" :method="method" ref="root">
						<slot></slot>
					</form>`,

		/**
		 * Provides the data for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				root: null
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
			this.root = this.$refs["root"];

			Latte.dom.live(this.root, "[data-remove-row]", "click", (btn, evt) => this.onRemoveRow(Latte.dom.closest(btn, "[data-repeating-group]"), evt));
			Latte.dom.live(this.root, "input, select", "change keypress", (field, evt) => this.onFieldChange(Latte.dom.closest(field, "[data-repeating-group]"), evt));
			Latte.dom.querySelectorAll("[data-repeating-group]:last-of-type", this.root).forEach(row => this.onFieldChange(row));
		},

		methods: {

			/**
			 * Invoked when a field changes.
			 *
			 * @param {*} row
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onFieldChange(row)
			{
				const isLast = row.matches(":last-of-type");

				if (!isLast)
					return;

				let newRow = row.cloneNode(true);

				row.parentNode.appendChild(newRow);

				this.truncate(newRow);
			},

			/**
			 * Invoked when the remove button is clicked.
			 *
			 * @param {*} row
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onRemoveRow(row)
			{
				if (row.matches(":only-of-type"))
				{
					let newRow = row.cloneNode(true);

					row.parentNode.appendChild(newRow);

					this.truncate(newRow);
				}

				row.remove();
			},

			/**
			 * Truncates a row.
			 *
			 * @param {*} row
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			truncate(row)
			{
				Latte.dom.querySelectorAll("input, select", row).forEach(node => node["value"] = "");
			}

		}

	});

}
