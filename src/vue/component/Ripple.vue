<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<component :is="as" v-bind="$attrs" v-on="$listeners">

		<slot></slot>

		<slot v-for="slot in slots" :name="slot" :slot="slot"/>

		<template v-for="slot in scopedSlots" :slot="slot" slot-scope="scope">
			<slot :name="slot" v-bind="scope"/>
		</template>

	</component>

</template>

<script>

	import { createElement, isTouchOnlyDevice, raf, relativeCoordsTo } from "../../js/util/dom";
	import { pythagorean } from "../../js/math";

	export default {

		name: "latte-ripple",

		props: {

			as: {
				default: "div",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				clip: true,
				container: null,
				currentRipple: null
			};
		},

		destroyed()
		{
			this.onPointerCancel();
			this.container.remove();
		},

		mounted()
		{
			this.container = document.createElement("div");
			this.container.classList.add("ripple-container");

			this.$el.prepend(this.container);
			this.$el.classList.add("is-ripple");

			if (isTouchOnlyDevice())
			{
				this.$el.addEventListener("touchcancel", evt => this.onPointerCancel(evt), {passive: true});
				this.$el.addEventListener("touchmove", evt => this.onPointerCancel(evt), {passive: true});
				this.$el.addEventListener("touchstart", evt => this.onPointerDown(evt), {passive: true});
				this.$el.addEventListener("touchend", evt => this.onPointerUp(evt), {passive: true});
			}
			else
			{
				this.$el.addEventListener("mouseleave", evt => this.onPointerUp(evt), {passive: true});
				this.$el.addEventListener("mousedown", evt => this.onPointerDown(evt), {passive: true});
				this.$el.addEventListener("mouseup", evt => this.onPointerUp(evt), {passive: true});
			}
		},

		computed: {

			scopedSlots()
			{
				return Object.keys(this.$scopedSlots);
			},

			slots()
			{
				return Object.keys(this.$slots)
					.filter(k => k !== "default");
			}

		},

		methods: {

			createRipple(x, y)
			{
				const rect = this.$el.getBoundingClientRect();
				const size = pythagorean(rect.width, rect.height) + 2; // Add two, just to be sure we cover everything.
				const sizeHalf = size / 2;

				const computedStyles = window.getComputedStyle(this.$el);
				const isCentered = computedStyles.getPropertyValue("--ripple-center") !== "false";
				this.clip = computedStyles.getPropertyValue("--ripple-clip") !== "false";

				if (isCentered)
				{
					x = rect.width / 2;
					y = rect.height / 2;
				}

				const ripple = createElement("div", ripple =>
				{
					ripple.classList.add("ripple");

					ripple.style.setProperty("--ripple-scale", `${(isCentered ? 12 : Math.max(size * .1, 24)) / size}`);
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${x - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${y - sizeHalf}px`);
				});

				raf(() =>
				{
					ripple.style.setProperty("--ripple-scale", "1");

					if (isCentered)
						return;

					ripple.style.setProperty("--ripple-x", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${rect.height / 2 - sizeHalf}px`);
				});

				this.container.appendChild(ripple);

				return ripple;
			},

			onPointerCancel()
			{
				if (this.currentRipple !== null)
					this.currentRipple.remove();

				this.currentRipple = null;
			},

			onPointerDown(evt)
			{
				if (this.currentRipple !== null)
					this.onPointerCancel();

				const {x, y} = relativeCoordsTo(this.$el, evt);

				this.currentRipple = this.createRipple(x, y);
			},

			onPointerUp()
			{
				if (this.currentRipple === null)
					return;

				const ripple = this.currentRipple;
				this.currentRipple = null;

				raf(() => ripple.style.setProperty("opacity", "0"), 180);
				raf(() => ripple.remove(), 360);
			}

		},

		watch: {

			clip()
			{
				if (!this.clip)
					this.container.classList.add("is-ripple-out");
				else
					this.container.classList.remove("is-ripple-out");
			}

		}

	}

</script>
