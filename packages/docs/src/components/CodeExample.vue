<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel overflow-hidden">
		<div class="panel-header"><span class="panel-title">{{ title }}</span></div>
		<component :is="preview" v-if="preview"></component>
		<CodeSnippet class="border-left-0 border-right-0 border-bottom-0 radius-none" :code-string="cleanCode" lang="html"/>
	</div>

</template>

<script>

	import Vue from "vue";

	import CodeSnippet from "./CodeSnippet";

	export default {

		name: "CodeExample",

		components: {CodeSnippet},

		props: {
			bindings: {default: () => ({}), type: Object},
			classes: {default: "", type: String},
			code: {required: true, type: String},
			references: {default: () => [], type: Array},
			title: {required: true, type: String}
		},

		computed: {

			cleanCode()
			{
				return this.code
					.trim()
					.replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm, "")
					.replace(/\s(preview:[^("\s)]*)/gm, "")
					.replace(/\sclass=""/gm, "")
					.replace(/(\r?\n){2,}/gm, "\n\n")
					.trim();
			},

			previewCode()
			{
				return this.code
					.trim()
					.replace(/(preview:)/gm, "");
			},

			preview()
			{
				const bindings = this.bindings;
				const classes = this.classes;
				const code = this.previewCode;
				const references = this.references;

				return Vue.extend({

					refs: references,

					template: `<div class="panel-body bg-main ${classes}">${code}</div>`,

					data()
					{
						return bindings;
					}

				});
			}

		}

	}

</script>
