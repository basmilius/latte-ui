<template>

	<div class="be-settings-pane">
		<slot name="before"></slot>

		<template>
			<div class="panel-header" v-if="portalHasPassengers">
				<span class="panel-title">{{ "Block settings" | i18n("latte-ui") }}</span>
			</div>
			<latte-portal-target ref="portal" :name="uniqueId" multiple></latte-portal-target>
		</template>

		<slot name="after"></slot>
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

			portalHasPassengers()
			{
				if (!this.isInitialized || !this.$refs.portal)
					return false;

				return this.$refs.portal.passengers.length > 0;
			},

			uniqueId()
			{
				return `be-settings-pane-${this.editor.uniqueId}`;
			}

		},

		data()
		{
			return {isInitialized: false};
		},

		mounted()
		{
			this.isInitialized = true;
		}

	}

</script>
