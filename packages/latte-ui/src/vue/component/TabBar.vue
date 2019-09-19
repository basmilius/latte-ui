<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<nav class="nav nav-tabs">

		<template v-for="(tab, index) in tabs">
			<a class="nav-link" :class="{'is-active': tab.active, 'no-indicator': animatedIndicator}" @click="click(index)">
				<Icon :name="tab.icon" v-if="tab.icon !== ''"/>
				<span v-if="tab.label !== ''">{{ tab.label }}</span>
				<span class="badge badge-primary ml-2" v-if="tab.badge !== ''">{{ tab.badge }}</span>
			</a>
		</template>

		<div class="nav-tabs-indicator" :style="indicatorStyles" v-if="animatedIndicator"></div>

	</nav>

</template>

<script>

	import { raf } from "../../js/util/dom";
	import { on } from "../../js/core/action";
	import Icon from "./base/Icon.vue";

	export default {

		components: {Icon},

		name: "latte-tab-bar",

		props: {
			animatedIndicator: {default: false, type: Boolean}
		},

		data()
		{
			return {
				current: 0,
				indicatorBarRect: null,
				indicatorTabRect: null,
				tabs: []
			};
		},

		mounted()
		{
			this.$parent.$on("change", current => this.onTabChange(current));
			this.$parent.updateTabBars();

			on("latte:tick", () => raf(() => this.updateIndicator()));

			window.addEventListener("load", () => raf(() => this.updateIndicator(), 50));
		},

		computed: {

			indicatorStyles()
			{
				if (this.indicatorBarRect === null || this.indicatorTabRect === null)
					return null;

				return {
					width: `${Math.round(this.indicatorTabRect.width)}px`,
					transform: `translate3d(${Math.round(this.indicatorTabRect.left - this.indicatorBarRect.left)}px, 0, 0)`
				};
			}

		},

		methods: {

			click(index)
			{
				this.$parent.current = index;
			},

			updateIndicator()
			{
				this.indicatorTabRect = null;

				if (!this.animatedIndicator)
					return;

				const tab = this.$el.querySelector(`a.nav-link:nth-child(${this.current + 1})`);

				if (tab === null)
					return;

				this.indicatorBarRect = this.$el.getBoundingClientRect();
				this.indicatorTabRect = tab.getBoundingClientRect();
			},

			onTabChange(current)
			{
				this.current = current;
			}

		},

		watch: {

			animatedIndicator()
			{
				raf(() => this.updateIndicator());
			},

			current()
			{
				raf(() => this.updateIndicator());
			},

			tabs()
			{
				raf(() => this.updateIndicator());
			}

		}

	}

</script>
