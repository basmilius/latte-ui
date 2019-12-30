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
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel d-flex align-items-center justify-content-center"/>
				<CodeExample :code="previews.initials" title="Initials" classes="bg-panel d-flex align-items-center justify-content-center"/>
				<CodeExample :code="previews.shapes" title="Shapes" classes="bg-panel d-flex align-items-center justify-content-center"/>
				<CodeExample :code="previews.strip" title="Strip" classes="bg-panel d-flex align-items-center flex-column justify-content-center"/>
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

	import previewInitials from "raw-loader!../../data/components/avatar/initials.html";
	import previewShapes from "raw-loader!../../data/components/avatar/shapes.html";
	import previewStrip from "raw-loader!../../data/components/avatar/strip.html";
	import previewStandard from "raw-loader!../../data/components/avatar/standard.html";

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";
	import CodeExample from "../../components/CodeExample";
	import ApiExplorer from "../../components/ApiExplorer";

	export default {

		name: "Avatar",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				api: {
					variables: [
						{
							name: "font-size",
							description: "Sets the size of the avatar.",
							type: "string",
							default: "15px"
						}
					]
				},
				previews: {
					standard: previewStandard,
					initials: previewInitials,
					shapes: previewShapes,
					strip: previewStrip
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
