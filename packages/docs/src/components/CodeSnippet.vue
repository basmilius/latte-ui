<script>

	import hljs from "highlight.js";
	import Vue from "vue";
	import { Latte } from "../../../latte-ui";

	export default {

		name: "CodeSnippet",

		props: {
			lang: {default: "js", required: true, type: String},
			small: {default: false, type: Boolean},
			url: {default: null, type: String | null}
		},

		data()
		{
			return {
				code: null
			};
		},

		mounted()
		{
			this.loadSnippet();
		},

		render(ce)
		{
			const code = hljs.highlight(this.lang, (this.url !== null ? (this.code !== null ? this.code : "") : this.$slots.default[0].text).trim()).value;
			const cmp = Vue.extend({
				template: `<div class="code-snippet ${this.small ? "small" : ""}"><pre>${code}</pre></div>`
			});

			return ce(cmp);
		},

		methods: {

			loadSnippet()
			{
				Latte.api.request(this.url)
					.then(r => r.text())
					.then(r => this.onSnippetLoaded(r))
					.catch(err => Latte.core.handleError(err));
			},

			onSnippetLoaded(response)
			{
				this.code = response;
			}

		},

		watch: {

			url()
			{
				this.loadSnippet()
			}

		}

	}

</script>

<style lang="scss">

	div.code-snippet
	{
		position: relative;
		display: block;
		margin: 0;
		max-width: 100%;
		background: rgba(var(--main-background), 1);
		border: 1px solid rgba(var(--outline-color), 1);
		border-radius: var(--radius);
		overflow: auto;

		pre
		{
			margin: 0;
			padding: 24px;
			font-family: "Operator Mono", monospace;
			font-size: 13px;
			font-weight: 500;
			overflow: visible;
			tab-size: 36px;
		}

		&.small pre
		{
			padding: 12px;
		}
	}

</style>
