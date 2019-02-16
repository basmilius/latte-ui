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

	import { createElement, raf, relativeCoordsTo } from "../../js/util/dom";
	import { pythagorean } from "../../js/math";

	export default {

		name: "latte-ripple",

		props: {

			as: {
				default: "div",
				required: false,
				type: String
			},

			rippleCentered: {
				default: false,
				required: false,
				type: Boolean
			},

			rippleDuration: {
				default: 180,
				required: false,
				type: Number
			},

			rippleOut: {
				default: false,
				required: false,
				type: Boolean
			}

		},

		data()
		{
			return {
				container: null,
				currentRipple: null
			};
		},

		destroyed()
		{
			this.container.remove();
		},

		mounted()
		{
			this.container = document.createElement("div");
			this.container.classList.add("ripple-container");

			if (this.rippleOut)
				this.container.classList.add("is-ripple-out");

			this.$el.prepend(this.container);

			this.$el.classList.add("is-ripple");

			if (window.TouchEvent)
			{
				this.$el.addEventListener("touchmove", evt => this.onPointerCancel(evt), {passive: true});
			}
			else
			{
				this.$el.addEventListener("pointercancel", evt => this.onPointerCancel(evt), {passive: true});
				this.$el.addEventListener("pointerout", evt => this.onPointerCancel(evt), {passive: true});
			}

			this.$el.addEventListener("pointerdown", evt => this.onPointerDown(evt), {passive: true});
			this.$el.addEventListener("pointerup", evt => this.onPointerUp(evt), {passive: true});
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
				const size = pythagorean(rect.width, rect.height);
				const sizeHalf = size / 2;

				if (this.rippleCentered)
				{
					x = rect.width / 2;
					y = rect.height / 2;
				}

				const ripple = createElement("div", ripple =>
				{
					ripple.classList.add("ripple");

					ripple.style.setProperty("--ripple-duration", `${this.rippleDuration + 180}ms`);
					ripple.style.setProperty("--ripple-scale", `${(this.rippleCentered ? 12 : Math.max(size * .1, 24)) / size}`);
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${x - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${y - sizeHalf}px`);
				});

				raf(() =>
				{
					ripple.style.setProperty("--ripple-scale", "1");

					if (this.rippleCentered)
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

			rippleOut()
			{
				if (this.rippleOut)
					this.container.classList.add("is-ripple-out");
				else
					this.container.classList.remove("is-ripple-out");
			}

		}

	}

</script>
