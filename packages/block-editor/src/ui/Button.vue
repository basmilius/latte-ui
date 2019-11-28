<template>

	<button :class="buttonClasses" :disabled="disabled" @click="onClick" :aria-label="(ariaLabel || ariaTooltip) | beTranslate" :data-tooltip="ariaTooltip | beTranslate">
		<Icon v-if="iconBefore" :name="iconBefore"/>
		<span v-if="label">{{ label | beTranslate }}</span>
		<Icon v-if="iconAfter" :name="iconAfter"/>
	</button>

</template>

<script>

	import Icon from "./Icon";

	export default {

		name: "Button",

		components: {Icon},

		props: {
			disabled: {default: false, type: Boolean},
			ariaLabel: {default: null, type: String | null},
			ariaTooltip: {default: null, type: String | null},
			classes: {default: () => [], type: Array},
			color: {default: null, type: String | null},
			iconAfter: {default: null, type: String | null},
			iconBefore: {default: null, type: String | null},
			label: {default: null, type: String | null},
			type: {default: "contained", type: String}
		},

		computed: {

			buttonClasses()
			{
				const classes = ["btn", `btn-${this.type}`, ...this.classes];

				if (this.color !== null)
					classes.push(`btn-${this.color}`);

				if (this.label === null && (this.iconBefore !== null || this.iconAfter !== null))
					classes.push("btn-icon");

				return classes;
			}

		},

		methods: {

			onClick(evt)
			{
				this.$emit("click", evt);
			}

		}

	}

</script>
