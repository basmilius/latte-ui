<template>

	<div id="app">
		<router-view/>
		<span class="spinner spinner-primary" :class="{'is-hidden': !isLoading}" id="app-spinner"></span>
	</div>

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
