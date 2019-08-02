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

					<Variables :vars="buttonVars"/>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents></TableOfContents>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import CodeExample from "../../../components/CodeExample";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";
	import Variables from "../../../components/Variables";

	export default {

		name: "Buttons",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents,
			Variables
		},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				buttonVars: [
					{
						name: "--btn-alpha",
						type: "int",
						default: 1
					},
					{
						name: "--btn-background",
						type: "rgb",
						default: computedStyle.getPropertyValue("--btn-background").split(",").map(c => parseInt(c))
					},
					{
						name: "--btn-foreground",
						type: "rgb",
						default: computedStyle.getPropertyValue("--btn-foreground").split(",").map(c => parseInt(c))
					},
					{
						name: "--btn-font-size",
						type: "string",
						default: computedStyle.getPropertyValue("--btn-font-size")
					},
					{
						name: "--btn-height",
						type: "string",
						default: computedStyle.getPropertyValue("--btn-height")
					},
					{
						name: "--btn-hover",
						type: "int",
						default: 0
					},
					{
						name: "--btn-icon-size",
						type: "string",
						default: computedStyle.getPropertyValue("--btn-icon-size")
					},
					{
						name: "--btn-padding",
						type: "string",
						default: computedStyle.getPropertyValue("--btn-padding")
					}
				]
			};
		}

	}

</script>
