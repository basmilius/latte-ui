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

		name: "Panels",

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
							name: "--panelBackground",
							description: "Background color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--panelBackground").split(",").map(c => parseInt(c))
						},
						{
							name: "--panelElevation",
							description: "Elevation shadow.",
							type: "string",
							default: computedStyle.getPropertyValue("--panelElevation")
						},
						{
							name: "--panelElevationHover",
							description: "Elevation shadow on hover.",
							type: "string",
							default: computedStyle.getPropertyValue("--panelElevationHover")
						},
						{
							name: "--panelGutter",
							description: "Gutter.",
							type: "string",
							default: computedStyle.getPropertyValue("--panelGutter")
						}
					]
				}
			};
		}

	}

</script>
