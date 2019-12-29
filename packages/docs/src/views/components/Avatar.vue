<template>

	<div class="page" id="component-app-bar">

		<PageHeader title="Avatar" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Used to show profile pictures or initials of users or other images in a list.</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="API" id="api"></TitledRow>

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

	export default {

		name: "AppBar",

		components: {CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
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
