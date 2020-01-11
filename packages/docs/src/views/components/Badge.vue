<template>

	<div class="page" id="component-badge">

		<PageHeader title="Badge" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.clickable" title="Clickable" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.closable" title="Closable" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.spinner" title="With a spinner" classes="bg-panel d-flex flex-wrap justify-content-center"/>
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

		name: "Badge",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				api: {
					variables: [
						{
							name: "--badgeColor",
							description: "Sets the badge color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--badgeColor").split(",").map(c => parseInt(c))
						}
					]
				},
				previews: {
					standard: require("raw-loader!../../data/components/badge/standard.html").default,
					clickable: require("raw-loader!../../data/components/badge/clickable.html").default,
					closable: require("raw-loader!../../data/components/badge/closable.html").default,
					spinner: require("raw-loader!../../data/components/badge/spinner.html").default
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
