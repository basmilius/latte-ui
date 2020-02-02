<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<nav class="nav nav-tabs">

		<template v-for="(tab, index) in tabs">
			<a class="nav-link" :class="{'is-active': tab.active}" @click="click(index)">
				<Icon :name="tab.icon" v-if="tab.icon !== ''"/>
				<span v-if="tab.label !== ''">{{ tab.label }}</span>
				<span class="badge badge-primary ml-2" v-if="tab.badge !== ''">{{ tab.badge }}</span>
			</a>
		</template>

	</nav>

</template>

<script>

	import Icon from "./Icon.vue";

	export default {

		components: {Icon},

		name: "latte-tab-bar",

		inject: ["tabContainer"],

		data()
		{
			return {
				current: 0,
				tabs: []
			};
		},

		mounted()
		{
			this.tabContainer.$on("change", current => this.onTabChange(current));
			this.tabContainer.updateTabBars();
		},

		methods: {

			click(index)
			{
				this.tabContainer.current = index;
			},

			onTabChange(current)
			{
				this.current = current;
			}

		}

	}

</script>
