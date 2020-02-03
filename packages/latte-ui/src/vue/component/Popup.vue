<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<transition name="popup" @before-enter="onBeforeEnter" @enter="onEnter">
		<div :class="popupClasses" :style="popupStyles" @keydown="onKeyDown" v-mtm v-if="isOpen">
			<div class="popup-body">
				<slot></slot>
			</div>
		</div>
	</transition>

</template>

<script>

	import Vue from "vue";

	import { dispatch, on } from "../../js/core/action";
	import { live, raf } from "../../js/util/dom";
	import { applyZ } from "../../js/core/z";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";
	import { popupClosed, popupOpened } from "../../js/core/popup";
	import { oneOf } from "../../js/helper/array";
	import { MoveToMainDirective } from "../directive";
	import { addEventListener } from "../../js/util/event";

	export default {

		name: "latte-popup",

		directives: {
			mtm: MoveToMainDirective
		},

		props: {
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

			this.subscriptions.forEach(sub => sub.unsubscribe());
		},

		data()
		{
			return {
				arrowPosition: undefined,
				isOpen: false,
				offsetX: 0,
				offsetY: 0,
				popupX: 0,
				popupY: 0,
				rect: null,
				x: 0,
				y: 0,
				z: 0,
				lattePersistent: false,
				events: [],
				subscriptions: []
			};
		},

		mounted()
		{
			if (this.associatedElement)
				this.bindEvents();
			else if (this.$parent)
				this.$parent.$forceUpdate();

			this.subscriptions.push(
				on("latte:tick", () => this.onTick()),
				on("latte:context-menu", () => this.close()),
				on("latte:overlay", () => this.close())
			);
		},

		provide()
		{
			return {
				popup: this
			};
		},

		computed: {

			associatedElement()
			{
				if (!this.associateWith)
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

				return classes;
			},

			popupStyles()
			{
				return {
					"--popupOrigin": `${this.offsetX}px, ${this.offsetY}px`,
					top: `${this.popupY}px`,
					left: `${this.popupX}px`,
					zIndex: this.z
				};
			},

			pos()
			{
				return {
					isTop: this.y < (self.innerHeight / 2),
					isLeft: this.x < (self.innerWidth / 2)
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
				this.events.push(
					addEventListener(this.associatedElement, "click", this.onClick)
				);
				this.rect = this.associatedElement.getBoundingClientRect();
			},

			unbindEvents()
			{
				this.events.forEach(remove => remove());

				this.events = [];
				this.rect = null;
			},

			close()
			{
				if (!this.isOpen)
					return;

				this.isOpen = false;
			},

			open()
			{
				applyZ(z => this.z = z);
				this.isOpen = true;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			},

			calculatePosition(elm)
			{
				const pcr = (elm || this.$el).getBoundingClientRect();
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
				}
				else
				{
					x = l + this.marginX;
					y = t + h + this.marginY;

					if (px === "right")
						x = (l + w) - (pcr.width + this.marginX);

					if (py === "above")
						y = t - (pcr.height + this.marginY);
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

			onBeforeEnter(elm)
			{
				elm.addOutsideEventListener("mousedown", onlyMouse(this.onOutsideClick), {passive: true});
				elm.addOutsideEventListener("touchstart", onlyTouch(this.onOutsideClick), {passive: true});

				if (this.associatedElement)
					this.rect = this.associatedElement.getBoundingClientRect();

				live(elm, "[href],[data-close]", "click", () => raf(() => this.close()));
			},

			onEnter(elm)
			{
				this.calculatePosition(elm);
			},

			onClick()
			{
				this.toggle();
			},

			onKeyDown(evt)
			{
				if (evt.code !== "Escape")
					return;

				this.close();

				if (this.associatedElement)
					this.associatedElement.focus();
			},

			onOutsideClick()
			{
				if (!this.isOpen || this.isPersistent)
					return;

				this.close();
			},

			onTick()
			{
				if (!this.isOpen)
					return;

				if (this.associatedElement)
					this.rect = this.associatedElement.getBoundingClientRect();

				this.calculatePosition();
			}

		},

		watch: {

			associateWith(n, o)
			{
				if (o)
					this.unbindEvents();

				if (n)
					this.bindEvents();
			},

			isOpen()
			{
				dispatch("latte:tooltip:hide");

				if (this.isOpen)
				{
					popupOpened();

					raf(() =>
					{
						dispatch("latte:popup:open", this);
						this.$emit("open");
					});
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

				const {isTop, isLeft} = this.pos;

				this.offsetX = this.orientation === "horizontal" ? (isLeft ? 24 : -24) : 0;
				this.offsetY = this.orientation === "vertical" ? (isTop ? 24 : -24) : 0;
			}

		}

	}

</script>
