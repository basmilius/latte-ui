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
 * Creates the latte-widget widget.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createWidget()
{

	Vue.component("latte-widget", {

		props: {

			customBody: {
				default: false,
				required: false,
				type: Boolean
			},

			widgetId: {
				type: Number,
				required: true
			}

		},

		template: ` <div class="panel widget" :class="{'is-custom-body': customBody}" tabindex="0">
 
						<div class="panel-header">
							<div class="widget-drag-handle grid-item-drag-handle"></div>
							
							<slot name="custom_title"></slot>
							
							<div class="ml-auto d-flex flex-row align-items-center">
								<slot name="title"></slot>
								
								<latte-button-dropdown icon="dots-vertical" :small="true" type="list">
									<nav class="nav latte-nav-list">
										<slot name="widget_menu"></slot>
										<a class="nav-link" @click="removeWidget()"><i class="mdi mdi-delete"></i> <span>Delete widget</span></a>
									</nav>
								</latte-button-dropdown>
							</div>
						</div>
						
						<div class="panel-body">
							<slot name="content"></slot>
						</div>
						
						<slot name="footer"></slot>
						
					</div>`,

		/**
		 * Provides the initial dataset for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				i18n: {
					delete: "Delete",
					widgetDeleteConfirmationTitle: "Are you sure?",
					widgetDeleteConfirmationBody: "This widget will be deleted permanently!"
				}
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
			this.loadI18n();

			window.addEventListener("translationsLoaded", () => this.loadI18n());
		},

		methods: {

			/**
			 * Loads i18n strings.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			loadI18n()
			{
				this.i18n = Latte.i18n.forObject(this.i18n);
			},

			/**
			 * Asks the widget holder to remove this widget.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			removeWidget()
			{
				Latte.ui
					.confirm(this.i18n.widgetDeleteConfirmationTitle, this.i18n.widgetDeleteConfirmationBody)
					.then(r =>
					{
						if (r.button !== Latte.ui.Buttons.OK)
							return;

						this.$emit("remove", this.widgetId);
					});
			}

		}

	});

}
