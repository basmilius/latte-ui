<template>

	<latte-tab :label="label" class="be-settings-pane">
		<slot></slot>
	</latte-tab>

</template>

<script>

	export default {

		name: "SettingsPane",

		props: {
			label: {required: true, type: String}
		}

	}

</script>
