<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="tests">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header">
							<span class="panel-title">Data table</span>
						</div>
						<latte-data-table add-spinner-to-parent :data-source="customDataSource"></latte-data-table>
						<!--						<latte-data-table add-spinner-to-parent data-source="https://latte.dev-preview.nl/api/hub/apps/data-table"></latte-data-table>-->
					</div>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../components/PageHeader";

	export default {

		components: {
			PageHeader
		},

		data()
		{
			return {};
		},

		methods: {

			async customDataSource()
			{
				return {
					actions: [],
					columns: [
						{
							field: "name",
							label: "Name",
							template: `<div class="column-content">{{ row.name }}</div>`
						}
					],
					initial_data: undefined,
					limit: 10,
					offset: 0,

					async requestData(offset, limit, filters, params, sorting)
					{
						return {
							data: [
								{name: "Bas"}
							],
							pagination: undefined,
							total: 1000
						};
					}
				};
			}

		}

	}

</script>
