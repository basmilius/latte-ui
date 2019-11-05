<template>

	<KeepAliveTab :label="label" class="be-settings-pane">
		<slot></slot>
	</KeepAliveTab>

</template>

<script>

	import KeepAliveTab from "./KeepAliveTab";

	export default {

		name: "SettingsPane",

		components: {KeepAliveTab},

		props: {
			label: {required: true, type: String}
		}

	}

</script>
