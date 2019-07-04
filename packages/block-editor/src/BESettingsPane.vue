<template>

	<div class="be-settings-pane">
		<div class="panel-header">
			<span class="panel-title">{{ "Settings" | i18n("latte-ui") }}</span>
		</div>
		<latte-portal-target :name="uniqueId" multiple></latte-portal-target>
	</div>

</template>

<script>

	export default {

		name: "BESettingsPane",

		props: {

			editor: {
				default: null,
				required: true,
				type: Object
			}

		},

		computed: {

			uniqueId()
			{
				return `be-settings-pane-${this.editor.uniqueId}`;
			}

		}

	}

</script>
