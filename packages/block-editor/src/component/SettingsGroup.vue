<template>

	<div class="be-settings-group">

		<div class="settings-header">
			{{ title | beTranslate }}
		</div>

		<div class="settings-body" :class="{'is-padded': padded}">
			<slot></slot>
		</div>

	</div>

</template>

<script>

	import { findEditor } from "../util/vue";

	export default {

		name: "SettingsGroup",

		props: {
			padded: {default: false, type: Boolean},
			title: {default: "Group", type: String}
		},

		data()
		{
			return {
				editor: findEditor(this)
			};
		}

	}

</script>
