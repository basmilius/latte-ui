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
					<CodeExample class="darker" title="Multiple rows" url="/snippets/components/app-bar/rows.html"></CodeExample>
					<CodeExample class="darker" title="Main app bar" url="/snippets/components/app-bar/main.html">
						To make an app bar the primary one on your page, simply apply the <code>app-bar-main</code> class to it and it will
						become sticky and gets a higher z-index.
					</CodeExample>
					<CodeExample class="darker" title="Cutout" url="/snippets/components/app-bar/cutout.html">
						<template slot="header">
							<span class="badge badge-warning">CSS Paint API</span>
						</template>
					</CodeExample>
					<CodeExample class="darker" title="Panel" url="/snippets/components/app-bar/panel.html"></CodeExample>

					<div class="divider divider-horizontal docs-separator"></div>

					<Variables :vars="appBarVars"/>

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
	import CodeExample from "../../../components/CodeExample";
	import Variables from "../../../components/Variables";

	export default {

		name: "AppBar",

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
				appBarVars: [
					{
						name: "--app-bar-alpha",
						type: "int",
						default: 1
					},
					{
						name: "--app-bar-background",
						type: "rgb",
						default: computedStyle.getPropertyValue("--app-bar-background").split(",").map(c => parseInt(c))
					},
					{
						name: "--app-bar-foreground",
						type: "rgb",
						default: computedStyle.getPropertyValue("--app-bar-foreground").split(",").map(c => parseInt(c))
					},
					{
						name: "--app-bar-elevation",
						type: "string",
						default: computedStyle.getPropertyValue("--app-bar-elevation")
					},
					{
						name: "--app-bar-gutter",
						type: "string",
						default: computedStyle.getPropertyValue("--app-bar-gutter")
					},
					{
						name: "--app-bar-height",
						type: "string",
						default: computedStyle.getPropertyValue("--app-bar-height")
					}
				]
			};
		}

	}

</script>
