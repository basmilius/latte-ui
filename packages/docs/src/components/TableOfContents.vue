<template>

	<div class="panel mb-panel-gutter">
		<nav class="nav nav-list">
			<template v-for="element of elements">
				<div class="divider divider-horizontal" v-if="element.isSeparator"></div>

				<latte-ripple as="a" class="nav-link" :class="{'pl-5': element.type === 'h3'}" @click="goToElement(element.el)" v-else>
					<span>{{ element.title }}</span>
				</latte-ripple>
			</template>
		</nav>
	</div>

</template>

<script>

	import { Latte } from "../../../latte-ui";

	export default {

		name: "TableOfContents",

		data()
		{
			return {
				elements: []
			};
		},

		mounted()
		{
			const page = document.querySelector("div.page");
			const elements = Array.prototype.slice.call(page.querySelectorAll("h2,h3,.docs-separator"));

			this.elements = elements.map(el => ({
				el,
				title: el.textContent,
				type: el.tagName.toLowerCase(),
				isSeparator: el.classList.contains("docs-separator")
			}));
		},

		methods: {

			goToElement(el)
			{
				const panel = Latte.util.dom.closest(el, "div.panel");

				if (panel !== null)
					el = panel;

				const rect = el.getBoundingClientRect();

				window.scrollTo({
					behavior: "smooth",
					top: rect.top + document.scrollingElement.scrollTop - 84
				});
			}

		}

	}

</script>

<style lang="scss" scoped>

	@media (min-width: 992px)
	{
		div.panel
		{
			position: sticky;
			top: calc(var(--appBarHeight) + 24px);
			max-height: calc(100vh - var(--appBarHeight) - 48px);
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}
	}

</style>
