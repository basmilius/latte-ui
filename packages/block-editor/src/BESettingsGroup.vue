<template>

	<div class="be-settings-group">
		<div class="be-settings-header" @click="isOpen = !isOpen">
			<span>{{ title | i18n("latte-ui") }}</span>
			<slot name="header"></slot>
			<i class="mdi" :class="{'mdi-chevron-down': !isOpen && hasBody, 'mdi-chevron-up': isOpen && hasBody}"></i>
		</div>
		<div class="be-settings-body" v-if="isOpen && hasBody">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	export default {

		name: "BESettingsGroup",

		props: {

			title: {
				default: "Unknown group",
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				isOpen: true
			};
		},

		computed: {

			hasBody()
			{
				return this.$slots.default;
			}

		}

	}

</script>
