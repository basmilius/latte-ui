<template>

	<div class="page-header" :class="{'is-sticky': tabsWithElement.length > 0}">
		<div class="container pt-5" :class="{'pb-5': tabsWithElement.length === 0}">
			<div class="row">
				<div class="col-12 py-3">
					<h1 class="m-0">{{ title }}</h1>
				</div>
			</div>
			<div class="row" v-if="tabsWithElement.length > 0">
				<div class="col-12">

					<nav class="nav nav-tabs mt-3">
						<a @click="navigate(tab.selector)" class="nav-link" :class="{'is-active': currentTab && currentTab.selector === tab.selector}" v-for="tab of tabsWithElement">
							<span>{{ tab.label }}</span>
						</a>
					</nav>

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
				const scrollTop = document.scrollingElement.scrollTop || window.scrollTop || 0;
				const tabs = this.tabsWithElement
					.sort((a, b) => Latte.operators.spaceship(a.rect.top, b.rect.top));

				if (tabs.length === 0)
					return this.currentTab = null;

				this.currentTab = tabs
					.reduce((a, b) => Math.abs(scrollTop - a.rect.top) < Math.abs(scrollTop - b.rect.top) ? a : b);
			}

		},

		watch: {

			tabs: {
				immediate: true, handler()
				{
					this.$nextTick(() =>
					{
						this.tabsWithElement = this.tabs.map(tab =>
						{
							const elm = document.querySelector(tab.selector);
							const rect = elm ? elm.getBoundingClientRect() : null;

							return Object.assign({}, tab, {elm, rect});
						});

						this.onScroll();
					});
				}
			}

		}

	}

</script>
