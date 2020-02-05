<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<component :is="as">
		<slot v-bind="{isLoading, filters, params, data, limit, offset, total, sort, setLimit, setOffset}"></slot>
	</component>

</template>

<script>

	import { request } from "../../js/core/api";
	import { handleError } from "../../js/core";
	import { isNullOrWhitespace } from "../../js/util/string";

	function urlDataSource(url)
	{
		return Promise.resolve({
			requestData(offset, limit, filters, params, sorting)
			{
				let queryString = `offset=${offset}&limit=${limit}`;

				if (sorting !== null)
					queryString += `&sort=${sorting.order}&by=${sorting.by}`;

				for (let key in filters)
					if (filters.hasOwnProperty(key))
						queryString += `&filter[${key}]=${filters[key]}`;

				for (let key in params)
					if (params.hasOwnProperty(key))
						queryString += `&${key}=${params[key]}`;

				return new Promise(resolve => request(`${url}?${queryString}`)
					.then(r => r.json())
					.then(r => resolve(r.data))
					.catch(err => handleError(err)));
			}
		});
	}

	export default {

		name: "latte-data-view",

		props: {
			as: {default: "div", type: String},
			dataSource: {default: null, required: true, type: Function | String | null},
			initialLimit: {default: 20, type: Number},
			initialOffset: {default: 0, type: Number}
		},

		data()
		{
			return {
				dsi: undefined,
				isLoading: false,
				filters: [],
				params: {},
				data: [],
				limit: this.initialLimit,
				offset: this.initialOffset,
				total: 0,
				sort: {
					by: "",
					order: "DESC"
				}
			};
		},

		methods: {

			loadData()
			{
				this.isLoading = true;

				const filters = {};
				const params = {};
				const sorting = this.sort.by !== "" ? {order: this.sort.order, by: this.sort.by} : null;

				for (let key in this.params)
					if (!isNullOrWhitespace(this.params[key]))
						params[key] = encodeURIComponent(this.params[key]);

				for (let i in this.filters)
					if (!isNullOrWhitespace(this.filters[i].value.toString()))
						filters[this.filters[i].property] = this.filters[i].value;

				this.dsi.requestData(this.offset, this.limit, filters, params, sorting)
					.then(r => this.onDataReceived(r))
					.catch(err => handleError(err));
			},

			setLimit(limit)
			{
				this.limit = limit;
				this.offset = 0;
				this.loadData();
			},

			setOffset(offset)
			{
				this.offset = offset;
				this.loadData();
			},

			onDataReceived(response)
			{
				if (!response)
					return handleError(new Error("Response is invalid."));

				this.data = response.data;
				this.total = response.total || 0;

				this.isLoading = false;
			},

			onDataSourceChange()
			{
				if (!this.dataSource)
					throw new Error("dataSource is undefined.");

				return new Promise(resolve =>
				{
					let dsi;

					if (typeof this.dataSource === "string")
						dsi = urlDataSource(this.dataSource);
					else
						dsi = this.dataSource();

					if (!(dsi instanceof Promise))
						dsi = Promise.resolve(dsi);

					dsi.then(dsi =>
					{
						this.dsi = dsi;

						if (!this.dsi)
							throw new Error("Invalid data source instance.");

						this.loadData();
						resolve();
					});
				});
			}

		},

		watch: {

			dataSource: {
				deep: true,
				immediate: true,
				handler: "onDataSourceChange"
			}

		}

	}

</script>
