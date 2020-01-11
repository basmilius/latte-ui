<template>

	<div class="page" id="component-bottom-nav">

		<PageHeader title="Bottom nav" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard"/>
				<CodeExample :code="previews.shifting" title="Shifting"/>
				<CodeExample :code="previews.side" title="Side" classes="d-flex flex-row justify-content-center"/>
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

		name: "BottomNav",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				api: {
					events: [
						{
							name: "input",
							description: "Invoked when the active item changes.",
							signature: "(index: number)"
						}
					],
					properties: [
						{
							name: "is-shifting",
							description: "Items should only show labels when they're active.",
							default: false,
							type: "boolean"
						},
						{
							name: "is-side",
							description: "Bottom nav should actually be a side-nav.",
							default: false,
							type: "boolean"
						},
						{
							name: "value",
							description: "Control the active item by index.",
							default: 0,
							type: "number"
						}
					],
					variables: [
						{
							name: "--bottomNavAlpha",
							description: "Botton nav alpha.",
							type: "int",
							default: 1
						},
						{
							name: "--bottomNavBackground",
							description: "Background color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--bottomNavBackground").split(",").map(c => parseInt(c))
						},
						{
							name: "--bottomNavForeground",
							description: "Foreground color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--bottomNavForeground").split(",").map(c => parseInt(c))
						},
						{
							name: "--bottomNavElevation",
							description: "Bottom nav elevation shadow.",
							type: "string",
							default: computedStyle.getPropertyValue("--bottomNavElevation")
						}
					]
				},
				previews: {
					standard: require("raw-loader!../../data/components/bottom-nav/standard.html").default,
					shifting: require("raw-loader!../../data/components/bottom-nav/shifting.html").default,
					side: require("raw-loader!../../data/components/bottom-nav/side.html").default
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
