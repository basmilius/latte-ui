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
			as: {default: "div", type: String}
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
			this.$el.removeEventListener("mouseup", this.events[6]);
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
			this.$el.addEventListener("mouseup", this.events[6] = onlyMouse(this.onPointerUp), {passive: true});
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
				this.center = computedStyles.getPropertyValue("--ripple-center").trim() !== "false";
				this.clip = computedStyles.getPropertyValue("--ripple-clip").trim() !== "false";

				if (this.center)
				{
					x = rect.width / 2;
					y = rect.height / 2;
				}

				const ripple = createElement("div", ripple =>
				{
					ripple.classList.add("ripple");

					const minSize = this.center ? 12 : Math.max(size * .1, 24);

					ripple.style.setProperty("--ripple-scale", `${minSize / size}`);
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${x - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${y - sizeHalf}px`);

					this.$el.querySelector(".ripple-container").appendChild(ripple);
				});

				raf(() =>
				{
					ripple.style.setProperty("--ripple-scale", "1");

					if (this.center)
						return;

					ripple.style.setProperty("--ripple-x", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${rect.height / 2 - sizeHalf}px`);
				});

				return ripple;
			},

			onPointerDown(evt)
			{
				if (isSomethingScrolling)
					return;

				const {x, y} = relativeCoordsTo(this.$el, evt);

				this.ripples.push(this.createRipple(x, y));
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
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${rect.height / 2 - sizeHalf}px`);
				});
			}

		}

	}

</script>
