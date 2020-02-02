<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-ripple as="router-link" class="nav-link" :to="to">
		<slot></slot>
	</latte-ripple>

</template>

<script>

	export default {

		name: "DrawerMenuItem",

		props: {
			to: {default: "/", type: String}
		}

	}

</script>
