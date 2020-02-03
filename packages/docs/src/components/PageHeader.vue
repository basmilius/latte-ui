<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page-header" :class="{'is-sticky': tabsWithElement.length > 0}">
		<div class="container pt-5" :class="{'pb-5': tabsWithElement.length === 0}">
			<div class="row">
				<div class="col-12 py-3">
					<h1 class="m-0 text-center text-lg-left">{{ title }}</h1>
				</div>
			</div>
			<div class="row" v-if="tabsWithElement.length > 0">
				<div class="col-12">

					<latte-focus-zone is-horizontal>
						<nav class="nav nav-tabs mt-3 justify-content-center justify-content-lg-start">
							<template v-for="tab of tabsWithElement">
								<a class="nav-link" :tabindex="currentTab && currentTab.selector === tab.selector ? 0 : -1" :class="{'is-active': currentTab && currentTab.selector === tab.selector}" @click="navigate(tab.selector)">
									<span>{{ tab.label }}</span>
								</a>
							</template>
						</nav>
					</latte-focus-zone>

				</div>
			</div>
		</div>
	</div>

</template>

<script>

	import { Latte } from "@bybas/latte-ui";

	export default {

		name: "PageHeader",

		props: {
			tabs: {default: () => [], type: Array},
			title: {default: "Title", type: String}
		},

		created()
		{
			window.addEventListener("scroll", this.onScroll, {passive: true});
		},

		data()
		{
			return {
				currentTab: null,
				tabsWithElement: []
			};
		},

		destroyed()
		{
			window.addEventListener("scroll", this.onScroll);
		},

		methods: {

			navigate(selector)
			{
				const el = document.querySelector(selector);

				if (!el)
					return;

				const rect = el.getBoundingClientRect();

				window.scrollTo({
					top: rect.top + document.scrollingElement.scrollTop - 100,
					behavior: "smooth"
				});
			},

			onScroll()
			{
				if (this.tabsWithElement.length === 0)
					return this.currentTab = null;

				const scrollTop = document.scrollingElement.scrollTop;

				this.currentTab = this.tabsWithElement
					.sort((a, b) => Latte.operators.spaceship(a.rect.top, b.rect.top))
					.filter(a => a.rect.top <= scrollTop + window.innerHeight)
					.reduce((a, b) => Math.abs(a.rect.top - scrollTop) < Math.abs(b.rect.top - scrollTop) ? a : b);
			},

			updateTabs()
			{
				this.tabsWithElement = this.tabs.map(tab =>
				{
					const elm = document.querySelector(tab.selector);

					if (!elm)
						return undefined;

					const rect = elm.getBoundingClientRect();

					return Object.assign({}, tab, {elm, rect});
				}).filter(tab => !!tab);
			}

		},

		watch: {

			tabs: {
				immediate: true, handler()
				{
					this.$nextTick(() =>
					{
						this.updateTabs();
						this.onScroll();
					});
				}
			}

		}

	}

</script>
