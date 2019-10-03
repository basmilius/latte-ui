<template>

	<div class="panel code-example-panel" :class="{'is-loading': isLoading}">
		<div class="panel-header">
			<h2 class="panel-title mb-0">{{ title }}</h2>
			<div class="ml-auto"></div>
			<slot name="header"></slot>
		</div>

		<div class="panel-body" v-if="$slots.default">
			<slot></slot>
		</div>

		<div class="code-example-preview">
			<component :is="component" v-if="component !== null"></component>
		</div>

		<div class="code-example-code" v-if="showCode">
			<CodeSnippet lang="html" v-if="code">{{ code }}</CodeSnippet>
		</div>

		<slot name="root"></slot>

		<span class="spinner spinner-primary"></span>
	</div>

</template>

<script>

	import { Latte } from "../../../latte-ui";
	import Vue from "vue";
	import CodeSnippet from "./CodeSnippet";

	export default {

		name: "CodeExample",

		components: {
			CodeSnippet
		},

		props: {
			bindings: {default: () => ({}), type: Object},
			previewClasses: {default: "", type: String},
			showCode: {default: true, type: Boolean},
			title: {default: "Example", type: String},
			url: {default: "Example", required: true, type: String}
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

				Latte.api.request(this.url)
					.then(r => r.text())
					.then(r => this.onSnippetLoaded(r))
					.catch(err => Latte.core.handleError(err));
			},

			onSnippetLoaded(code)
			{
				this.code = code
					.replace(new RegExp(`\n<div class="ce-gutter"></div>\n`, "g"), "")
					.replace(new RegExp(`\n<div class="ce-gutter-w"></div>\n`, "g"), "");

				const bindings = this.bindings || {};

				this.component = Vue.extend({

					template: `<div class="${this.previewClasses}">${code}</div>`,

					data()
					{
						return bindings || {};
					}

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

	div.ce-gutter-w
	{
		width: 30px;
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
		background: rgba(var(--panel-background), 1);
		border-bottom: 1px solid rgba(var(--outline-color), 1);
		z-index: 0;
	}

	.darker div.code-example-preview
	{
		background: rgba(var(--main-background), 1);
	}

	div.code-example-code pre
	{
		font-family: "Operator Mono", monospace;
		font-size: 13px;
		font-weight: 500;
		tab-size: 30px;
	}

</style>
