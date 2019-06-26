<template>

	<div class="panel panel-blank" :class="{'is-loading': isLoading}" id="preview-panel">
		<div class="panel-header">
			<span class="panel-title">{{ title }}</span>
			<button class="btn btn-text btn-dark btn-icon ml-auto" @click="loadPreview"><i class="mdi mdi-refresh"></i></button>
		</div>
		<div class="row no-gutters" id="preview-split-pane">
			<div class="col-12 col-lg-8 d-flex" id="preview-component" v-if="component !== null">

				<div class="panel-body mx-auto" style="max-width: 480px">
					<component :is="component" v-if="component !== null"></component>
				</div>

			</div>
			<div class="col-12 col-lg-4">

				<div class="panel-body" id="preview-code" v-if="code !== null">
					<CodeSnippet lang="html">{{ code }}</CodeSnippet>
				</div>

			</div>
		</div>
		<span class="spinner spinner-primary"></span>
	</div>

</template>

<script>

	import Vue from "vue";
	import { Latte } from "../../../latte-ui";
	import CodeSnippet from "./CodeSnippet";

	export default {

		name: "PreviewExample",
		components: {CodeSnippet},
		props: {

			title: {
				required: true,
				type: String
			},

			url: {
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				code: null,
				component: null,
				isLoading: false
			};
		},

		async mounted()
		{
			await this.loadPreview();
		},

		methods: {

			async loadPreview()
			{
				this.isLoading = true;

				await Latte.api.request(this.url)
					.then(r => r.text())
					.then(r => this.onPreviewLoaded(r))
					.catch(err => Latte.core.handleError(err));

				this.isLoading = false;
			},

			onPreviewLoaded(code)
			{
				this.code = code;
				this.component = Vue.extend({

					template: `<div>${code}</div>`,

					methods: {

						range(from, to)
						{
							const arr = [];

							for (let i = from; i <= to; i++)
								arr.push(i);

							return arr;
						}

					}

				});
				this.isLoading = false;
			}

		},

		watch: {

			async url()
			{
				await this.loadPreview();
			}

		}

	}

</script>

<style lang="scss">

	.preview-mobile-screen
	{
		position: relative;
		display: flex;
		flex-flow: column;
		background: RGB(var(--panel-background));
	}

	div#preview-panel
	{
		margin: calc(0px - var(--content-gutter));
		z-index: 0;

		+ div#preview-panel
		{
			margin-top: var(--content-gutter);
		}

		> div.panel-header
		{
			position: sticky;
			top: var(--app-bar-height);
			background: RGB(var(--panel-background));
			z-index: 1;
		}

		div#preview-code
		{
			height: 100%;
			padding: 0;
			background: RGB(var(--main-background));
			border-left: 1px solid RGB(var(--outline-color));

			div.code-snippet
			{
				border: none;
				border-radius: 0;
			}
		}

		div#preview-component
		{
			z-index: 0;
		}

		@media (min-width: 992px)
		{
			min-height: calc(100vh - var(--app-bar-height));

			div#preview-split-pane
			{
				flex: 1 1 auto;
				overflow: auto;
				overflow-scrolling: touch;
			}
		}
	}

</style>
