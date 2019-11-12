<template>

	<div class="page" id="components-button">

		<PageHeader>
			<h1>Button</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Contained buttons" url="/snippets/components/button/contained.html"></CodeExample>
					<CodeExample title="Floating action buttons" url="/snippets/components/button/fab.html"></CodeExample>
					<CodeExample title="Outline buttons" url="/snippets/components/button/outline.html"></CodeExample>
					<CodeExample title="Soft buttons" url="/snippets/components/button/soft.html"></CodeExample>
					<CodeExample title="Text buttons" url="/snippets/components/button/text.html"></CodeExample>
					<CodeExample title="Action buttons" url="/snippets/components/button/action.html"></CodeExample>
					<CodeExample title="Grouped buttons" url="/snippets/components/button/group.html"></CodeExample>
					<CodeExample class="darker" title="Pill buttons" url="/snippets/components/button/pill.html"></CodeExample>
					<CodeExample title="Button sizes" url="/snippets/components/button/sizes.html"></CodeExample>

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

		name: "Buttons",

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
					variables: [
						{
							name: "--btnAlpha",
							description: "Controls the button alpha level.",
							type: "int",
							default: 1
						},
						{
							name: "--btnBackground",
							description: "Background color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--btnBackground").split(",").map(c => parseInt(c))
						},
						{
							name: "--btnForeground",
							description: "Foreground color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--btnForeground").split(",").map(c => parseInt(c))
						},
						{
							name: "--btnFontSize",
							description: "Font size of the button.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnFontSize")
						},
						{
							name: "--btnHeight",
							description: "Height of the button.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnHeight")
						},
						{
							name: "--btnHover",
							description: "Hover state.",
							type: "int",
							default: 0
						},
						{
							name: "--btnIconSize",
							description: "Icon size.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnIconSize")
						},
						{
							name: "--btnPadding",
							description: "Button padding.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnPadding")
						}
					]
				}
			};
		}

	}

</script>
