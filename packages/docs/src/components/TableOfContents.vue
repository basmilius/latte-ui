<template>

	<div class="panel">
		<nav class="nav nav-list">
			<div class="section">Table of contents</div>

			<template v-for="heading of headings">
				<latte-ripple as="a" class="nav-link" :class="{'pl-5': heading.type === 'h3'}" @click="goToElement(heading.el)"><span>{{ heading.title }}</span></latte-ripple>
			</template>
		</nav>
	</div>

</template>

<script>

	export default {

		name: "TableOfContents",

		data()
		{
			return {
				headings: []
			};
		},

		mounted()
		{
			const page = document.querySelector("div.page");
			const headings = Array.prototype.slice.call(page.querySelectorAll("h2,h3"));

			this.headings = headings.map(el => ({
				el,
				title: el.textContent,
				type: el.tagName.toLowerCase()
			}));
		},

		methods: {

			goToElement(el)
			{
				const panel = this.$latte.util.dom.closest(el, "div.panel");

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
			top: calc(var(--app-bar-height) + 24px);
			max-height: calc(100vh - var(--app-bar-height) - 48px);
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}
	}

</style>
