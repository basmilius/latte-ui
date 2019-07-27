<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<nav class="bottom-nav" :class="{'bottom-nav-shifting': isShifting, 'bottom-nav-side': isSide}" @click="onClick">
		<slot></slot>
	</nav>

</template>

<script>

	import { closest } from "../../js/util/dom";

	export default {

		name: "latte-bottom-nav",

		props: {
			isShifting: {default: false, type: Boolean},
			isSide: {default: false, type: Boolean},
			value: {default: 0, type: Number}
		},

		mounted()
		{
			this.deactivateItems();
			this.activateItem(this.items[this.value]);
		},

		computed: {

			items()
			{
				return Array.from(this.$el.children)
					.filter(c => c.classList.contains("btn-action"))
					.filter(c => !c.disabled);
			}

		},

		methods: {

			activateItem(item)
			{
				item.classList.add("is-active");

				const rootRect = this.$el.getBoundingClientRect();
				const itemRect = item.getBoundingClientRect();

				this.$el.style.setProperty("--bottom-nav-ind-height", `${itemRect.height}px`);
				this.$el.style.setProperty("--bottom-nav-ind-pos", `${itemRect.top - rootRect.top}px`);
			},

			deactivateItems()
			{
				this.$el.querySelectorAll(".btn-action").forEach(item => item.classList.remove("is-active"));
			},

			onClick(evt)
			{
				const item = closest(evt.target, ".btn-action");

				if (item === null)
					return;

				this.deactivateItems();
				this.activateItem(item);

				this.$emit("input", Array.prototype.indexOf.call(this.$el.children, item));
			}

		},

		watch: {

			value()
			{
				this.deactivateItems();
				this.activateItem(this.items[this.value]);
			}

		}

	}

</script>
