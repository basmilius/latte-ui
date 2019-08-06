<template>

	<div class="page" id="components-bottom-nav">

		<PageHeader>
			<h1>Bottom nav</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic" url="/snippets/components/bottom-nav/all.html"></CodeExample>
					<CodeExample title="Shifting" url="/snippets/components/bottom-nav/shifting.html"></CodeExample>
					<CodeExample title="Side" url="/snippets/components/bottom-nav/side.html" preview-classes="position-relative d-flex flex-row justify-content-center"></CodeExample>

					<div class="divider divider-horizontal docs-separator"></div>

					<ApiExplorer v-bind="api"/>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents></TableOfContents>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import ApiExplorer from "../../../components/ApiExplorer";
	import CodeExample from "../../../components/CodeExample";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "BottomNav",

		components: {
			ApiExplorer,
			CodeExample,
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
							name: "--bottom-nav-alpha",
							description: "Botton nav alpha.",
							type: "int",
							default: 1
						},
						{
							name: "--bottom-nav-background",
							description: "Background color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--bottom-nav-background").split(",").map(c => parseInt(c))
						},
						{
							name: "--bottom-nav-foreground",
							description: "Foreground color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--bottom-nav-foreground").split(",").map(c => parseInt(c))
						},
						{
							name: "--bottom-nav-elevation",
							description: "Bottom nav elevation shadow.",
							type: "string",
							default: computedStyle.getPropertyValue("--bottom-nav-elevation")
						}
					]
				}
			};
		}

	}

</script>
