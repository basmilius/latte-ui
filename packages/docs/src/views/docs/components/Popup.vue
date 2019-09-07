<template>

	<div class="page" id="components-popup">

		<PageHeader>
			<h1>Popup</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic" url="/snippets/components/popup/basic.html"></CodeExample>

					<div class="divider divider-horizontal docs-separator"></div>

					<ApiExplorer v-bind="api"/>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents/>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";
	import ApiExplorer from "../../../components/ApiExplorer";
	import CodeExample from "../../../components/CodeExample";

	export default {

		name: "Popup",

		components: {
			CodeExample,
			ApiExplorer,
			PageHeader,
			TableOfContents
		},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				api: {
					events: [
						{
							name: "close",
							description: "Invoked when the popup closes.",
							signature: "()"
						},
						{
							name: "open",
							description: "Invoked when the popup opens.",
							signature: "()"
						}
					],
					properties: [
						{
							name: "animate-transform",
							description: "Should the open and close animation include a translate transform animation?",
							default: true,
							type: "boolean"
						},
						{
							name: "associate-with",
							description: "The element the popup should be associated with. When that element is clicked, the popup is opened.",
							default: null,
							type: "Element"
						},
						{
							name: "margin-x",
							description: "Adjust the horizontal position of the popup, relative to the center of the associated element.",
							default: 0,
							type: "number"
						},
						{
							name: "margin-y",
							description: "Adjust the vertical position of the popup, relative to the center of the associated element.",
							default: 0,
							type: "number"
						},
						{
							name: "persistent",
							description: "When TRUE the popup won't close when clicked outside.",
							default: false,
							type: "boolean"
						},
						{
							name: "with-arrow",
							description: "Should an arrow be displayed?",
							default: true,
							type: "boolean"
						}
					],
					variables: [
						{
							name: "--popup-background",
							description: "Used as the background color of the popup.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--popup-background").split(",").map(c => parseInt(c))
						},
						{
							name: "--popup-elevation",
							description: "Used as the elevation shadow of the popup.",
							type: "string",
							default: computedStyle.getPropertyValue("--popup-elevation")
						}
					]
				}
			};
		}

	}

</script>
