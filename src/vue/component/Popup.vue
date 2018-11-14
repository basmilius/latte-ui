<template>

	<div :class="dropdownClasses" :style="dropdownStyles">
		<div class="dropdown-content">
			<slot v-bind="this"></slot>
		</div>
	</div>

</template>

<script>

	import { dispatch, on } from "../../js/actions";
	import { getMainElement, timeout } from "../../js/core";
	import { live } from "../../js/util/dom";

	export default {

		name: "latte-popup",

		props: {

			associateWith: {
				default: undefined,
				required: false,
				type: HTMLElement | undefined,
				validator: val => val === undefined || val instanceof HTMLElement
			},

			marginX: {
				default: 0,
				required: false,
				type: Number
			},

			marginY: {
				default: 0,
				required: false,
				type: Number
			},

			withArrow: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		beforeDestroy()
		{
			document.body.removeChild(this.$el);

			this.$el.removeOutsideEventListener("pointerdown", this.cb.onOutsideClick);

			window.removeEventListener("resize", this.cb.onResizeOrScroll);
			window.removeEventListener("scroll", this.cb.onResizeOrScroll);
		},

		data()
		{
			return {
				cb: {
					onClick: evt => this.onClick(evt),
					onOutsideClick: evt => this.onOutsideClick(evt),
					onResizeOrScroll: evt => this.onResizeOrScroll(evt)
				},
				isOpen: false,
				popupX: 0,
				popupY: 0,
				rect: null,
				x: 0,
				y: 0
			};
		},

		mounted()
		{
			// Move our element to body.
			this.$el.parentNode.removeChild(this.$el);
			document.body.appendChild(this.$el);

			// Update associate-with by updating our parent.
			if (this.$parent && this.$parent.$forceUpdate)
				this.$parent.$forceUpdate();

			this.$el.addOutsideEventListener("pointerdown", this.cb.onOutsideClick);

			window.addEventListener("resize", this.cb.onResizeOrScroll, {passive: true});
			window.addEventListener("scroll", this.cb.onResizeOrScroll, {passive: true});

			live(this.$el, "[href],[data-close]", "pointerup", () => this.close());

			on("latte:tick", () => this.onResizeOrScroll());
			on("latte:context-menu", () => this.close());
			on("latte:overlay", () => this.close());
			on("latte:popup:hide", () => this.close());
		},

		computed: {

			dropdownClasses()
			{
				const classes = ["dropdown", "dropdown-at-root"];

				if (this.withArrow)
				{
					const aboveUnder = this.y > (window.innerHeight / 2) ? "above" : "under";
					const position = this.x > (window.innerWidth / 2) ? "right" : "left";

					classes.push(`dropdown-${position}-${aboveUnder}`);
				}

				if (this.isOpen === true)
					classes.push("is-open");

				return classes;
			},

			dropdownStyles()
			{
				return {
					"transform": `translate3d(${this.popupX}px, ${this.popupY}px, 0)`
				};
			}

		},

		methods: {

			bindEvents()
			{
				this.rect = this.associateWith.getBoundingClientRect();
				this.associateWith.addEventListener("click", this.cb.onClick, {passive: true});
			},

			unbindEvents()
			{
				this.rect = null;
				this.associateWith.removeEventListener("click", this.cb.onClick, {passive: true});
			},

			close()
			{
				this.isOpen = false;
			},

			open()
			{
				this.isOpen = true;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			},

			calculatePosition()
			{
				const pcr = this.$el.getBoundingClientRect();
				const px = this.x > (window.innerWidth / 2) ? "right" : "left";
				const py = this.y > (window.innerHeight / 2) ? "above" : "under";

				const l = this.x;
				const t = this.y;
				const h = this.rect !== null ? this.rect.height : 0;
				const w = this.rect !== null ? this.rect.width : 0;

				let x = l + this.marginX;
				let y = t + h + this.marginY;

				if (px === "right")
					x = (l + w) - (pcr.width + this.marginX);

				if (py === "above")
					y = t - (pcr.height + this.marginY);

				this.popupX = Math.round(x);
				this.popupY = Math.round(y + (this.isOpen ? 0 : py === "above" ? -24 : 24));
			},

			setPosition(x, y)
			{
				this.x = x;
				this.y = y;
			},

			onClick()
			{
				this.toggle();
			},

			onOutsideClick()
			{
				this.close();
			},

			onResizeOrScroll()
			{
				if (this.associateWith !== undefined)
					this.rect = this.associateWith.getBoundingClientRect();

				this.calculatePosition();
			}

		},

		watch: {

			associateWith(n, o)
			{
				if (o !== undefined)
					this.unbindEvents();

				if (n !== undefined)
					this.bindEvents();

				// Element isn't really bound at this point so a timeout to fix it.
				timeout(100, () => this.onResizeOrScroll());
			},

			isOpen()
			{
				this.calculatePosition();

				dispatch("latte:tooltip:hide");

				if (this.isOpen)
					dispatch("latte:popup:open", this);
				else
					dispatch("latte:popup:close", this);

				if (this.isOpen)
					getMainElement().classList.add("is-popup-opened");
				else
					getMainElement().classList.remove("is-popup-opened");
			},

			rect()
			{
				if (this.rect !== null)
				{
					this.x = this.rect.left;
					this.y = this.rect.top;
				}
				else
				{
					this.x = 0;
					this.y = 0;
				}

				this.calculatePosition();
			}

		}

	}

</script>
