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
						<div class="panel-header"><span class="panel-title">Data table</span></div>
						<div class="panel-body">
							<latte-autocomplete :data-source="autocompleteDataSource"></latte-autocomplete>
						</div>
						<div class="panel-body">
							<latte-autocomplete :data-source="autocompleteDataSource" multi-select></latte-autocomplete>
						</div>
						<div class="panel-body">
							<latte-autocomplete :data-source="autocompleteDataSource" multi-select :value="[3, 6]"></latte-autocomplete>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Data table</span></div>
						<latte-data-table add-spinner-to-parent :data-source="datatableDataSource"></latte-data-table>
					</div>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../components/PageHeader";
	import { randomPassword } from "@bybas/latte-ui/src/js/core";

	export default {

		components: {
			PageHeader
		},

		data()
		{
			let rows = [];

			for (let i = 0; i < 1000; i++)
				rows.push({name: `Bas ${i + 1}`});

			return {
				rows: rows
			};
		},

		methods: {

			autocompleteDataSource()
			{
				const data = [];

				for (let i = 0; i < 20; i++)
					data.push({value: i, label: randomPassword(), sub_label: `Entry ${i}`});

				return {
					async getEntries(ids)
					{
						return ids.map(id => data.find(d => d.value === id));
					},

					async getSuggestions(query)
					{
						return data.filter(d => d.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
					}
				};
			},

			datatableDataSource()
			{
				let $this = this;

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
							data: $this.rows.slice(offset, offset + limit),
							pagination: undefined,
							total: $this.rows.length
						};
					}
				};
			}

		}

	}

</script>
