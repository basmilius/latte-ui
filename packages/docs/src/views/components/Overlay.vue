<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-overlay">

		<PageHeader title="Overlay" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard" classes="bg-main"/>
				<CodeExample :code="previews.twoPanels" title="Two panels" classes="bg-main"/>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="API" id="api">
			<div class="col-12">
				<ApiExplorer v-bind="api"/>
			</div>
		</TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";
	import CodeExample from "../../components/CodeExample";
	import CodeSnippet from "../../components/CodeSnippet";
	import ApiExplorer from "../../components/ApiExplorer";

	export default {

		name: "Overlay",

		components: {ApiExplorer, CodeSnippet, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				api: {
					events: [
						{
							name: "close",
							description: "Fires when the overlay closes.",
							signature: "()"
						},
						{
							name: "open",
							description: "Fires when the overlay opens.",
							signature: "()"
						}
					],
					properties: [
						{
							name: "name",
							description: "The name of the overlay. This name should be unique.",
							required: true,
							type: "Boolean",
							default: null
						},
						{
							name: "opened",
							description: "Opens the overlay at mount.",
							type: "Boolean",
							default: false
						},
						{
							name: "is-dismissible",
							description: "Controls if the overlay is closeable with the escape key.",
							type: "Boolean",
							default: true
						},
						{
							name: "is-responsive",
							description: "Makes the overlay fill the entire screen on mobile devices.",
							type: "Boolean",
							default: true
						}
					]
				},
				previews: {
					standard: require("raw-loader!../../data/components/overlay/standard.html").default,
					twoPanels: require("raw-loader!../../data/components/overlay/two-panels.html").default
				},
				tabs: [
					{label: "Introduction", selector: "#introduction"},
					{label: "Examples", selector: "#examples"},
					{label: "API", selector: "#api"}
				]
			};
		}

	}

</script>
