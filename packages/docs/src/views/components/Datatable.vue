<template>

	<div class="page" id="component-datatable">

		<PageHeader title="Datatable" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" :bindings="bindings.standard" title="Standard" classes="bg-panel"/>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="API" id="api">
			<div class="col-12">
				<ApiExplorer v-bind="api"/>

				<div class="panel">
					<div class="panel-header"><span class="panel-title">Data source</span></div>
					<div class="panel-body">
						<CodeSnippet :code-string="snippets.dataSource" lang="js"/>
					</div>
				</div>
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

		name: "Datatable",

		components: {ApiExplorer, CodeSnippet, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				api: {
					events: [
						{
							name: "input",
							description: "Invoked when the selection of the data table is changed.",
							signature: "(selection: Array | number)"
						}
					],
					properties: [
						{
							name: "data-source",
							description: "When a function is passed, that function should return a data source object described below. When an URL is given that is used as a data source.",
							default: null,
							type: "Function, string"
						},
						{
							name: "default-limit",
							description: "The initial limit of items to load and show. This property is used when the datatable is mounted.",
							default: "20",
							type: "number"
						},
						{
							name: "name",
							description: "The name of the datatable within a <form> element.",
							default: "[random]",
							type: "string"
						},
						{
							name: "select-mode",
							description: "The selection mode used in the datatable. When single is used, value is a number containing an ID and when multiple is used value is an array containing the IDs.",
							default: "none",
							type: "'none', 'single', 'multiple'"
						},
						{
							name: "show-header",
							description: "Enable or disable the table header.",
							default: true,
							type: "boolean"
						},
						{
							name: "show-search",
							description: "Enable or disable searching the data.",
							default: true,
							type: "boolean"
						},
						{
							name: "show-sorting",
							description: "Enable or disable data sorting.",
							default: true,
							type: "boolean"
						},
						{
							name: "spinner",
							description: "Should the datatable add a spinner when data is loading?",
							default: true,
							type: "boolean"
						},
						{
							name: "value",
							description: "The selection value.",
							default: null,
							type: "Array, number, NULL"
						}
					]
				},
				bindings: {
					standard: {
						exampleDataSource: require("../../data/components/datatable/data-source.js").default
					}
				},
				previews: {
					standard: require("raw-loader!../../data/components/datatable/standard.html").default
				},
				snippets: {
					dataSource: require("!!raw-loader!../../data/components/datatable/data-source.js").default
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
