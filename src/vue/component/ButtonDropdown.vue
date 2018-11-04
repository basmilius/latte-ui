<template>

	<button class="btn" :class="buttonClasses" :data-tooltip="ariaLabel" data-tooltip-class="tooltip-bottom tooltip-contain" :aria-label="ariaLabel" @pointerup.passive="toggle($event)" v-click-away="closeByClickAway">
		<img v-if="avatarUrl !== null" class="avatar avatar-in-button" :src="avatarUrl" :alt="ariaLabel"/>
		<i v-else-if="icon !== ''" :class="iconClasses"></i>
		<i v-if="iconBefore !== ''" :class="iconBeforeClasses"></i>
		<span v-if="label !== ''">{{ label }}</span>
		<i v-if="iconAfter !== ''" :class="iconAfterClasses"></i>

		<div :class="dropdownClasses">
			<div class="dropdown-content">
				<slot></slot>
			</div>
		</div>
	</button>

</template>

<script>

	import { dispatch, on } from "../../js/actions";
	import { timeout } from "../../js/core";

	export default {

		name: "latte-button-dropdown",

		props: {

			appendToRoot: {
				default: true,
				type: Boolean
			},

			ariaLabel: {
				default: "",
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

			isLoading: {
				default: false,
				required: false,
				type: Boolean
			},

			label: {
				default: "",
				required: false,
				type: String
			},

			openAtStart: {
				default: false,
				required: false,
				type: Boolean
			},

			small: {
				default: false,
				required: false,
				type: Boolean
			},

			type: {
				default: 'list',
				type: String,
				validator: value => ["grid", "list", "custom"].indexOf(value) > -1
			}

		},

		beforeDestroy()
		{
			if (!this.popup)
				return;

			this.popup.remove();
		},

		data()
		{
			return {
				isClickAwayAvailable: true,
				isOpen: this.openAtStart,
				popup: null,
				popupPosition: {
					x: 0,
					y: 0
				},
				x: 0,
				y: 0
			}
		},

		mounted()
		{
			let rect = this.$el.getBoundingClientRect();
			this.x = rect.left;
			this.y = rect.top;

			on("latte:context-menu", () => this.close());
			on("latte:overlay", () => this.close());

			if (this.appendToRoot)
			{
				timeout(10, () =>
				{
					this.popup = this.$el.querySelector(":scope > div.dropdown");
					this.$el.removeChild(this.popup);
					document.body.appendChild(this.popup);

					window.addEventListener("resize", () => this.shouldUpdate(), {passive: true});
					window.addEventListener("scroll", () => this.shouldUpdate(), {passive: true});

					this.calculatePosition();
				})
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

			dropdownClasses()
			{
				let classes = ['dropdown'];

				if (this.appendToRoot)
					classes.push("dropdown-at-root");

				let aboveUnder = this.y > (window.innerHeight / 2) ? 'above' : 'under';
				let position = this.x > (window.innerWidth / 2) ? 'right' : 'left';

				classes.push(`dropdown-${position}-${aboveUnder}`);
				classes.push(`dropdown-${this.type}`);

				if (this.isOpen === true)
					classes.push("is-open");

				return classes;
			},

			iconClasses()
			{
				return ['mdi', `mdi-${this.icon}`];
			},

			iconAfterClasses()
			{
				return ['mdi', `mdi-${this.iconAfter}`];
			},

			iconBeforeClasses()
			{
				return ['mdi', `mdi-${this.iconBefore}`];
			}

		},

		methods: {

			calculatePosition()
			{
				if (!this.appendToRoot)
					return;

				if (this.popup === null)
					return;

				const margin = this.buttonClasses.contains("btn-icon") ? this.small ? 22 : 18 : 13;
				const bcr = this.$el.getBoundingClientRect();
				const pcr = this.popup.getBoundingClientRect();
				const px = this.x > (window.innerWidth / 2) ? "right" : "left";
				const py = this.y > (window.innerHeight / 2) ? "above" : "under";

				let x = bcr.left - margin;
				let y = bcr.top + bcr.height;

				if (px === "right")
					x = (bcr.left + bcr.width) - (pcr.width - margin);

				if (py === "above")
					y = bcr.top - (pcr.height);

				this.popupPosition.x = Math.round(x);
				this.popupPosition.y = Math.round(y + (this.isOpen ? 0 : py === "above" ? -24 : 24));
			},

			shouldUpdate()
			{
				if (!this.appendToRoot)
					return;

				let rect = this.$el.getBoundingClientRect();
				this.x = rect.left;
				this.y = rect.top;

				this.calculatePosition();
			},

			close()
			{
				this.isClickAwayAvailable = false;
				this.isOpen = false;

				this.$emit("close");
				this.calculatePosition();

				dispatch("latte:tooltip:hide");
			},

			closeByClickAway()
			{
				if (this.isClickAwayAvailable === false)
					return;

				this.close();
			},

			open(e)
			{
				this.isOpen = true;
				this.$nextTick(() => this.isClickAwayAvailable = true);

				if (e)
				{
					this.x = e.clientX;
					this.y = e.clientY;
				}

				this.$emit("open");
				this.calculatePosition();

				dispatch("latte:tooltip:hide");
			},

			toggle(e)
			{
				if (this.isOpen)
					this.close();
				else
					this.open(e);
			}

		},

		watch: {

			dropdownClasses()
			{
				if (this.popup === null)
					return;

				const classes = [];
				this.popup.classList.forEach(className => classes.push(className));
				this.popup.classList.remove(...classes);
				this.popup.classList.add(...this.dropdownClasses);
			},

			popupPosition: {

				deep: true,

				handler()
				{
					this.popup.style.transform = `translate3d(${this.popupPosition.x}px, ${this.popupPosition.y}px, 0)`;
				}

			}


		}

	}

</script>
