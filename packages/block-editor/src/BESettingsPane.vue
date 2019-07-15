<template>

	<div class="be-settings-pane">
		<slot name="before" v-bind="{blockSettingsShown: portalHasPassengers}"></slot>

		<template>
			<div class="panel-header" v-if="portalHasPassengers">
				<span class="panel-title">{{ "Block settings" | beTranslate }}</span>
			</div>
			<latte-portal-target ref="portal" :name="uniqueId" multiple></latte-portal-target>
		</template>

		<slot name="after" v-bind="{blockSettingsShown: portalHasPassengers}"></slot>
	</div>

</template>

<script>

	import { editorInstance, translate } from "./utils";

	export default {

		name: "BESettingsPane",

		filters: {
			beTranslate: (text, ...params) => translate(text, ...params)
		},

		data()
		{
			return {
				editor: editorInstance(this),
				isInitialized: false
			};
		},

		mounted()
		{
			this.isInitialized = true;
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

		}

	}

</script>
