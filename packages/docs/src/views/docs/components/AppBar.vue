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
						<div class="notice notice-warning">
							<i class="mdi mdi-alert"></i>
							<p>
								<strong>Note</strong>
								This only works in browsers that support the CSS Paint API which is part of Houdini.
							</p>
						</div>
					</CodeExample>

					<CodeExample class="darker" title="Panel" url="/snippets/components/app-bar/panel.html"></CodeExample>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents></TableOfContents>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";
	import CodeExample from "../../../components/CodeExample";

	export default {

		name: "AppBar",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}

	}

</script>
