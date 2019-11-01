<template>

	<button :class="classes" :disabled="disabled" @click="onClick">
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
			color: {default: null, type: String | null},
			iconAfter: {default: null, type: String | null},
			iconBefore: {default: null, type: String | null},
			label: {default: null, type: String | null},
			type: {default: "contained", type: String}
		},

		computed: {

			classes()
			{
				const classes = ["btn", `btn-${this.type}`];

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
