<template>

	<div class="page" id="components-datatable">

		<PageHeader>
			<h1>Datatable</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" preview-classes="bg-panel border" title="Simple" url="/snippets/components/datatable/simple.html" :bindings="{exampleDataSource}"/>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents/>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import CodeExample from "../../../components/CodeExample";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Datatable",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		},

		methods: {

			exampleDataSource()
			{
				let rows = [];

				for (let i = 0; i < 100; i++)
				{
					rows.push({
						name: `Item ${i + 1}`,
						email: `user${i + 1}@example.com`
					});
				}

				return {
					actions: [],
					columns: [
						{
							field: "name",
							label: "Name",
							template: `<div class="column-content"><strong>{{ row.name }}</strong></div>`,
							width: 150
						},
						{
							field: "name",
							label: "Name",
							template: `<div class="column-content">{{ row.email }}</div>`
						}
					],
					initial_data: undefined,
					limit: 10,
					offset: 0,

					async requestData(offset, limit, filters, params, sorting)
					{
						return {
							data: rows.slice(offset, offset + limit),
							pagination: undefined,
							total: rows.length
						};
					}
				};
			}

		}

	}

</script>
