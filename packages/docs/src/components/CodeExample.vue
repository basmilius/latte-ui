<template>

	<div class="panel code-example-panel" :class="{'is-loading': isLoading}">
		<span class="spinner spinner-primary"></span>
		<div class="panel-header">
			<h2 class="panel-title mb-0">{{ title }}</h2>
			<button class="btn btn-text btn-icon btn-dark ml-auto" @click="loadSnippet"><i class="mdi mdi-refresh"></i></button>
		</div>
		<div label="Preview" class="code-example-preview">

			<component :is="component" v-if="component !== null"></component>

		</div>
		<div label="Code" class="code-example-code" v-if="showCode">

			<CodeSnippet lang="html" v-if="code">{{ code }}</CodeSnippet>

		</div>
		<div class="panel-body" v-if="$slots.default">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	import Vue from "vue";
	import CodeSnippet from "./CodeSnippet";

	import { Latte } from "@bybas/latte-ui";

	export default {

		name: "CodeExample",

		components: {
			CodeSnippet
		},

		props: {

			showCode: {
				default: true,
				required: false,
				type: Boolean
			},

			title: {
				default: "Example",
				required: false,
				type: String
			},

			url: {
				default: "Example",
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				code: null,
				component: null,
				isLoading: true
			};
		},

		mounted()
		{
			this.loadSnippet();
		},

		methods: {

			loadSnippet()
			{
				this.isLoading = true;

				this.$latte.api.request(this.url)
					.then(r => r.text())
					.then(r => this.onSnippetLoaded(r))
					.catch(err => this.$latte.core.handleError(err));
			},

			onSnippetLoaded(code)
			{
				this.code = code.replace(new RegExp(`\n<div class="ce-gutter"></div>\n`, "g"), "");
				this.component = Vue.extend({

					template: `<div>${code}</div>`

				});
				this.isLoading = false;
			}

		},

		watch: {

			url()
			{
				this.loadSnippet();
			}

		}

	}

</script>

<style lang="scss">

	div.ce-gutter
	{
		height: 30px;
	}

	div.code-example-panel
	{
		overflow: hidden;

		> div.panel-header:last-child
		{
			border-bottom: 0;
		}
	}

	div.code-example-preview,
	div.code-example-code
	{
		padding: 30px;
		background: var(--panel-background);
		border-bottom: 1px solid var(--outline-color-secondary);
		z-index: 0;
	}

	.darker div.code-example-preview
	{
		background: var(--main-background);
	}

	div.code-example-code pre
	{
		font-family: "Operator Mono", monospace;
		font-size: 13px;
		font-weight: 500;
		tab-size: 30px;
	}

</style>
