<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="swiper" :class="rootClasses">
		<div class="swiper-body" :style="bodyStyle">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	import { getCoords, raf } from "../../js/util/dom";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";
	import { clamp } from "../../js/math";

	function convertPadding(p)
	{
		if (typeof p === "number")
			return {top: p, left: p, right: p, bottom: p};
		else if (p.length === 2)
			return {top: p[0], left: p[1], right: p[1], bottom: p[0]};
		else if (p.length === 4)
			return {top: p[0], left: p[3], right: p[1], bottom: p[2]};
		else
			return {top: 0, left: 0, right: 0, bottom: 0};
	}

	export default {

		name: "latte-swiper",

		props: {
			center: {default: true, type: Boolean},
			itemPadding: {default: 0, type: Number | Array},
			itemWidth: {default: undefined, type: Number | undefined},
			viewPadding: {default: 0, type: Number | Array}
		},

		beforeDestroy()
		{
			this.observer.disconnect();
		},

		data()
		{
			return {
				can: {
					navigate: true,
					observe: true
				},
				is: {
					dragging: true,
					swipeToEnd: false,
					swipeToStart: false
				},
				offset: {
					start: 0
				},
				rect: {
					root: null,
					body: null
				},
				observer: new MutationObserver(mutations => this.onDOMMutations(mutations)),
				viewCount: 0,
				currentPosition: undefined,
				startPosition: undefined,
				position: 0,
				positionBeforeTouch: 0
			}
		},

		mounted()
		{
			this.$el.addEventListener("touchstart", onlyTouch(this.onTouchStart), {passive: true});
			this.$el.addEventListener("touchmove", onlyTouch(this.onTouchMove), {passive: true});
			this.$el.addEventListener("touchend", onlyTouch(this.onTouchEnd), {passive: true});
			this.$el.addEventListener("wheel", onlyMouse(this.onMouseWheel));

			this.observer.observe(this.$el, {
				attributes: true,
				characterData: true,
				childList: true,
				subtree: true
			});

			this.update();
			this.navigate(0);
		},

		computed: {

			bodyStyle()
			{
				return {
					transform: `translate3d(${this.position + this.offset.start}px, 0, 0)`
				};
			},

			iPadding()
			{
				return convertPadding(this.itemPadding);
			},

			rootClasses()
			{
				const classes = [];

				if (this.is.dragging)
					classes.push("is-dragging");

				return classes;
			},

			vPadding()
			{
				return convertPadding(this.viewPadding);
			}

		},

		methods: {

			centerize(containerWidth, itemWidth)
			{
				if (!this.center)
					this.offset.start = 0;
				else
					this.offset.start = Math.round((containerWidth - itemWidth) / 2) - this.vPadding.left;
			},

			onDOMMutations()
			{
				if (!this.can.observe)
					return;

				this.update();
			},

			onMouseWheel(evt)
			{
				evt.preventDefault();

				if (!this.can.navigate)
					return;

				this.can.navigate = false;

				if (evt.deltaY > 0)
					this.navigate(1);
				else if (evt.deltaY < 0)
					this.navigate(-1);

				raf(() => this.can.navigate = true, 240);
			},

			onTouchStart(evt)
			{
				const coords = getCoords(evt);

				this.currentPosition = coords;
				this.startPosition = coords;
				this.positionBeforeTouch = this.position;
				this.can.observe = false;
				this.is.dragging = true;
			},

			onTouchMove(evt)
			{
				if (!this.is.dragging)
					return;

				const coords = getCoords(evt);

				this.is.swipeToEnd = coords.x > this.currentPosition.x;
				this.is.swipeToStart = !this.is.swipeToEnd;
				this.currentPosition = coords;

				let change = (this.startPosition.x - this.currentPosition.x);
				let itemWidth = (this.itemWidth || this.rect.root.width) - (this.vPadding.left + this.vPadding.right);
				let overflow = 0;
				let position = this.positionBeforeTouch - change;
				let width = this.viewCount * itemWidth;

				let max = itemWidth / 2;
				let min = -width + (itemWidth / 2);

				if (position > 0)
					overflow = position;

				if (position < -(width - itemWidth))
					overflow = position - -(width - itemWidth);

				this.centerize(this.rect.root.width, itemWidth);
				this.position = clamp(position - (overflow / 1.5), min, max);
			},

			onTouchEnd()
			{
				this.can.observe = true;
				this.is.dragging = false;

				let index = 0;
				let position = 0;
				let itemWidth = (this.itemWidth || this.rect.root.width) - (this.vPadding.left + this.vPadding.right);
				let width = this.viewCount * itemWidth;

				if (this.position > 0)
				{
					position = 0;
				}
				else if (this.position < -(width - itemWidth))
				{
					position = -(width - itemWidth);
				}
				else
				{
					let change = (this.startPosition.x - this.currentPosition.x);

					if (Math.abs(change) < (itemWidth * .2))
						index = Math.abs(Math.round(this.position / itemWidth));
					else if (this.is.swipeToEnd)
						index = Math.abs(Math.ceil(this.position / itemWidth));
					else if (this.is.swipeToStart)
						index = Math.abs(Math.floor(this.position / itemWidth));

					position = index * -itemWidth;
				}

				index = Math.abs(Math.round(position / itemWidth));

				this.centerize(this.rect.root.width, itemWidth);
				this.position = position;

				this.currentPosition = undefined;
				this.startPosition = undefined;
			},

			navigate(change)
			{
				this.is.dragging = false;

				let itemWidth = (this.itemWidth || this.rect.root.width) - (this.vPadding.left + this.vPadding.right);
				let index = Math.abs(Math.round(this.position / itemWidth));

				this.centerize(this.rect.root.width, itemWidth);
				this.position = Math.max(0, Math.min(this.viewCount - 1, index + change)) * -itemWidth;
			},

			update()
			{
				this.can.observe = false;

				const body = this.$el.querySelector(".swiper-body");

				this.rect.root = this.$el.getBoundingClientRect();
				this.rect.body = body.getBoundingClientRect();
				this.viewCount = body.children.length;

				let gutter = this.iPadding.left + this.iPadding.right + this.vPadding.left + this.vPadding.right;
				let width = (this.itemWidth || this.rect.root.width) - gutter;

				this.$el.style.setProperty("--swiper-item-padding", `${this.iPadding.top}px ${this.iPadding.right}px ${this.iPadding.bottom}px ${this.iPadding.left}px`);
				this.$el.style.setProperty("--swiper-item-width", `${width}px`);
				this.$el.style.setProperty("--swiper-view-padding", `${this.vPadding.top}px ${this.vPadding.right}px ${this.vPadding.bottom}px ${this.vPadding.left}px`);

				raf(() => this.can.observe = true, 100);
			}

		},

		watch: {

			itemPadding()
			{
				this.update();
			},

			viewPadding()
			{
				this.update();
			}

		}

	}

</script>
