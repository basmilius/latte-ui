<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<router-link :to="to">
		<template #default="{href, isExactActive, navigate}">

			<latte-ripple as="a" class="nav-link" :class="{'is-active': isExactActive}" :href="href" :tabindex="isExactActive ? 0 : -1" @click="navigate">
				<slot></slot>
			</latte-ripple>

		</template>
	</router-link>

</template>

<script>

	export default {

		name: "DrawerMenuItem",

		props: {
			to: {default: "/", type: String}
		}

	}

</script>
