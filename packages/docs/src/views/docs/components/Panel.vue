<template>

	<div class="page" id="components-panel">

		<PageHeader>
			<h1>Panel</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" title="Panel" url="/snippets/components/panel/basic.html"></CodeExample>
					<CodeExample class="darker" title="Panel with footer" url="/snippets/components/panel/footer.html"></CodeExample>
					<CodeExample class="darker" title="Panel with media" url="/snippets/components/panel/media.html"></CodeExample>
					<CodeExample class="darker" title="Panel with notice" url="/snippets/components/panel/notice.html"></CodeExample>
					<CodeExample class="darker" title="Panel with list" url="/snippets/components/panel/list.html"></CodeExample>
					<CodeExample class="darker" title="Panel with nav" url="/snippets/components/panel/nav.html"></CodeExample>
					<CodeExample class="darker" title="Panel with tabs" url="/snippets/components/panel/tabs.html"></CodeExample>

					<div class="divider divider-horizontal docs-separator"></div>

					<Variables :vars="panelVars"/>

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

		name: "Panels",

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
				panelVars: [
					{
						name: "--panel-background",
						type: "rgb",
						default: computedStyle.getPropertyValue("--panel-background").split(",").map(c => parseInt(c))
					},
					{
						name: "--panel-elevation",
						type: "string",
						default: computedStyle.getPropertyValue("--panel-elevation")
					},
					{
						name: "--panel-elevation-hover",
						type: "string",
						default: computedStyle.getPropertyValue("--panel-elevation-hover")
					},
					{
						name: "--panel-gutter",
						type: "string",
						default: computedStyle.getPropertyValue("--panel-gutter")
					}
				]
			};
		}

	}

</script>
