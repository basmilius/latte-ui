<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	import { terminateEvent } from "../../js/util/dom";
	import { clamp } from "../../js/math";
	import { spaceship } from "../../js/operators";

	export default {

		name: "latte-focus-zone",

		inject: {
			popup: {default: undefined}
		},

		props: {
			isCycle: {default: false, type: Boolean},
			isHorizontal: {default: false, type: Boolean},
			isImmediate: {default: false, type: Boolean},
			isVertical: {default: false, type: Boolean}
		},

		data()
		{
			return {
				activeElement: null
			};
		},

		mounted()
		{
			if (this.popup)
				this.popup.$on("open", this.onPopupOpen);

			this.$el.addEventListener("focusin", evt => this.onFocus(evt.target));
			this.$el.addEventListener("focusout", () => this.onFocusLost());
			this.$el.addEventListener("keydown", evt => this.onKeyDown(evt));
		},

		render()
		{
			return this.$slots.default[0] || undefined;
		},

		methods: {

			getFocusableChildren()
			{
				return Array.from(this.$el.querySelectorAll("[tabindex]"));
			},

			onFocus(elm)
			{
				this.activeElement = elm;
			},

			onFocusLost()
			{
				this.activeElement = null;
			},

			onKeyDown(evt)
			{
				const key = evt.code;

				if (key === "Enter" || key === "Spave")
				{
					this.activeElement.click();
				}
				else if (this.isHorizontal || this.isVertical)
				{
					const endKey = this.isHorizontal ? "ArrowRight" : "ArrowDown";
					const startKey = this.isHorizontal ? "ArrowLeft" : "ArrowUp";

					if (key === startKey || key === endKey)
						this.moveFocus(this.moveFocusSimple(evt.code === startKey));
					else
						return;
				}
				else
				{
					// TODO(Bas): Implement arrow navigation to both sides.
					return;
				}

				terminateEvent(evt);
			},

			onPopupOpen()
			{
				const children = this.getFocusableChildren()
					.sort((a, b) => spaceship(b.tabIndex, a.tabIndex));

				if (children.length < 1)
					return;

				children[0].focus();
			},

			moveFocus(fn)
			{
				const children = this.getFocusableChildren();
				const activeElementIndex = children.indexOf(this.activeElement);

				if (children.length < 2)
					return;

				fn(children, activeElementIndex);
			},

			moveFocusSimple(isLeft)
			{
				return (children, activeElementIndex) =>
				{
					let index = activeElementIndex + (isLeft ? -1 : 1);

					if (this.isCycle)
						index = index === -1 ? children.length - 1 : (index === children.length ? 0 : index);
					else
						index = clamp(index, 0, children.length - 1);

					children[index].focus();

					if (this.isImmediate)
						children[index].click();
				};
			}

		}

	}

</script>
