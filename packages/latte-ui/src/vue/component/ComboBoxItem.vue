<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<a class="nav-link" :class="{'is-hover': active}" role="option" @click="click">
		<slot></slot>
	</a>

</template>

<script>

	export default {

		name: "latte-combo-box-item",

		props: {
			value: {required: true}
		},

		beforeDestroy()
		{
			this.$parent.unregisterOption(this);
		},

		data()
		{
			return {
				active: false
			};
		},

		mounted()
		{
			this.$parent.registerOption(this);
		},

		methods: {

			click()
			{
				this.$emit("select", this);
			}

		}

	}

</script>
