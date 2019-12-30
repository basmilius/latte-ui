<template>

	<div class="page" id="component-app-bar">

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

	export default {

		name: "Chat",

		components: {CodeSnippet, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
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
