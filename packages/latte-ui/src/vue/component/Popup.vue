<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	import Vue from "vue";

	import { dispatch, on } from "../../js/core/action";
	import { live, raf } from "../../js/util/dom";
	import { applyZ } from "../../js/core/z";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";
	import { popupClosed, popupOpened } from "../../js/core/popup";
	import { getMainElement } from "../../js/core";
	import { oneOf } from "../../js/helper/array";

	export default {

		name: "latte-popup",

		props: {
			animateTransform: {default: true, type: Boolean},
			associateWith: {default: undefined},
			marginX: {default: 0, type: Number},
			marginY: {default: 0, type: Number},
			orientation: {default: "vertical", type: String, validator: oneOf(["horizontal", "vertical"])},
			persistent: {default: false, type: Boolean},
			withArrow: {default: true, type: Boolean}
		},

		beforeDestroy()
		{
			if (this.isOpen)
				popupClosed();

			this.$el.clearOutsideEventListeners();
		},

		destroyed()
		{
			const mainElement = getMainElement();

			if (!(this.$el.parentNode && this.$el.parentNode === mainElement))
				return;

			mainElement.removeChild(this.$el);
		},

		data()
		{
			return {
				arrowPosition: undefined,
				isOpen: false,
				isOpening: false,
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
			if (this.$el.parentNode)
				this.$el.parentNode.removeChild(this.$el);
			else if (this.associatedElement)
				this.bindEvents();

			getMainElement().appendChild(this.$el);

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

		render(h)
		{
			return h("div", {class: this.popupClasses, scopedSlots: this.$scopedSlots, style: this.popupStyles}, [
				h("div", {class: "popup-body"}, this.$slots.default)
			]);
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

			popupClasses()
			{
				const classes = ["popup"];

				if (this.withArrow && this.arrowPosition)
					classes.push("arrow", ...this.arrowPosition);

				if (!this.animateTransform || this.isOpening)
					classes.push("no-transform-animation");

				if (this.isOpen === true)
					classes.push("is-open");

				return classes;
			},

			popupStyles()
			{
				return {
					"transform": `translate3d(${this.popupX}px, ${this.popupY}px, 0)`
				};
			},

			isPersistent()
			{
				return this.persistent || this.lattePersistent;
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
				this.isOpening = true;
				this.calculatePosition();
				raf(() => this.isOpening = !(this.isOpen = true));
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
				const px = this.x > (self.innerWidth / 2) ? "right" : "left";
				const py = this.y > (self.innerHeight / 2) ? "above" : "under";

				const l = this.x;
				const t = this.y;
				const h = this.rect !== null ? this.rect.height : 0;
				const w = this.rect !== null ? this.rect.width : 0;
				let x;
				let y;

				if (this.orientation === "horizontal")
				{
					x = l + w + this.marginX;
					y = t + this.marginY;

					if (px === "right")
						x = l - (pcr.width + this.marginX);

					if (py === "above")
						y = (t + h) - (pcr.height + this.marginY);

					x += (this.isOpen || !this.animateTransform ? 0 : (px === "right" ? -24 : 24));
				}
				else
				{
					x = l + this.marginX;
					y = t + h + this.marginY;

					if (px === "right")
						x = (l + w) - (pcr.width + this.marginX);

					if (py === "above")
						y = t - (pcr.height + this.marginY);

					y += (this.isOpen || !this.animateTransform ? 0 : (py === "above" ? -24 : 24));
				}

				this.arrowPosition = [this.orientation, px, py];
				this.popupX = Math.round(x);
				this.popupY = Math.round(y);
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
					popupOpened();
					this.$emit("open");
				}
				else
				{
					dispatch("latte:popup:close", this);
					popupClosed();
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
