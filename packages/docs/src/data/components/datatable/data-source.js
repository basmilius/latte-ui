export default function exampleDataSource()
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
