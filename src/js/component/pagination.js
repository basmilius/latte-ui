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
 * Creates the latte-pagination component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component("latte-pagination", {

		props: {
			pagination: {
				type: Array,
				required: true
			}
		},

		template: ` <nav class="pagination ml-auto" role="navigation">
						<template v-for="(entry, entryKey) in pagination">
							<a @click="navigate(entry.page)" class="pagination-item" :class="{'is-current': entry.is_current, 'is-disabled': entry.is_disabled}" role="menuitem">
								<template v-if="entry.is_dots">&hellip;</template>
								<template v-else-if="entry.label === 'first'"><i class="mdi mdi-chevron-double-left"></i></template>
								<template v-else-if="entry.label === 'prev'"><i class="mdi mdi-chevron-left"></i></template>
								<template v-else-if="entry.label === 'next'"><i class="mdi mdi-chevron-right"></i></template>
								<template v-else-if="entry.label === 'last'"><i class="mdi mdi-chevron-double-right"></i></template>
								<template v-else>{{ entry.label }}</template>
							</a>
						</template>
					</nav>`,

		methods: {

			/**
			 * Emits the navigate event.
			 *
			 * @param {Number} page
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			navigate(page)
			{
				this.$emit("navigate", page);
			}

		}

	});

}
