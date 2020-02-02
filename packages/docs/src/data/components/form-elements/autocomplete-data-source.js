/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

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
