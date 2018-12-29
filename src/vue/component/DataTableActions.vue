<!--
  - Copyright © 2018 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<td class="actions">
		<div class="column-content flex-row align-items-center pl-0">
			<latte-button-dropdown :aria-label="'More options...'|i18n('data-table')" icon="dots-vertical">
				<nav class="nav nav-list">
					<component data-close v-for="(action, actionKey) in actions" :is="createAction(action, row)" :key="actionKey"></component>
				</nav>
			</latte-button-dropdown>
		</div>
	</td>

</template>

<script>

	const defaultRow = {};

	export default {

		name: "latte-data-table-actions",

		props: {

			actions: {
				default: () => [],
				required: true,
				type: Array
			},

			row: {
				default: () => defaultRow,
				required: true,
				type: Object
			}

		},

		methods: {

			createAction(action, row)
			{
				return Vue.extend({

					template: action.template,

					data()
					{
						return {
							action: action,
							row: row
						};
					}

				});
			}

		}

	}

</script>
