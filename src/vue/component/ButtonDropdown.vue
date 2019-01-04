<!--
  - Copyright © 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<button ref="btn" class="btn" :class="buttonClasses" :data-tooltip="tooltip" data-tooltip-class="tooltip-bottom tooltip-contain" :aria-label="ariaLabel">
		<img v-if="avatarUrl !== null" class="avatar avatar-24px" :src="avatarUrl" :alt="ariaLabel"/>
		<i v-else-if="icon !== ''" :class="iconClasses"></i>
		<i v-if="iconBefore !== ''" :class="iconBeforeClasses"></i>
		<span v-if="label !== ''">{{ label }}</span>
		<i v-if="iconAfter !== ''" :class="iconAfterClasses"></i>

		<slot name="extra"></slot>

		<latte-popup :associate-with="$refs.btn" :margin-x="marginX" :margin-y="marginY" @close="onClose" @open="onOpen">
			<slot v-bind="self"></slot>
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

		data()
		{
			return {
				isOpen: false
			};
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
			},

			self()
			{
				return this;
			}

		},

		methods: {

			onClose()
			{
				this.isOpen = false;
			},

			onOpen()
			{
				this.isOpen = true;
			}

		}

	}

</script>
