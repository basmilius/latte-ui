<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div :class="dropdownClasses" :style="dropdownStyles">
		<div class="dropdown-content">
			<slot v-bind="self"></slot>
		</div>
	</div>

</template>

<script>

	import Vue from "vue";

	import { getMainElement } from "../../js/core";
	import { dispatch, on } from "../../js/core/action";
	import { live, raf } from "../../js/util/dom";
	import { applyZ } from "../../js/z";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";

	export default {

		name: "latte-popup",

		props: {

			associateWith: {
				default: undefined,
				required: false
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

			this.$el.clearOutsideEventListeners();
		},

		data()
		{
			return {
				isOpen: false,
				popupX: 0,
				popupY: 0,
				rect: null,
				x: 0,
				y: 0,
				lattePersistent: false
			};
		},

		mounted()
		{
			// Move the popup to <body>.
			if (this.$el.parentNode)
				this.$el.parentNode.removeChild(this.$el);
			else
				this.bindEvents();

			document.body.appendChild(this.$el);

			// Update associate-with prop by updating our parent.
			if (this.$parent && this.$parent.$forceUpdate)
				this.$parent.$forceUpdate();

			this.$el.addOutsideEventListener("mousedown", onlyMouse(this.onOutsideClick), {passive: true});
			this.$el.addOutsideEventListener("touchstart", onlyTouch(this.onOutsideClick), {passive: true});

			live(this.$el, "[href],[data-close]", "click", () => raf(() => this.close()));

			on("latte:tick", () => this.onTick());
			on("latte:context-menu", () => this.close());
			on("latte:overlay", () => this.close());
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
				const classes = ["dropdown"];

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
			},

			isPersistent()
			{
				return this.persistent || this.lattePersistent;
			},

			self()
			{
				return this;
			}

		},

		methods: {

			bindEvents()
			{
				this.rect = this.associatedElement.getBoundingClientRect();
				this.associatedElement.addEventListener("click", this.onClick, {passive: true});
			},

			unbindEvents()
			{
				if (this.associatedElement === undefined)
					return;

				this.rect = null;
				this.associatedElement.removeEventListener("click", this.onClick, {passive: true});
			},

			close()
			{
				if (!this.isOpen)
					return;

				this.isOpen = false;
			},

			open()
			{
				applyZ(z => this.$el.style.setProperty("z-index", z));
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
				raf(() =>
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
				});
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
				if (!this.isOpen || this.isPersistent)
					return;

				this.close();
			},

			onTick()
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
