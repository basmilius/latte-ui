<template>

	<div class="be-settings-group">
		<div class="be-settings-header" @click="isOpen = !isOpen">
			<div class="be-settings-group-label">
				<span>{{ title | beTranslate }}</span>
				<span v-if="depth > -1">{{ "Level @0" | beTranslate(depth) }}</span>
			</div>
			<slot name="header"></slot>
			<i class="mdi" :class="{'mdi-chevron-down': !isOpen && hasBody, 'mdi-chevron-up': isOpen && hasBody}"></i>
		</div>
		<div class="be-settings-body" :class="{'padded': padded}" v-if="isOpen && hasBody">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	import { translate } from "./utils";

	export default {

		name: "BESettingsGroup",

		filters: {
			beTranslate: (text, ...params) => translate(text, ...params)
		},

		props: {
			depth: {default: -1, type: Number},
			opened: {default: true, type: Boolean},
			padded: {default: false, type: Boolean},
			title: {default: "Unknown group", required: true, type: String}
		},

		data()
		{
			return {
				isOpen: this.opened
			};
		},

		computed: {

			hasBody()
			{
				return this.$slots.default;
			}

		},

		watch: {

			opened()
			{
				this.isOpen = this.opened;
			}

		}

	}

</script>
