<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel pdf-viewer" role="presentation" style="min-height: 84px" :class="{'is-loading': isLoading}" v-if="hasSupport">
		<div class="page" v-for="i in pages" :id="'page-' + i">
			<canvas></canvas>
		</div>

		<span class="spinner"></span>
	</div>

	<div class="panel" v-else>
		<div class="panel-body text-center">
			Please include PDF.js in your project.
		</div>
	</div>

</template>

<script>

	window.pdfjsLib = window.pdfjsLib || undefined;

	export default {

		name: "latte-pdf-viewer",

		props: {

			source: {
				type: String,
				required: true
			}

		},

		data()
		{
			return {
				isLoading: false,
				pages: 0,
				pdf: null,
				rendered: 0
			};
		},

		mounted()
		{
			this.load();
		},

		computed: {

			hasSupport()
			{
				return pdfjsLib !== undefined;
			}

		},

		methods: {

			load()
			{
				if (!this.hasSupport)
					return;

				this.isLoading = true;
				this.rendered = 0;

				pdfjsLib.getDocument(this.source).then(pdf => this.onPDFLoaded(pdf));
			},

			onPDFLoaded(pdf)
			{
				this.pdf = pdf;
				this.pages = this.pdf.numPages;

				this.$nextTick(() => this.onPDFLoadedSecondTask());
			},

			onPDFLoadedSecondTask()
			{
				for (let i = 1; i <= this.pages; i++)
				{
					let pageElement = this.$el.querySelector(`div.page#page-${i}`);

					if (typeof pageElement === "undefined")
						throw new Error("Page Element not found!");

					let pageCanvas = pageElement.querySelector("canvas");

					this.pdf.getPage(i).then(this.onPDFPageReady.bind(this, pageElement, pageCanvas));
				}
			},

			onPDFPageReady(pageElement, pageCanvas, page)
			{
				this.renderPage(pageElement, pageCanvas, page)
			},

			renderPage(pageElement, pageCanvas, page)
			{
				let desiredWidth = pageElement.getBoundingClientRect().width;
				let viewport = page.getViewport(1);
				let viewScale = 1;
				let scale = desiredWidth / viewport.width;
				viewport = page.getViewport(scale * viewScale);

				let context = pageCanvas.getContext("2d");
				pageElement.style.height = pageCanvas.style.height = ((pageCanvas.height = Math.round(viewport.height)) / viewScale) + 'px';
				pageElement.style.width = pageCanvas.style.width = ((pageCanvas.width = Math.round(viewport.width)) / viewScale) + 'px';

				let renderContext = {
					canvasContext: context,
					viewport: viewport
				};

				page.render(renderContext).then(() =>
				{
					this.rendered++;
					this.isLoading = !(this.rendered === this.pages);
				});
			}

		},

		watch: {

			source()
			{
				this.load();
			}

		}

	}

</script>
