<script>

	import hljs from "highlight.js";
	import Vue from "vue";

	export default {

		name: "CodeSnippet",

		props: {

			lang: {
				default: "js",
				required: true,
				type: String
			}

		},

		render(ce)
		{
			const code = hljs.highlight(this.lang, this.$slots.default[0].text.trim()).value;
			const cmp = Vue.extend({
				template: `<div class="code-snippet"><pre>${code}</pre></div>`
			});

			return ce(cmp);
		}

	}

</script>

<style lang="scss">

	div.code-snippet
	{
		margin: 0;
		padding: 12px;
		background: var(--main-background);
		border: 1px solid var(--outline-color-secondary);
		border-radius: var(--border-radius);
	}

	div.code-snippet pre
	{
		margin: 0;
		font-family: "Operator Mono", monospace;
		font-size: 13px;
		font-weight: 500;
		tab-size: 30px;
	}

</style>
