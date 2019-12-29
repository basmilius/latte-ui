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
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel"/>
				<CodeExample :code="previews.initials" title="Initials" classes="bg-panel"/>
				<CodeExample :code="previews.shapes" title="Shapes" classes="bg-panel"/>
				<CodeExample :code="previews.strip" title="Strip" classes="bg-panel"/>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="API" id="api"></TitledRow>

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

	export default {

		name: "AppBar",

		components: {CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
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
