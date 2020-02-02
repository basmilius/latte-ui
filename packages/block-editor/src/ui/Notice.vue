<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="notice" :class="`notice-${type}`">
		<Icon :name="icon" v-if="icon"/>
		<slot></slot>
	</div>

</template>

<script>

	import Icon from "./Icon";

	export default {

		name: "Notice",

		components: {Icon},

		props: {
			icon: {default: null, type: String | null},
			type: {default: "info", type: String}
		}

	}

</script>
