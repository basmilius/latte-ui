<template>

	<div class="page" id="components-app-bar">

		<PageHeader>
			<h1>App bar</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" title="Basic" url="/snippets/components/app-bar/basic.html"></CodeExample>
					<CodeExample class="darker" title="Auto height" url="/snippets/components/app-bar/auto-height.html"></CodeExample>
					<CodeExample class="darker" title="Flat & transparent" url="/snippets/components/app-bar/flat-transparent.html"></CodeExample>
					<CodeExample class="darker" title="Action buttons" url="/snippets/components/app-bar/action-buttons.html"></CodeExample>
					<CodeExample class="darker" title="Search" url="/snippets/components/app-bar/search.html"></CodeExample>
					<CodeExample class="darker" title="Multiple rows" url="/snippets/components/app-bar/rows.html"></CodeExample>
					<CodeExample class="darker" title="Main app bar" url="/snippets/components/app-bar/main.html">
						To make an app bar the primary one on your page, simply apply the <code>app-bar-main</code> class to it. The app bar will
						become sticky and gets a higher z-index.
					</CodeExample>
					<CodeExample class="darker" title="Panel" url="/snippets/components/app-bar/panel.html"></CodeExample>

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

	import ApiExplorer from "../../../components/ApiExplorer";
	import CodeExample from "../../../components/CodeExample";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "AppBar",

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
				}
			};
		}

	}

</script>
