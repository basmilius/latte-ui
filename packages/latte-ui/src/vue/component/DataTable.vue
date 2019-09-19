<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<table class="table table-hover mb-0">
		<thead>

		<tr v-if="showHeader">
			<slot name="data-header" :columns="columns" :is-loading="isLoading" :is-selection-mode="isSelectionMode" :selection="selection" :select-mode="selectMode" :unique-id="uniqueId">
				<th v-if="isSelectionMode" style="width: 42px"></th>
				<th v-for="column in columns" :data-field="column.field" :style="{'min-width': (column.width ? column.width + 'px' : 'auto'), 'width': (column.width ? column.width + 'px' : 'auto') }">
					<div class="column-content flex-row align-items-center justify-content-start">
						<span>{{ column.label }}</span>
						<button v-if="showSorting && column.is_sortable" class="btn btn-icon btn-text btn-sm ml-1" :class="{'btn-dark': sort.by !== column.field, 'btn-primary': sort.by === column.field}" :aria-label="'Sort by @0'|i18n('latte-ui', [column.label])" @click="sortBy(column.field)">
							<Icon name="sort-ascending" v-if="sort.by === column.field && sort.order === 'ASC'"/>
							<Icon name="sort-descending" v-else-if="sort.by === column.field && sort.order === 'DESC'"/>
							<Icon name="sort" v-else/>
						</button>
					</div>
				</th>
				<th v-if="hasActions" :style="{'width': actionsWidth + 'px'}">
					<div class="column-content"><span>&nbsp;</span></div>
				</th>
			</slot>
		</tr>

		<tr class="search-row" v-if="showSearch">
			<slot name="data-search" :columns="columns" :is-loading="isLoading" :is-selection-mode="isSelectionMode" :search="search" :selection="selection" :select-mode="selectMode" :unique-id="uniqueId">
				<th v-if="isSelectionMode" style="width:42px"></th>
				<th v-for="column in columns" :data-field="column.field" :style="{'width': (column.width ? column.width + 'px' : 'auto') }">
					<input v-if="column.is_searchable" type="search" :placeholder="'Search'|i18n('latte-ui')" :aria-label="'Search by @0'|i18n('data-table', [column.label])" v-model.lazy="params[column.field]" @keydown.enter="search(column.field, $event.target.value, $event)"/>
				</th>
				<th v-if="hasActions"></th>
			</slot>
		</tr>

		<tr v-if="filters.length > 0">
			<td :colspan="amountOfColumns">
				<div class="column-content flex-row justify-content-start">

					<template v-for="(filter, filterKey) of filters">
						<span class="badge mr-1" :class="filter.class">
							<span>{{ filter.label }}</span>
							<button class="btn" @click="removeFilter($event, filterKey)">
								<Icon name="close"/>
							</button>
						</span>
					</template>

				</div>
			</td>
		</tr>

		</thead>
		<tbody>

		<tr v-for="(row, rowKey) in data">
			<slot name="data-row" :actions="actions" :columns="columns" :has-actions="hasActions" :is-loading="isLoading" :row="row" :row-key="rowKey" :is-selection-mode="isSelectionMode" :selection="selection" :select-mode="selectMode" :unique-id="uniqueId">
				<td v-if="isSelectionMode" style="width:42px;z-index:1">
					<label class="column-content pr-0">
						<input type="radio" class="radio-button radio-button-primary mr-0" :id="uniqueId + ':' + row.id" :name="name" :value="row.id" v-if="selectMode === 'single'" v-model="selection"/>
						<input type="checkbox" class="checkbox checkbox-primary mr-0" :id="uniqueId + ':' + row.id" :name="name + '[]'" :value="row.id" v-if="selectMode === 'multiple'" v-model="selection"/>
					</label>
				</td>

				<template v-for="(column, columnKey) in columns">
					<td :data-field="column.field" :data-row="rowKey" :data-column="columnKey" :style="{'width': (column.width ? column.width + 'px' : 'auto') }">
						<component :is="createRowColumn(row, column)"></component>
					</td>
				</template>

				<latte-data-table-actions :actions="actions" :row="row" v-if="hasActions"></latte-data-table-actions>
			</slot>
		</tr>

		</tbody>
		<tfoot>

		<tr v-if="total > limit">
			<th :colspan="amountOfColumns">
				<div class="column-content">
					<latte-pagination controller-bar :limit="limit" :offset="offset" :total="total" @limit="setLimit" @navigate="navigateToOffset"></latte-pagination>
				</div>
			</th>
		</tr>

		</tfoot>
	</table>

