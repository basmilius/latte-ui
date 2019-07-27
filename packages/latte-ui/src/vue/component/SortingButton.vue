<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
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
			ariaLabel: {default: null, type: String | null},
			buttonClass: {default: "btn btn-icon btn-text btn-dark", type: String},
			isSorting: {default: false, type: Boolean},
			isSortingAscending: {default: true, type: Boolean}
		},

		methods: {

			onClick(evt)
			{
				this.$emit("click", evt);
			}

		}

	}

</script>
