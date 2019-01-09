<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<button :aria-label="ariaLabel" :class="buttonClass" @click="onClick">
		<i class="mdi latte-sorting none" v-if="!isSorting"></i>
		<i class="mdi latte-sorting down" v-else-if="isSortingAscending"></i>
		<i class="mdi latte-sorting up" v-else></i>
	</button>

</template>

<script>

	export default {

		name: "latte-sorting-button",

		props: {

			ariaLabel: {
				default: null,
				required: false,
				type: String | null
			},

			buttonClass: {
				default: "btn btn-icon btn-text btn-dark",
				required: false,
				type: String
			},

			isSorting: {
				default: false,
				required: false,
				type: Boolean
			},

			isSortingAscending: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		methods: {

			onClick(evt)
			{
				this.$emit("click", evt);
			}

		}

	}

</script>
