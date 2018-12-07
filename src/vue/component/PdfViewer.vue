<template>

	<div class="panel pdf-viewer" role="presentation" style="min-height: 84px" v-latte-context-menu :class="{'is-loading': isLoading}" v-if="hasSupport">
		<div class="page" v-for="i in pages" :id="'page-' + i">
			<canvas></canvas>
		</div>

		<span class="spinner"></span>

		<nav class="nav nav-list latte-context-menu">
			<a class="nav-link" :href="source" target="_blank"><i class="mdi mdi-open-in-new"></i> <span>{{ "Open in new tab"|i18n("pdf-viewer") }}</span></a>
			<a class="nav-link" @click="download"><i class="mdi mdi-download"></i> <span>{{ "Download"|i18n("pdf-viewer") }}</span></a>
			<a class="nav-link" @click="print"><i class="mdi mdi-printer"></i> <span>{{ "Print"|i18n("pdf-viewer") }}</span></a>
			<div class="divider divider-horizontal"></div>
			<a class="nav-link" @click="load"><i class="mdi mdi-reload"></i> <span>{{ "Reload"|i18n("pdf-viewer") }}</span></a>
			<slot name="menu"></slot>
		</nav>
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

			download()
			{
				downloadFile("NULL.pdf", this.source)
			},

			print()
			{
				printDocument(this.source)
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
				let scale = desiredWidth / viewport.width;
				viewport = page.getViewport(scale);

				let context = pageCanvas.getContext("2d");
				pageElement.style.height = (pageCanvas.height = Math.round(viewport.height)) + 'px';
				pageElement.style.width = (pageCanvas.width = Math.round(viewport.width)) + 'px';

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
