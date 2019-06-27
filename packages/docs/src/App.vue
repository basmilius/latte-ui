<template>

	<div id="app">

		<ReleaseNotesOverlay/>

		<router-view/>

		<span class="spinner spinner-primary" :class="{'is-hidden': !isLoading}" id="app-spinner"></span>

	</div>

</template>

<script>

	import { Latte } from "../../latte-ui";
	import ReleaseNotesOverlay from "./components/ReleaseNotesOverlay";

	export default {

		name: "App",

		components: {ReleaseNotesOverlay},

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
