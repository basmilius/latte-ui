<template>

	<div class="page" id="component-app-bar">

		<PageHeader title="App Bar" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">An App Bar is the primary navigation element of your app or website. It can also show your primary branding color.</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard"/>
				<CodeExample :code="previews.autoHeight" title="Auto height"/>
				<CodeExample :code="previews.actionButtons" title="Action buttons"/>
				<CodeExample :code="previews.search" title="Search bar"/>
				<CodeExample :code="previews.panel" title="Panel"/>
				<CodeExample :code="previews.tabs" title="Tabs"/>
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

	import previewActionButtons from "raw-loader!../../data/components/app-bar/action-buttons.html";
	import previewAutoHeight from "raw-loader!../../data/components/app-bar/auto-height.html";
	import previewPanel from "raw-loader!../../data/components/app-bar/panel.html";
	import previewSearch from "raw-loader!../../data/components/app-bar/search.html";
	import previewStandard from "raw-loader!../../data/components/app-bar/standard.html";
	import previewTabs from "raw-loader!../../data/components/app-bar/tabs.html";

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";
	import CodeExample from "../../components/CodeExample";
	import ApiExplorer from "../../components/ApiExplorer";

	export default {

		name: "AppBar",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				api: {
					variables: [
						{
							name: "--appBarAlpha",
							description: "App bar alpha.",
							type: "number",
							default: 1
						},
						{
							name: "--appBarBackground",
							description: "Background color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--appBarBackground").split(",").map(c => parseInt(c))
						},
						{
							name: "--appBarForeground",
							description: "Foreground color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--appBarForeground").split(",").map(c => parseInt(c))
						},
						{
							name: "--appBarElevation",
							description: "Elevation shadow.",
							type: "string",
							default: computedStyle.getPropertyValue("--appBarElevation")
						},
						{
							name: "--appBarHeight",
							description: "App bar height",
							type: "string",
							default: computedStyle.getPropertyValue("--appBarHeight")
						}
					]
				},
				previews: {
					standard: previewStandard,
					actionButtons: previewActionButtons,
					autoHeight: previewAutoHeight,
					panel: previewPanel,
					search: previewSearch,
					tabs: previewTabs
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
