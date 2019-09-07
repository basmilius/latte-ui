<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	import { raf } from "../../js/util/dom";
	import { oneOf } from "../../js/helper/array";

	export default {

		name: "latte-window",

		props: {
			direction: {default: "horizontal", type: String, validator: oneOf(["horizontal", "vertical"])}
		},

		data()
		{
			return {
				current: 0,
				previous: -1,
				height: 0,
				width: 0,
				isParentPopup: this.$parent.$options.name === "latte-popup"
			};
		},

		destroyed()
		{
			if (this.isParentPopup)
				this.$parent.$off("close", this.reset);
		},

		mounted()
		{
			this.update();

			if (this.isParentPopup)
				this.$parent.$on("close", this.reset);
		},

		render(h)
		{
			const defaultSlotElements = this.$scopedSlots
				.default({
					current: this.current,
					navigate: this.navigate,
					back: this.back,
					forward: this.forward,
					reset: this.reset
				})
				.filter(view => !!view.tag)
				.map(view => h("div", {class: ["window-view", `window-${this.direction}`]}, [view]));

			return h(
				"div",
				{
					class: ["window", `window-${this.direction}`],
					style: {
						"--window-height": `${this.height}px`,
						"--window-width": `${this.width}px`
					}
				},
				defaultSlotElements
			);
		},

		methods: {

			navigate(index)
			{
				this.previous = this.current;
				this.current = index;
			},

			back()
			{
				this.previous = this.current;
				this.current--;
			},

			forward()
			{
				this.previous = this.current;
				this.current++;
			},

			reset()
			{
				raf(() =>
				{
					this.current = 0;
					this.previous = -1;
				}, this.isParentPopup ? 210 : 0);
			},

			update()
			{
				const views = Array.from(this.$el.querySelectorAll(":scope > *"));
				const current = views[this.current];
				const previous = views[this.previous];
				const others = views.filter(v => v !== current && v !== previous);

				views.forEach(v => v.classList.remove("is-hiding", "is-hidden", "is-staged", "is-visible", "is-forward", "is-backward"));
				others.forEach(v => v.classList.add("is-hidden"));

				if (!current)
					return;

				const isForward = this.current > this.previous;
				const cr = current.getBoundingClientRect();
				const dClass = isForward ? "is-forward" : "is-backward";
				let cFrom = 0;

				this.height = cr.height;
				this.width = cr.width;

				if (previous)
				{
					const pr = previous.getBoundingClientRect();
					cFrom = isForward ? pr.width : -pr.width;
					previous.classList.add("is-hiding", dClass);

					current.classList.add("is-visible", "is-staged", dClass);
					raf(() => current.classList.remove("is-staged", "is-forward", "is-backward"));
				}
				else
				{
					current.classList.add("is-visible");
				}
			}

		},

		watch: {

			current()
			{
				this.update();
				this.$emit("navigate", this.current);
			}

		}

	}

</script>
