<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div @pointerover="onPointerEnter" @pointerleave="onPointerLeave">

		<slot name="item">
			<a class="nav-link" :class="{'is-hover': isOpen}">
				<i class="mdi" :class="`mdi-${icon}`" v-if="icon"></i>
				<span class="mr-4">{{ label }}</span>
				<i class="mdi mdi-chevron-right ml-auto"></i>
			</a>
		</slot>

		<div ref="popup" class="popup" :class="{'is-open': isOpen}" :style="popupStyles" @pointerover="onPointerEnter" @pointerleave="onPointerLeave">
			<div class="popup-content">
				<slot></slot>
			</div>
		</div>

	</div>

</template>

<script>

	import { getMainElement } from "../../js/core";
	import { raf } from "../../js/util/dom";
	import { applyZ } from "../../js/core/z";

	export default {

		name: "latte-submenu",

		props: {

			icon: {
				default: null,
				required: false,
				type: String | null
			},

			label: {
				default: "Submenu",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				popup: null,
				isOpen: false,
				timeout: null,
				x: 0,
				y: 0
			};
		},

		beforeDestroy()
		{
			this.popup.remove();
		},

		mounted()
		{
			this.popup = this.$refs.popup;
			this.popup.remove();

			getMainElement().appendChild(this.popup);
		},

		computed: {

			popupStyles()
			{
				return {
					transform: `translate3d(${this.x}px, ${this.y}px, 0)`
				};
			}

		},

		methods: {

			calculatePosition()
			{
				const rect = this.$el.getBoundingClientRect();
				const popupRect = this.popup.getBoundingClientRect();

				let top = rect.top;
				let left = rect.left;

				let x = left + rect.width;
				let y = top - 15;
				let mode = "right";

				if (x + popupRect.width > window.innerWidth)
				{
					x = left - popupRect.width;
					mode = "left";
				}

				if (y + popupRect.height > window.innerHeight)
					y = top - popupRect.height + 59;

				if (mode === "right")
					x -= this.isOpen ? 0 : 24;
				else
					x += this.isOpen ? 0 : 24;

				this.x = x;
				this.y = y;
			},

			onPointerEnter()
			{
				if (this.timeout !== null)
					clearTimeout(this.timeout);

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-popup")
					this.$parent.lattePersistent = true;

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-submenu")
					this.$parent.onPointerEnter();

				if (this.isOpen)
					return;

				this.popup.style.setProperty("transition", "unset");
				applyZ(z => this.popup.style.setProperty("z-index", z));

				this.calculatePosition();

				this.timeout = raf(() =>
				{
					this.popup.style.removeProperty("transition");
					this.isOpen = true;
					this.calculatePosition();
				}, 50);
			},

			onPointerLeave()
			{
				if (this.timeout !== null)
					clearTimeout(this.timeout);

				if (!this.isOpen)
					return;

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-popup")
					this.$parent.lattePersistent = false;

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-submenu")
					this.$parent.onPointerLeave();

				this.timeout = raf(() =>
				{
					this.isOpen = false;
					this.calculatePosition();
				}, 50);
			}

		},

		watch: {

			isOpen()
			{
				if (this.isOpen)
					this.$emit("open");
				else
					this.$emit("close");
			}

		}

	}

</script>

<style lang="scss" scoped>

</style>
