<!--
 - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 -
 - This file is part of the Latte UI package.
 -
 - For the full copyright and license information, please view the
 - LICENSE file that was distributed with this source code.
 -->

<script>

	import { createElement, raf, relativeCoordsTo } from "../../js/util/dom";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";
	import { pythagorean } from "../../js/math";

	export default {

		name: "latte-ripple",

		props: {
			as: {default: "div", type: String}
		},

		data()
		{
			return {
				clip: true,
				observer: null,
				ripples: []
			};
		},

		destroyed()
		{
			if (this.observer !== null)
				this.observer.disconnect();

			// Remove all ripples, we don't want any animation at this point.
			while (this.ripples.length > 0)
				this.ripples.shift().remove();
		},

		mounted()
		{
			this.$el.classList.add("is-ripple");

			// TODO(Bas): Should probably find something that doesn't only work in Chrome :)
			if (window.ResizeObserver)
			{
				this.observer = new ResizeObserver(entries => this.onResizeObserved(entries));
				this.observer.observe(this.$el);
			}

			this.$el.addEventListener("touchcancel", onlyTouch(this.onPointerUp), {passive: true});
			this.$el.addEventListener("touchmove", onlyTouch(this.onPointerUp), {passive: true});
			this.$el.addEventListener("touchstart", onlyTouch(this.onPointerDown), {passive: true});
			this.$el.addEventListener("touchend", onlyTouch(this.onPointerUp), {passive: true});

			this.$el.addEventListener("mouseleave", onlyMouse(this.onPointerUp), {passive: true});
			this.$el.addEventListener("mousedown", onlyMouse(this.onPointerDown), {passive: true});
			this.$el.addEventListener("mouseup", onlyMouse(this.onPointerUp), {passive: true});
		},

		render(h)
		{
			return h(this.as, {attrs: {...this.$attrs}, on: this.$listeners, scopedSlots: this.$scopedSlots}, [
				h("div", {class: ["ripple-container", !this.clip ? "is-ripple-out" : undefined]}),
				...this.$slots.default
			]);
		},

		methods: {

			createRipple(x, y)
			{
				const rect = this.$el.getBoundingClientRect();
				const size = pythagorean(rect.width, rect.height) + 2; // Add two, just to be sure we cover everything.
				const sizeHalf = size / 2;

				const computedStyles = window.getComputedStyle(this.$el);
				const isCentered = computedStyles.getPropertyValue("--ripple-center").trim() !== "false";
				this.clip = computedStyles.getPropertyValue("--ripple-clip").trim() !== "false";

				if (isCentered)
				{
					x = rect.width / 2;
					y = rect.height / 2;
				}

				const ripple = createElement("div", ripple =>
				{
					ripple.classList.add("ripple");

					const minSize = isCentered ? 12 : Math.max(size * .1, 24);

					ripple.style.setProperty("--ripple-scale", `${minSize / size}`);
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${x - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${y - sizeHalf}px`);

					this.$el.querySelector(".ripple-container").appendChild(ripple);
				});

				raf(() =>
				{
					ripple.style.setProperty("--ripple-scale", "1");

					if (isCentered)
						return;

					ripple.style.setProperty("--ripple-x", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${rect.height / 2 - sizeHalf}px`);
				});

				return ripple;
			},

			onPointerDown(evt)
			{
				const {x, y} = relativeCoordsTo(this.$el, evt);

				this.ripples.push(this.createRipple(x, y));
			},

			onPointerUp()
			{
				if (this.ripples.length === 0)
					return;

				const ripple = this.ripples.filter(r => !r.classList.contains("is-removing"))[0];

				if (ripple === undefined)
					return;

				ripple.classList.add("is-removing");

				raf(() => ripple.style.setProperty("opacity", "0"), 180);

				raf(() =>
				{
					this.ripples = this.ripples.filter(r => r !== ripple);
					ripple.remove();
				}, 360);
			},

			onResizeObserved()
			{
				if (this.ripples.length === 0)
					return;

				const rect = this.$el.getBoundingClientRect();
				const size = pythagorean(rect.width, rect.height) + 2; // Add two, just to be sure we cover everything.
				const sizeHalf = size / 2;

				this.ripples.forEach(ripple =>
				{
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${rect.height / 2 - sizeHalf}px`);
				});
			}

		}

	}

</script>
