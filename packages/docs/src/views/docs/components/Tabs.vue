<template>

	<div class="page" id="components-tabs">

		<PageHeader>
			<h1>Tabs</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic" url="/snippets/components/tabs/basic.html"></CodeExample>
					<CodeExample title="Component" url="/snippets/components/tabs/component.html"></CodeExample>
					<CodeExample title="Panel" url="/snippets/components/tabs/panel.html" class="darker"></CodeExample>

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

		name: "Tabs",

		components: {
			ApiExplorer,
			CodeExample,
			TableOfContents,
			PageHeader
		},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				api: {
					variables: [
						{
							name: "--tabsAccent",
							description: "The accent color of the indicator.",
							default: computedStyle.getPropertyValue("--tabsAccent").split(","),
							type: "rgb"
						},
						{
							name: "--tabsForeground",
							description: "The foreground color of tabs.",
							default: computedStyle.getPropertyValue("--tabsForeground").split(","),
							type: "rgb"
						},
						{
							name: "--tabsHeight",
							description: "The height of the tabs.",
							default: computedStyle.getPropertyValue("--tabsHeight"),
							type: "string"
						},
						{
							name: "--tabsRadius",
							description: "The radius of the tab indicator.",
							default: computedStyle.getPropertyValue("--tabsRadius"),
							type: "string"
						}
					]
				}
			};
		}

	}

</script>
