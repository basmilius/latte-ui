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
	import { needsZIndex } from "../../js/z";

	export default {

		name: "latte-popup",

		props: {

			associateWith: {
				default: undefined,
				required: false,
				type: HTMLElement | Vue | undefined,
				validator: val => val === undefined || val instanceof Vue || val instanceof HTMLElement
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

			persistent: {
				default: false,
				required: false,
				type: Boolean
			},

			withArrow: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		beforeDestroy()
		{
			if (this.isOpen)
				getMainElement().classList.remove("is-popup-opened");

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

			live(this.$el, "[href],[data-close]", "pointerup", () => timeout(25, () => this.close()));

			on("latte:tick", () => this.onResizeOrScroll());
			on("latte:context-menu", () => this.close());
			on("latte:overlay", () => this.close());
			on("latte:popup:hide", () => this.close());
		},

		computed: {

			associatedElement()
			{
				if (this.associateWith === undefined)
					return undefined;

				if (this.associateWith instanceof Vue)
					return this.associateWith.$el;

				return this.associateWith;
			},

			dropdownClasses()
			{
				const classes = ["dropdown", "dropdown-fixed"];

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
				this.rect = this.associatedElement.getBoundingClientRect();
				this.associatedElement.addEventListener("click", this.cb.onClick, {passive: true});
			},

			unbindEvents()
			{
				this.rect = null;
				this.associatedElement.removeEventListener("click", this.cb.onClick, {passive: true});
			},

			close()
			{
				this.isOpen = false;
			},

			open()
			{
				needsZIndex(z => this.$el.style.setProperty("z-index", z));
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
				if (this.persistent)
					return;

				this.close();
			},

			onResizeOrScroll()
			{
				if (this.associatedElement !== undefined)
					this.rect = this.associatedElement.getBoundingClientRect();

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
			},

			isOpen()
			{
				this.calculatePosition();

				dispatch("latte:tooltip:hide");

				if (this.isOpen)
				{
					dispatch("latte:popup:open", this);
					getMainElement().classList.add("is-popup-opened");
					this.$emit("open");
				}
				else
				{
					dispatch("latte:popup:close", this);
					getMainElement().classList.remove("is-popup-opened");
					this.$emit("close");
				}
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
