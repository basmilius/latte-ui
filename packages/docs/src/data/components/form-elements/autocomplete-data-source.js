export default function autocompleteDataSource()
{
	let items = [];

	for (let i = 1; i <= 100; i++)
	{
		items.push({
			value: i,
			label: `Item ${i}`
		});
	}

	return Promise.resolve({

		getEntries(values)
		{
			return Promise.resolve(values.map(value => items.find(item => item.value === value)));
		},

		getSuggestions(searchQuery, offset, limit, values)
		{
			return Promise.resolve(items
				.filter(item => item.label.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
				.filter(item => !values.find(value => item.value === value.value))
				.slice(offset, offset + limit));
		}

	});
}
