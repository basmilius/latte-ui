<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div :class="classes">
		<slot name="content" v-bind="{icon, isFluid, type}">
			<Icon :name="icon" v-if="icon"/>
			<slot></slot>
		</slot>
	</div>

</template>

<script>

	import Icon from "./Icon";

	export default {

		name: "Notice",

		components: {Icon},

		props: {
			icon: {default: null, type: String | null},
			isFluid: {default: false, type: Boolean},
			type: {default: "info", type: String}
		},

		computed: {

			classes()
			{
				const classes = ["notice", `notice-${this.type}`];

				if (this.isFluid)
					classes.push("is-fluid");

				return classes;
			}

		}

	}

</script>
