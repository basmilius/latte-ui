<template>

	<div class="page" id="component-expandable">

		<PageHeader title="Expandable" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel"/>
				<CodeExample :code="previews.group" title="Group" classes="bg-panel"/>
				<CodeExample :code="previews.advanced" title="With a custom header" classes="bg-panel"/>
				<CodeExample :code="previews.nav" title="Navigation" classes="bg-panel"/>
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
	import ApiExplorer from "../../components/ApiExplorer";

	export default {

		name: "Expandable",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				api: {
					events: [
						{
							name: "close",
							description: "Invoked when the expandable is closed.",
							signature: "()"
						},
						{
							name: "open",
							description: "Invoked when the expandable is opened.",
							signature: "()"
						}
					],
					properties: [
						{
							name: "close-when-open",
							description: "The expandable should close when it's already open.",
							default: true,
							type: "boolean"
						},
						{
							name: "group",
							description: "When you give the expandable a group, others are closed when one is opened.",
							default: null,
							type: "string, null"
						},
						{
							name: "opened",
							description: "The expandable should be open when mounted.",
							default: false,
							type: "boolean"
						}
					]
				},
				previews: {
					standard: require("raw-loader!../../data/components/expandable/standard.html").default,
					advanced: require("raw-loader!../../data/components/expandable/advanced.html").default,
					group: require("raw-loader!../../data/components/expandable/group.html").default,
					nav: require("raw-loader!../../data/components/expandable/nav.html").default
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
