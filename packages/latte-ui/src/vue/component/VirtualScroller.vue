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

		<div class="virtual-scroller-content flex-shrink-0" :class="itemsClass" :style="contentStyles">
			<template v-for="item of visibleItems">
				<slot v-bind="{item, itemHeight, itemWidth, style: itemStyle(item)}"></slot>
			</template>
		</div>

		<slot name="footer"></slot>
	</component>

</template>

<script>

	import { raf } from "../../js/util/dom";
	import { spaceship } from "../../js/operators";
	import { oneOf } from "../../js/helper/array";

	// TODO(Bas): Variable height?
	export default {

		name: "latte-virtual-scroller",

		props: {
			direction: {default: "vertical", type: String, validator: oneOf(["horizontal", "vertical"])},
			items: {default: () => [], required: true, type: Array},
			itemsClass: {default: "", type: String},
			itemsPadding: {default: () => [0, 0, 0, 0], type: Array},
			itemHeight: {default: null, type: Number},
			itemWidth: {default: null, type: Number},
			tag: {default: "div", type: String}
		},

		created()
		{
			this.onItemsChanged();
		},

		data()
		{
			return {
				__items: [],
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
		},

		mounted()
		{
			this.$el.addEventListener("scroll", this.onScroll, {passive: true});
			this.calculateVisibleNodes();
		},

		computed: {

			contentStyles()
			{
				return {
					minHeight: this.isVertical ? `${Math.ceil(this.__items.length / this.multiplier) * this.itemHeight + (this.itemsPadding[0] + this.itemsPadding[2])}px` : "0",
					minWidth: this.isHorizontal ? `${Math.ceil(this.__items.length / this.multiplier) * this.itemWidth}px` : "0"
				};
			},

			rootStyles()
			{
				return {
					position: "relative",
					overflow: "auto",
					overflowScrolling: "touch"
				};
			},

			visibleItems()
			{
				return this.__items
					.slice(this.offset, this.offset + this.limit)
					.map(item => ({__nodeIndex: item.__index % this.limit, ...item}))
					.sort((a, b) => spaceship(a.__nodeIndex, b.__nodeIndex));
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

			itemStyle(item)
			{
				let realIndex = item.__index;
				let x, y;

				if (this.isVertical)
				{
					x = Math.floor(realIndex % this.multiplier) * (this.itemWidth !== null ? this.itemWidth : 0);
					y = Math.floor(realIndex / this.multiplier) * (this.itemHeight !== null ? this.itemHeight : 0);
				}
				else
				{
					x = Math.floor(realIndex / this.multiplier) * (this.itemWidth !== null ? this.itemWidth : 0);
					y = Math.floor(realIndex % this.multiplier) * (this.itemHeight !== null ? this.itemHeight : 0);
				}

				return {
					position: "absolute",
					top: "0px",
					left: "0px",
					height: this.itemHeight !== null ? `${this.itemHeight}px` : "100%",
					width: this.itemWidth !== null ? `${this.itemWidth}px` : "100%",
					transform: `translate3d(${x}px, ${y}px, 0)`
				};
			},

			onItemsChanged()
			{
				let i = 0;

				this.__items = this.items
					.map(item => ({__index: i++, ...item}));
			},

			onScroll()
			{
				raf(() =>
				{
					if (this.isHorizontal)
						this.position = this.$el.scrollLeft;
					else
						this.position = this.$el.scrollTop;

					this.offset = Math.floor(this.position / (this.isVertical ? this.itemHeight : this.itemWidth)) * this.multiplier;
				});
			}

		},

		watch: {

			items()
			{
				this.offset = -1;
				this.limit = 0;

				this.onItemsChanged();
				this.calculateVisibleNodes();

				this.$nextTick(() =>
				{
					this.$el.scrollBy({top: 1, left: 1});
					this.$nextTick(() => this.$el.scrollBy({top: -1, left: -1}));
				});
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
