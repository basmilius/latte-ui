<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="tab" v-if="active">
		<slot></slot>
	</div>

</template>

<script>

	export default {

		name: "latte-tab",

		props: {
			badge: {default: "", type: String},
			icon: {default: "", type: String},
			label: {default: "", type: String}
		},

		data()
		{
			return {
				active: false
			};
		},

		mounted()
		{
			this.$parent.updateChildren();
		},

		watch: {

			active()
			{
				this.$emit("active", this.active);
			}

		}

	}

</script>
