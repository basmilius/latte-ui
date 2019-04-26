<template>

	<div id="app">

		<ReleaseNotesOverlay/>

		<router-view/>

		<span class="spinner spinner-primary" :class="{'is-hidden': !isLoading}" id="app-spinner"></span>

	</div>

</template>

<script>

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
			this.$latte.action.on("latte-docs:navigate", () => this.isLoading = true);
			this.$latte.action.on("latte-docs:navigated", () => this.isLoading = false);
		}

	}

</script>
