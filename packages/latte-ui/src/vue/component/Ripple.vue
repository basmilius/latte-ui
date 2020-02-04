<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
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
	import { isSomethingScrolling } from "../../js/ui/scrollbar";
	import { addEventListener } from "../../js/util/event";

	export default {

		name: "latte-ripple",

		props: {
			as: {default: "div", type: String},
			onHover: {default: false, type: Boolean}
		},

		data()
		{
			return {
				events: [],
				center: false,
				clip: true,
				observer: null,
				ripples: []
			};
		},

		destroyed()
		{
			if (this.observer !== null)
				this.observer.disconnect();

			while (this.ripples.length > 0)
				this.ripples.shift().remove();

			this.events.forEach(remove => remove());
		},

		mounted()
		{
			this.$el.classList.add("is-ripple");

			if (window.ResizeObserver)
			{
				this.observer = new ResizeObserver(entries => this.onResizeObserved(entries));
				this.observer.observe(this.$el);
			}

			this.events.push(
				addEventListener(this.$el, "touchcancel", onlyTouch(this.onPointerUp)),
				addEventListener(this.$el, "touchmove", onlyTouch(this.onPointerUp)),
				addEventListener(this.$el, "touchstart", onlyTouch(this.onPointerDown)),
				addEventListener(this.$el, "touchend", onlyTouch(this.onPointerUp)),

				addEventListener(this.$el, "mouseleave", onlyMouse(this.onPointerUp)),
				addEventListener(this.$el, "mousedown", onlyMouse(this.onPointerDown)),
				addEventListener(this.$el, "mouseenter", onlyMouse(this.onPointerEnter)),
				addEventListener(this.$el, "mouseup", onlyMouse(this.onPointerUp))
			);
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
				const size = pythagorean(rect.width, rect.height) + 2;
				const sizeHalf = size / 2;

				const computedStyles = window.getComputedStyle(this.$el);
				this.center = computedStyles.getPropertyValue("--rippleCenter").trim() !== "false";
				this.clip = computedStyles.getPropertyValue("--rippleClip").trim() !== "false";

				const duration = parseInt(computedStyles.getPropertyValue("--rippleDuration"));

				if (this.center)
				{
					x = rect.width / 2;
					y = rect.height / 2;
				}

				const ripple = createElement("div", ripple =>
				{
					ripple.classList.add("ripple");
					ripple.duration = duration;

					const minSize = 3;

					ripple.style.setProperty("--rippleScale", `${minSize / size}`);
					ripple.style.setProperty("--rippleSize", `${size}px`);
					ripple.style.setProperty("--rippleX", `${x - sizeHalf}px`);
					ripple.style.setProperty("--rippleY", `${y - sizeHalf}px`);

					this.$el.querySelector(".ripple-container").appendChild(ripple);
				});

				raf(() =>
				{
					ripple.style.setProperty("--rippleScale", "1");

					if (this.center)
						return;

					ripple.style.setProperty("--rippleX", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--rippleY", `${rect.height / 2 - sizeHalf}px`);
				}, this.onHover ? 16 : undefined);

				return ripple;
			},

			onPointerDown(evt, wasHover = false)
			{
				if (isSomethingScrolling || (this.onHover && !wasHover))
					return;

				const {x, y} = relativeCoordsTo(this.$el, evt);

				this.ripples.push(this.createRipple(x, y));
			},

			onPointerEnter(evt)
			{
				if (!this.onHover)
					return;

				this.onPointerDown(evt, true);

				this.ripples[this.ripples.length - 1].addEventListener("transitionend", () => this.onPointerUp(evt, true), {once: true});
			},

			onPointerUp(evt, wasHover = false)
			{
				if (this.onHover && !wasHover)
					return;

				if (this.ripples.length === 0)
					return;

				const ripple = this.ripples.filter(r => !r.classList.contains("is-removing"))[0];

				if (!ripple)
					return;

				ripple.classList.add("is-removing");

				raf(() => ripple.style.setProperty("opacity", "0"), ripple.duration / 2);

				raf(() =>
				{
					this.ripples = this.ripples.filter(r => r !== ripple);
					ripple.remove();
				}, ripple.duration);
			},

			onResizeObserved()
			{
				if (this.ripples.length === 0)
					return;

				const rect = this.$el.getBoundingClientRect();
				const size = pythagorean(rect.width, rect.height) + 2;
				const sizeHalf = size / 2;

				this.ripples.forEach(ripple =>
				{
					ripple.style.setProperty("--rippleSize", `${size}px`);
					ripple.style.setProperty("--rippleX", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--rippleY", `${rect.height / 2 - sizeHalf}px`);
				});
			}

		},

		watch: {

			ripples()
			{
				if (this.ripples.length === 0)
					this.$el.classList.remove("has-ripple");
				else
					this.$el.classList.add("has-ripple");
			}

		}

	}

</script>
