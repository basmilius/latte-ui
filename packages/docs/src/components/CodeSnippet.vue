<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	import hljs from "highlight.js";
	import { Latte } from "../../../latte-ui";

	export default {

		name: "CodeSnippet",

		props: {
			codeString: {default: null, type: String},
			lang: {default: "js", required: true, type: String},
			small: {default: false, type: Boolean},
			url: {default: null, type: String | null}
		},

		data()
		{
			return {
				code: this.codeString
			};
		},

		mounted()
		{
			this.loadSnippet();
		},

		render(h)
		{
			const sourceCode = (this.url !== null ? (this.code !== null ? this.code : "") : this.code || this.$slots.default[0].text)
				.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, "")
				.replace(/<!--[\s\S]*?-->/gm, "")
				.trim();

			const code = hljs.highlight(this.lang, sourceCode).value;

			return h("div", {
				class: ["code-snippet", this.small ? "small" : "not-small"],
				domProps: {
					innerHTML: `<pre>${code}</pre>`
				}
			});
		},

		methods: {

			loadSnippet()
			{
				if (this.url === null)
					return;

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
		background: rgba(var(--mainBackground), 1);
		border: 1px solid rgba(var(--outlineColor), 1);
		border-radius: var(--radius);
		overflow: auto;

		pre
		{
			margin: 0;
			padding: 24px;
			font-family: var(--fontMonospace);
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
