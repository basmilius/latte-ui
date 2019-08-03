<template>

	<div class="page" id="components-pagination">

		<PageHeader>
			<h1>Pagination</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic" url="/snippets/components/pagination/basic.html"></CodeExample>
					<CodeExample title="Controller bar" url="/snippets/components/pagination/controller-bar.html"></CodeExample>
					<CodeExample title="Vue component" url="/snippets/components/pagination/vue-component.html">
						<ApiExplorer slot="root" class="panel-blank border-top" title="" v-bind="api"/>
					</CodeExample>

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

		name: "Pagination",

		components: {
			ApiExplorer,
			CodeExample,
			PageHeader,
			TableOfContents
		},

		data()
		{
			return {
				api: {
					events: [
						{
							name: "limit",
							description: "Invoked when the limit is changed by the user.",
							signature: "(limit: number)"
						},
						{
							name: "navigate",
							description: "Invoked when the user clicked an item.",
							signature: "(page: number)"
						}
					],
					properties: [
						{
							name: "limit",
							description: "Tells pagination what the limit per page is.",
							type: "number",
							default: 10,
							required: true
						},
						{
							name: "offset",
							description: "Tells pagination what the current offset is.",
							type: "number",
							default: 0,
							required: true
						},
						{
							name: "total",
							description: "Tells pagination how many items there are in total.",
							type: "number",
							default: 0,
							required: true
						},
						{
							name: "controller-bar",
							description: "Shows the controller bar.",
							type: "boolean",
							default: false
						},
						{
							name: "navigation-controls",
							description: "Shows arrow navigation controls.",
							type: "boolean",
							default: true
						},
						{
							name: "size-end",
							description: "Controls how many pages are be visible at both ends.",
							type: "number",
							default: 2
						},
						{
							name: "size-mid",
							description: "Controls how many pages are visible in the middle.",
							type: "number",
							default: 1
						}
					]
				}
			};
		}

	}

</script>
