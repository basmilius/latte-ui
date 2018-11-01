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

/**
 * Creates the latte-tree-view and latte-tree-view-item components.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component("latte-tree-view", {

		props: {

			url: {
				required: true,
				type: String
			}

		},

		template: ` <div class="tree-view">
						<latte-tree-view-item v-for="(child, key) of children" :key="key" :id="child.id" :parent_id="child.parent_id" :icon="child.icon" :name="child.name" :children="child.children || []" @change="click($event)"></latte-tree-view-item>
					</div>`,

		/**
		 * Provides the dataset for our Vue Component/
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				children: []
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
			this.load();
		},

		methods: {

			/**
			 * Invoked when a folder is clicked.
			 *
			 * @param {Number} id
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			click(id)
			{
				this.$emit("change", id);
			},

			/**
			 * Loads the treeview data.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			load()
			{
				request(this.url)
					.then(r => r.json())
					.then(this.onResponse);
			},

			/**
			 * Invoked when the treeview response is received.
			 *
			 * @param response
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onResponse(response)
			{
				this.children = response.data;
			}

		}

	});

	Vue.component("latte-tree-view-item", {

		props: {

			id: {
				required: true,
				type: Number
			},

			parent_id: {
				required: true,
				type: Number | undefined
			},

			icon: {
				default: "folder",
				required: false,
				type: String
			},

			name: {
				required: true,
				type: String
			},

			children: {
				default: [],
				required: false,
				type: Array
			}

		},

		template: ` <div class="tree-view-item">
						<div class="tree-view-item-label" :class="{'is-expanded': is_expanded}" @click="click(id)">
							<button class="btn btn-icon btn-dark btn-sm" @click="toggle" v-if="children.length > 0"><i class="mdi mdi-chevron-right"></i></button>
							<i :class="['tree-view-item-label-icon', 'mdi', 'mdi-' + icon]"></i>
							<span class="tree-view-item-label-label">{{ name }}</span>
						</div>
						<div class="tree-view-item-children" v-if="children.length > 0 && is_expanded">
							<latte-tree-view-item v-for="(child, key) of children" :key="key" :id="child.id" :parent_id="child.parent_id" :icon="child.icon" :name="child.name" :children="child.children || []" @change="click($event)"></latte-tree-view-item>
						</div>
					</div>`,

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
				is_expanded: false
			};
		},

		methods: {

			/**
			 * Invoked when the folder is clicked.
			 *
			 * @param {Number} id
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			click(id)
			{
				this.$emit("change", id);
			},

			/**
			 * Toggles expanded state.
			 *
			 * @param {MouseEvent} evt
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			toggle(evt)
			{
				evt.preventDefault();
				evt.stopPropagation();

				this.is_expanded = !this.is_expanded;
			}

		}

	});

}
