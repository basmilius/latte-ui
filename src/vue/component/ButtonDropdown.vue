<template>

	<button ref="btn" class="btn" :class="buttonClass" :data-tooltip="tooltip" data-tooltip-class="tooltip-bottom tooltip-contain" :aria-label="ariaLabel">
		<img v-if="avatarUrl !== null" class="avatar avatar-24px" :src="avatarUrl" :alt="ariaLabel"/>
		<i v-else-if="icon !== ''" :class="iconClasses"></i>
		<i v-if="iconBefore !== ''" :class="iconBeforeClasses"></i>
		<span v-if="label !== ''">{{ label }}</span>
		<i v-if="iconAfter !== ''" :class="iconAfterClasses"></i>

		<slot name="extra"></slot>

		<latte-popup :associate-with="$refs.btn" :margin-x="marginX" :margin-y="marginY">
			<slot></slot>
		</latte-popup>
	</button>

</template>

<script>

	export default {

		name: "latte-button-dropdown",

		props: {

			ariaLabel: {
				default: "",
				required: false,
				type: String
			},

			buttonClass: {
				default: "btn-text btn-icon btn-dark",
				required: false,
				type: String
			},

			icon: {
				default: "",
				required: false,
				type: String
			},

			iconAfter: {
				default: "",
				required: false,
				type: String
			},

			iconBefore: {
				default: "",
				required: false,
				type: String
			},

			label: {
				default: "",
				required: false,
				type: String
			},

			marginX: {
				default: -18,
				required: false,
				type: Number
			},

			marginY: {
				default: 0,
				required: false,
				type: Number
			},

			small: {
				default: false,
				required: false,
				type: Boolean
			},

			tooltip: {
				default: "",
				required: false,
				type: String
			}

		},

		computed: {

			avatarUrl()
			{
				if (this.icon.substr(0, 6) === "avatar")
					return this.icon.substr(7);

				return null;
			},

			buttonClasses()
			{
				const classes = this.buttonClass.split(" ");

				if (this.small)
					classes.push("btn-sm");

				if (this.isOpen)
					classes.push("is-open", "tooltip-disabled");

				return classes;
			},

			iconClasses()
			{
				return ["mdi", `mdi-${this.icon}`];
			},

			iconAfterClasses()
			{
				return ["mdi", `mdi-${this.iconAfter}`];
			},

			iconBeforeClasses()
			{
				return ["mdi", `mdi-${this.iconBefore}`];
			}

		}

	}

</script>
