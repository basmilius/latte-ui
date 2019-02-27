<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
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

						<latte-sorting-button v-if="showSorting && column.is_sortable" :is-sorting="sort.by === column.field" :is-sorting-ascending="sort.order === 'ASC'" button-class="btn btn-icon btn-text btn-dark btn-sm ml-1" :aria-label="'Sort by @0'|i18n('data-table', [column.label])" @click="sortBy(column.field)"></latte-sorting-button>
					</div>
				</th>
				<th v-if="hasActions" :style="{'width': actionsWidth + 'px'}"></th>
			</slot>
		</tr>

		<tr class="search-row" v-if="showSearch">
			<slot name="data-search" :columns="columns" :is-loading="isLoading" :is-selection-mode="isSelectionMode" :search="search" :selection="selection" :select-mode="selectMode" :unique-id="uniqueId">
				<th v-if="isSelectionMode" style="width:42px"></th>
				<th v-for="column in columns" :data-field="column.field" :style="{'width': (column.width ? column.width + 'px' : 'auto') }">
					<input v-if="column.is_searchable" type="search" :placeholder="'Search'|i18n('data-table')" :aria-label="'Search by @0'|i18n('data-table', [column.label])" @keydown.enter="search(column.field, $event.target.value, $event)"/>
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
							<button class="btn" @click="removeFilter($event, filterKey)"><i class="mdi mdi-window-close"></i></button>
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
					<div class="column-content pr-0">
						<input type="radio" class="radio-button radio-button-primary mr-0" :id="uniqueId + ':' + row.id" :name="name" :value="row.id" v-if="selectMode === 'single'" v-model="selection"/>
						<input type="checkbox" class="checkbox checkbox-primary mr-0" :id="uniqueId + ':' + row.id" :name="name + '[]'" :value="row.id" v-if="selectMode === 'multiple'" v-model="selection"/>
					</div>
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
		<tr v-if="pagination.length > 0">
			<th :colspan="amountOfColumns">
				<div class="column-content">
					<latte-pagination :pagination="pagination" @navigate="loadPage"></latte-pagination>
				</div>
			</th>
		</tr>
		</tfoot>
	</table>

</template>

<script>

	import Vue from "vue";

	import { handleError } from "../../js/core";
	import { on } from "../../js/core/action";
	import { id, request } from "../../js/core/api";
	import { createElement } from "../../js/util/dom";
	import { isNullOrWhitespace } from "../../js/util/string";

	export default {

		name: "latte-data-table",

		props: {

			addSpinnerToParent: {
				default: false,
				required: false,
				type: Boolean
			},

			limit: {
				default: 20,
				required: false,
				type: Number
			},

			name: {
				default: () => id(),
				required: false,
				type: String
			},

			numColumns: {
				default: null,
				required: false,
				type: Number | null
			},

			selectMode: {
				default: "none",
				required: false,
				type: String,
				validator: value => ["none", "single", "multiple"].indexOf(value) > -1
			},

			showHeader: {
				default: true,
				required: false,
				type: Boolean
			},

			showSearch: {
				default: true,
				required: false,
				type: Boolean
			},

			showSorting: {
				default: true,
				required: false,
				type: Boolean
			},

			url: {
				required: true,
				type: String
			},

			value: {
				default: () => [],
				required: false,
				type: Array | Number
			}

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
				defaults: {
					column: {
						is_searchable: false,
						is_sortable: false
					},
					mock: {
						field: "",
						sorting: {
							by: "",
							order: ""
						}
					}
				},
				subscriptions: {
					refresh: null
				},
				isLoading: false,
				actions: [],
				columns: [],
				data: [],
				filters: [],
				page: 1,
				pagination: [],
				params: {},
				selection: this.value,
				sort: {
					by: "",
					order: 'DESC'
				},
				spinner: null,
				uniqueId: id()
			};
		},

		mounted()
		{
			this.subscriptions.refresh = on("data-tables:refresh", () => this.reload());

			this.addSpinner();
			this.loadSetup();
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

				this.page = 1;

				filter.class = filter.class || "badge-info";

				this.filters.push(filter);
				this.loadFromUrl();
			},

			addSpinner()
			{
				if (!this.addSpinnerToParent)
					return;

				this.spinner = createElement("span", span => span.classList.add("spinner", "spinner-primary"));
				this.$el.parentNode.append(this.spinner);
			},

			removeFilter(evt, filterKey)
			{
				this.page = 1;

				this.filters.splice(filterKey, 1);
				this.loadFromUrl();

				evt.preventDefault();
				evt.stopPropagation();
			},

			createRowColumn(row, column)
			{
				const $this = this;
				const uniqueId = this.uniqueId;

				const badgesHTML = `	<template v-for="badge of (row.badges || [])">
											<a class="badge ml-2" :class="['badge-' + badge.type]" @click="applyFilter($event, badge.filter, badge.type)" v-if="badge.filter !== null">{{ badge.message }}</a>
											<span class="badge ml-2" :class="['badge-' + badge.type]" v-if="badge.filter === null">{{ badge.message }}</span>
										</template>`;

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

			loadFromUrl()
			{
				this.isLoading = true;

				let url = `${this.url}/data?offset=${(this.page - 1) * this.limit}&limit=${this.limit}`;

				if (this.sort.by.trim() !== "")
					url += `&sort=${this.sort.order}&by=${this.sort.by}`;

				for (let key in this.params)
					if (this.params.hasOwnProperty(key) && !isNullOrWhitespace(this.params[key]))
						url += `&${key}=${encodeURIComponent(this.params[key])}`;

				for (let i in this.filters)
					if (this.filters.hasOwnProperty(i))
						if (!isNullOrWhitespace(this.filters[i].value.toString()))
							url += `&filter[${this.filters[i].property}]=${this.filters[i]["value"]}`;

				request(url)
					.then(r => r.json())
					.then(this.onReceivedData)
					.catch(err => handleError(err));
			},

			loadPage(page)
			{
				this.page = page;
				this.loadFromUrl();
			},

			loadSetup()
			{
				this.isLoading = true;

				request(`${this.url}?limit=${this.limit}`)
					.then(r => r.json())
					.then(this.onReceivedSetupResponse)
					.catch(err => handleError(err));
			},

			onReceivedData(response)
			{
				this.data = response.data.data;
				this.pagination = response.data.pagination;

				this.isLoading = false;
			},

			onReceivedSetupResponse(response)
			{
				this.actions = response.data.actions;
				this.columns = response.data.columns.map(column => Object.assign({}, this.defaults.column, column));

				if (response.data.sorting !== undefined)
				{
					this.sort.by = response.data.sorting.by;
					this.sort.order = response.data.sorting.order;
				}

				if (response.data.initial_data !== undefined)
					this.onReceivedData({data: response.data.initial_data});
				else
					this.loadFromUrl();
			},

			reload()
			{
				this.loadFromUrl();
			},

			search(field, value, evt)
			{
				if (evt)
				{
					evt.preventDefault();
					evt.stopPropagation();
				}

				this.params[field] = value;
				this.page = 1;
				this.loadFromUrl();
			},

			sortBy(field)
			{
				if (this.sort.by === field)
					this.sort.order = this.sort.order === "DESC" ? "ASC" : "DESC";

				this.sort.by = field;
				this.loadFromUrl();
			}

		},

		watch: {

			isLoading()
			{
				this.$emit("loading", this.isLoading);

				if (!this.addSpinnerToParent)
					return;

				const parent = this.$el.parentNode;

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
