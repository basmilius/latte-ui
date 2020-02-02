<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<main id="app">
		<router-view/>
		<span class="spinner spinner-primary" :class="{'is-hidden': !isLoading}" id="app-spinner"></span>
	</main>

</template>

<script>

	import { Latte } from "../../latte-ui";

	export default {

		name: "App",

		refs: ["overlayOptionsButton"],

		data()
		{
			return {
				isLoading: false
			};
		},

		mounted()
		{
			Latte.action.on("latte-docs:navigate", () => this.isLoading = true);
			Latte.action.on("latte-docs:navigated", () => this.isLoading = false);
		}

	}

</script>
