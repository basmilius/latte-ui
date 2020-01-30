<template>

	<div class="page" id="component-notice">

		<PageHeader title="Notice" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel"/>
				<CodeExample :code="previews.closeable" title="Closeable" classes="bg-panel"/>
				<CodeExample :code="previews.icon" title="With icon" classes="bg-panel"/>
				<CodeExample :code="previews.fluid" title="Fluid" classes="bg-panel"/>
				<CodeExample :code="previews.button" title="With buttons" classes="bg-panel"/>
				<CodeExample :code="previews.panel" title="Inside a panel"/>
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

		name: "Notice",

		components: {ApiExplorer, CodeSnippet, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				api: {},
				previews: {
					standard: require("raw-loader!../../data/components/notice/standard.html").default,
					closeable: require("raw-loader!../../data/components/notice/closeable.html").default,
					icon: require("raw-loader!../../data/components/notice/icon.html").default,
					fluid: require("raw-loader!../../data/components/notice/fluid.html").default,
					button: require("raw-loader!../../data/components/notice/button.html").default,
					panel: require("raw-loader!../../data/components/notice/panel.html").default
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
