<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<component :is="tag" :style="rootStyles">
		<slot name="header"></slot>

		<div class="virtual-scroller-content flex-shrink-0" :style="contentStyles">
			<div class="virtual-scroller-nodes" :class="itemsClass" :style="nodesStyles">
				<template v-for="item of visibleItems">
					<slot v-bind="{item, itemHeight, itemWidth}"></slot>
				</template>
			</div>
		</div>

		<slot name="footer"></slot>
	</component>

</template>

<script>

	import { on } from "../../js/core/action";
	import { raf } from "../../js/util/dom";

	// TODO(Bas): Horizontal scroller.
	export default {

		name: "latte-virtual-scroller",

		props: {

			direction: {
				default: "vertical",
				required: false,
				type: String,
				validator: str => ["horizontal", "vertical"].indexOf(str) >= 0
			},

			items: {
				default: () => [],
				required: true,
				type: Array
			},

			itemsClass: {
				default: "",
				required: false,
				type: String
			},

			itemsPadding: {
				default: () => [0, 0, 0, 0],
				required: false,
				type: Array
			},

			itemHeight: {
				default: null,
				required: false,
				type: Number
			},

			itemWidth: {
				default: null,
				required: false,
				type: Number
			},

			tag: {
				default: "div",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				tickSubscription: null,
				multiplier: 1,
				position: 0,
				limit: 0,
				offset: 0,
				padding: {
					top: 0,
					bottom: 0
				}
			};
		},

		destroyed()
		{
			this.$el.removeEventListener("scroll", this.onScroll);
			this.tickSubscription.unsubscribe();
		},

		mounted()
		{
			this.$el.addEventListener("scroll", this.onScroll, {passive: true});

			this.calculateVisibleNodes();
			this.tickSubscription = on("latte:tick", () => raf(() => this.calculateVisibleNodes()));
		},

		computed: {

			contentStyles()
			{
				return {
					minHeight: this.isVertical ? `${Math.ceil(this.items.length / this.multiplier) * this.itemHeight + (this.itemsPadding[0] + this.itemsPadding[2])}px` : "0",
					minWidth: this.isHorizontal ? `${Math.ceil(this.items.length / this.multiplier) * this.itemWidth}px` : "0"
				};
			},

			nodesStyles()
			{
				let x = this.isHorizontal ? this.position : 0;
				let y = this.isVertical ? this.position : 0;

				let yp = this.position % this.itemHeight;

				y -= yp;

				return {
					padding: this.itemsPadding.map(p => `${p}px`).join(" "),
					transform: `translate3d(${x}px, ${y}px, 0)`
				};
			},

			rootStyles()
			{
				return {
					overflow: "auto",
					overflowScrolling: "touch"
				};
			},

			visibleItems()
			{
				return this.items.slice(this.offset, this.offset + this.limit);
			},

			isHorizontal()
			{
				return this.direction === "horizontal";
			},

			isVertical()
			{
				return this.direction === "vertical";
			}

		},

		methods: {

			calculateVisibleNodes()
			{
				let ih = this.itemHeight;
				let iw = this.itemWidth;

				let foundContent = false;
				let pt = 0;
				let pb = 0;

				if (ih === null && iw === null)
					throw new Error("[LatteUI] At least one of itemHeight and itemWidth should be set.");

				const elements = Array.from(this.$el.children);
				let {height, width} = this.$el.getBoundingClientRect();

				for (let index in elements)
				{
					let element = elements[index];

					if (element.classList.contains("virtual-scroller-content"))
					{
						foundContent = true;
						continue;
					}

					if (!foundContent)
						pt += element.getBoundingClientRect().height;
					else
						pb += element.getBoundingClientRect().height;
				}

				this.padding.top = pt;
				this.padding.bottom = pb;

				height -= pt + pb;

				if (ih !== null && iw !== null)
					this.limit = (Math.ceil(height / ih) + 1) * (this.multiplier = Math.floor(width / iw));
				else if (ih !== null && this.isVertical)
					this.limit = Math.ceil(height / ih) + 1;
				else if (this.isHorizontal)
					this.limit = Math.ceil(width / iw) + 1;
			},

			onScroll()
			{
				if (this.isHorizontal)
					this.position = this.$el.scrollLeft;
				else
					this.position = this.$el.scrollTop;

				this.offset = Math.floor(this.position / this.itemHeight) * this.multiplier;
			}

		},

		watch: {

			items()
			{
				this.calculateVisibleNodes();
			},

			itemHeight()
			{
				this.calculateVisibleNodes();
			},

			itemWidth()
			{
				this.calculateVisibleNodes();
			}

		}

	}

</script>

<style lang="scss" scoped>

	.virtual-scroller-header
	{
		position: relative;
		display: block;
	}

</style>
