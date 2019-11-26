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
	import { isSomethingScrolling } from "../../js/ui/scrollbar";

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

			this.$el.removeEventListener("touchcancel", this.events[0]);
			this.$el.removeEventListener("touchmove", this.events[1]);
			this.$el.removeEventListener("touchstart", this.events[2]);
			this.$el.removeEventListener("touchend", this.events[3]);

			this.$el.removeEventListener("mouseleave", this.events[4]);
			this.$el.removeEventListener("mousedown", this.events[5]);
			this.$el.removeEventListener("mouseenter", this.events[6]);
			this.$el.removeEventListener("mouseup", this.events[7]);
		},

		mounted()
		{
			this.$el.classList.add("is-ripple");

			if (window.ResizeObserver)
			{
				this.observer = new ResizeObserver(entries => this.onResizeObserved(entries));
				this.observer.observe(this.$el);
			}

			this.$el.addEventListener("touchcancel", this.events[0] = onlyTouch(this.onPointerUp), {passive: true});
			this.$el.addEventListener("touchmove", this.events[1] = onlyTouch(this.onPointerUp), {passive: true});
			this.$el.addEventListener("touchstart", this.events[2] = onlyTouch(this.onPointerDown), {passive: true});
			this.$el.addEventListener("touchend", this.events[3] = onlyTouch(this.onPointerUp), {passive: true});

			this.$el.addEventListener("mouseleave", this.events[4] = onlyMouse(this.onPointerUp), {passive: true});
			this.$el.addEventListener("mousedown", this.events[5] = onlyMouse(this.onPointerDown), {passive: true});
			this.$el.addEventListener("mouseenter", this.events[6] = onlyMouse(this.onPointerEnter), {passive: true});
			this.$el.addEventListener("mouseup", this.events[7] = onlyMouse(this.onPointerUp), {passive: true});
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

				if (this.center)
				{
					x = rect.width / 2;
					y = rect.height / 2;
				}

				const ripple = createElement("div", ripple =>
				{
					ripple.classList.add("ripple");

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

				this.ripples[0].addEventListener("transitionend", () => this.onPointerUp());
			},

			onPointerUp()
			{
				if (this.ripples.length === 0)
					return;

				const ripple = this.ripples.filter(r => !r.classList.contains("is-removing"))[0];

				if (!ripple)
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
				const size = pythagorean(rect.width, rect.height) + 2;
				const sizeHalf = size / 2;

				this.ripples.forEach(ripple =>
				{
					ripple.style.setProperty("--rippleSize", `${size}px`);
					ripple.style.setProperty("--rippleX", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--rippleY", `${rect.height / 2 - sizeHalf}px`);
				});
			}

		}

	}

</script>
