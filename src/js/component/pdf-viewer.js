/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { forObject } from "../i18n.js";
import { downloadFile, printDocument } from "../util/dom.js";

/**
 * Creates the latte-pdf-viewer component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	const pdfjs = window.pdfjsLib || undefined;

	if (pdfjs === undefined)
		return;

	Vue.component("latte-pdf-viewer", {

		props: {

			source: {
				type: String,
				required: true
			}

		},

		template: ` <div class="panel pdf-viewer" role="presentation" style="min-height: 84px" v-latte-context-menu :class="{'is-loading': isLoading}">
						<div class="page" v-for="i in pages" :id="'page-' + i">
							<canvas></canvas>
						</div>
						
						<span class="spinner"></span>
						
						<nav class="nav latte-nav-list latte-context-menu">
							<a class="nav-link" :href="source" target="_blank"><i class="mdi mdi-open-in-new"></i> <span>{{ i18n.openInNewTab }}</span></a>
							<a class="nav-link" @click="download"><i class="mdi mdi-download"></i> <span>{{ i18n.download }}</span></a>
							<a class="nav-link" @click="print"><i class="mdi mdi-printer"></i> <span>{{ i18n.print }}</span></a>
							<div class="divider divider-horizontal"></div>
							<a class="nav-link" @click="load"><i class="mdi mdi-reload"></i> <span>{{ i18n.reload }}</span></a>
							<slot name="menu"></slot>
						</nav>
					</div>`,

		/**
		 * Provides the initial data for our Vue Component.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				i18n: {
					download: "Download",
					openInNewTab: "Open in new tab",
					print: "Print",
					reload: "Reload"
				},
				isLoading: false,
				pages: 0,
				pdf: null,
				rendered: 0
			};
		},

		/**
		 * Invoked when our Vue Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			this.load();
			this.i18n = forObject(this.i18n);
		},

		methods: {

			/**
			 * Loads the PDF.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			load()
			{
				this.isLoading = true;
				this.rendered = 0;

				pdfjs.getDocument(this.source).then(pdf => this.onPDFLoaded(pdf));
			},

			/**
			 * Downloads the PDF.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			download()
			{
				downloadFile("NULL.pdf", this.source)
			},

			/**
			 * Prints the PDF.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			print()
			{
				printDocument(this.source)
			},

			/**
			 * Invoked when the PDF is loaded.
			 *
			 * @param {*} pdf
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onPDFLoaded(pdf)
			{
				this.pdf = pdf;
				this.pages = this.pdf.numPages;

				this.$nextTick(() => this.onPDFLoadedSecondTask());
			},

			/**
			 * Invoked when the PDF is loaded and JavaCrap can handle our stuff.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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

			/**
			 * Invoked when a single PDF page is ready to be used.
			 *
			 * @param {HTMLElement} pageElement
			 * @param {HTMLCanvasElement} pageCanvas
			 * @param {*} page
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onPDFPageReady(pageElement, pageCanvas, page)
			{
				this.renderPage(pageElement, pageCanvas, page)
			},

			/**
			 * Renders a single page.
			 *
			 * @param {HTMLElement} pageElement
			 * @param {HTMLCanvasElement} pageCanvas
			 * @param {*} page
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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

			/**
			 * Invoked when the source-property changes.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			source()
			{
				this.load();
			}

		}

	});

}