</template>

<script>

	import Vue from "vue";

	import { on } from "../../js/core/action";
	import { id, request } from "../../js/core/api";
	import { closest, createElement } from "../../js/util/dom";
	import { isNullOrWhitespace } from "../../js/util/string";
	import { handleError } from "../../js/core";
	import { oneOf } from "../../js/helper/array";
	import Icon from "./base/Icon.vue";

	const badgesHTML = `	<template v-for="badge of (row.badges || [])">
											<a class="badge ml-2" :class="['badge-' + badge.type]" @click="applyFilter($event, badge.filter, badge.type)" v-if="badge.filter !== null">{{ badge.message }}</a>
											<span class="badge ml-2" :class="['badge-' + badge.type]" v-if="badge.filter === null">{{ badge.message }}</span>
										</template>`;

	const columnDefaults = {
		is_searchable: false,
		is_sortable: false,
		width: 0
	};

	/**
	 * Returns an url data source for data-table.
	 *
	 * @param {String} url
	 * @returns {Promise<Latte.iid.DataTableDataSourceData>}
	 * @author Bas Milius <bas@mili.us>
	 * @version 1.8.0
	 */
	function urlDataSource(url)
	{
		return new Promise(resolve =>
		{
			request(url)
				.then(r => r.json())
				.then(r => r.data)
				.then(response => resolve({
					actions: response.actions,
					columns: response.columns,
					initial_data: response.initial_data,
					limit: response.limit,
					offset: response.offset,

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

						return new Promise(resolve => request(`${url}/data?${queryString}`)
							.then(r => r.json())
							.then(r => resolve(r.data))
							.catch(err => handleError(err)));
					}
				}))
				.catch(err => handleError(err));
		});
	}

	export default {

		components: {Icon},

		name: "latte-data-table",

		props: {
			addSpinnerToParent: {default: false, type: Boolean},
			dataSource: {default: null, required: true, type: Function | String | null},
			defaultLimit: {default: 20, type: Number},
			name: {default: () => id(), type: String},
			numColumns: {default: null, type: Number | null},
			selectMode: {default: "none", type: String, validator: oneOf(["none", "single", "multiple"])},
			showHeader: {default: true, type: Boolean},
			showSearch: {default: true, type: Boolean},
			showSorting: {default: true, type: Boolean},
			value: {default: () => [], type: Array | Number}
		},

		beforeDestroy()
		{
			if (this.spinner !== null)
				this.spinner.remove();

			this.subscriptions.refresh.unsubscribe();
		},

		data()
		{
			return {
				subscriptions: {
					refresh: null
				},
				isLoading: false,
				actions: [],
				columns: [],
				data: [],
				dsi: undefined,
				filters: [],
				limit: this.defaultLimit,
				notice: undefined,
				offset: 0,
				pagination: [],
				params: {},
				selection: this.value,
				sort: {
					by: "",
					order: 'DESC'
				},
				spinner: null,
				total: 0,
				uniqueId: id()
			};
		},

		mounted()
		{
			this.subscriptions.refresh = on("data-tables:refresh", () => this.reload());

			this.addSpinner();
		},

		computed: {

			actionsWidth()
			{
				return 52;
			},

			amountOfColumns()
			{
				if (this.numColumns !== null)
					return this.numColumns + (this.hasActions ? 1 : 0) + (this.isSelectionMode ? 1 : 0);

				return this.columns.length + (this.hasActions ? 1 : 0) + (this.isSelectionMode ? 1 : 0);
			},

			hasActions()
			{
				return this.actions && this.actions.length > 0;
			},

			isSelectionMode()
			{
				return this.selectMode !== "none";
			}

		},

		methods: {

			addFilter(filter)
			{
				for (let i in this.filters)
					if (this.filters.hasOwnProperty(i))
						if (this.filters[i].property === filter.property && this.filters[i]["value"] === filter["value"])
							return;

				this.offset = 0;

				filter.class = filter.class || "badge-info";

				this.filters.push(filter);
				this.loadData();
			},

			addSpinner()
			{
				if (!this.addSpinnerToParent)
					return;

				this.spinner = createElement("span", span => span.classList.add("spinner", "spinner-primary"));
				closest(this.$el, ".panel").append(this.spinner);
			},

			removeFilter(evt, filterKey)
			{
				this.offset = 0;

				this.filters.splice(filterKey, 1);
				this.loadData();

				evt.preventDefault();
				evt.stopPropagation();
			},

			createRowColumn(row, column)
			{
				const $this = this;
				const uniqueId = this.uniqueId;

				column.template = column.template.replace(`<slot name="badges"></slot>`, badgesHTML);

				return Vue.extend({

					template: column.template,

					data()
					{
						return {column, row, uniqueId};
					},

					methods: {

						addFilter(property, value, label = undefined, filterClass = "primary")
						{
							label = label || value;

							$this.addFilter({property, value, label, class: filterClass});
						},

						applyFilter(evt, filter, filterClass)
						{
							filter.class = `badge-${filterClass}`;
							$this.addFilter(filter);

							evt.preventDefault();
							evt.stopPropagation();
						}

					}

				});
			},

			loadData()
			{
				this.isLoading = true;

				const filters = {};
				const params = {};
				const sorting = this.sort.by.trim() !== "" ? {order: this.sort.order, by: this.sort.by} : null;

				for (let key in this.params)
					if (this.params.hasOwnProperty(key) && !isNullOrWhitespace(this.params[key]))
						params[key] = encodeURIComponent(this.params[key]);

				for (let i in this.filters)
					if (this.filters.hasOwnProperty(i))
						if (!isNullOrWhitespace(this.filters[i].value.toString()))
							filters[this.filters[i].property] = this.filters[i]["value"];

				this.dsi.requestData(this.offset, this.limit, filters, params, sorting)
					.then(r => this.onReceivedData(r))
					.catch(err => handleError(err));
			},

			loadSetup()
			{
				this.isLoading = true;

				this.actions = this.dsi.actions;
				this.columns = this.dsi.columns.map(column => Object.assign({}, columnDefaults, column));

				if (this.dsi.sorting !== undefined)
					this.sort = this.dsi.sorting;

				if (this.dsi.initial_data !== undefined)
					this.onReceivedData(this.dsi.initial_data);
				else
					this.loadData();
			},

			navigateToOffset(offset)
			{
				this.offset = offset;
				this.loadData();
			},

			onReceivedData(response)
			{
				if (!response)
					return handleError(new Error("Response is invalid."));

				this.data = response.data;
				this.pagination = response.pagination;
				this.total = response.total || 0;

				this.isLoading = false;
			},

			reload()
			{
				this.loadData();
			},

			search(field, value, evt)
			{
				if (evt)
				{
					evt.preventDefault();
					evt.stopPropagation();
				}

				this.params[field] = value;
				this.offset = 0;
				this.loadData();
			},

			setLimit(limit)
			{
				this.limit = limit;
				this.offset = 0;
				this.loadData();
			},

			sortBy(field)
			{
				if (this.sort.by === field)
				{
					this.sort.order = this.sort.order === "DESC" ? "ASC" : "DESC";
				}
				else
				{
					this.sort.by = field;
					this.sort.order = "ASC";
				}

				this.loadData();
			}

		},

		watch: {

			dataSource: {
				deep: true,
				immediate: true,
				handler()
				{
					if (this.dataSource === undefined)
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

							this.loadSetup();
							resolve();
						});
					});
				}
			},

			isLoading()
			{
				this.$emit("loading", this.isLoading);

				if (!this.addSpinnerToParent)
					return;

				const parent = closest(this.$el, ".panel");

				if (this.isLoading)
					parent.classList.add("is-loading");
				else
					parent.classList.remove("is-loading");
			},

			selection()
			{
				this.$emit("input", this.selection);
			},

			value()
			{
				this.selection = this.value;
			}

		}

	}

</script>
