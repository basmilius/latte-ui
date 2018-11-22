<template>

	<table class="table table-hover mb-0">
		<thead>
		<tr v-if="show.header">
			<th v-if="showSelections" style="width:42px"></th>
			<th v-for="column in columns" :data-field="column.field" :style="{'min-width': (column.width && column.width !== null ? column.width + 'px' : 'auto'), 'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }">
				<div class="column-content flex-row align-items-center justify-content-start">
					<span>{{ column.label }}</span>

					<button v-if="show.sorting && column.is_sortable" :aria-label="i18n.sortOn.replace('@0', column.label)" class="btn btn-text btn-icon btn-dark btn-sm ml-1" @click="sortBy(column.field)">
						<i class="mdi latte-sorting none" v-if="sort.by !== column.field"></i>
						<i class="mdi latte-sorting down" v-else-if="sort.order === 'ASC'"></i>
						<i class="mdi latte-sorting up" v-else-if="sort.order === 'DESC'"></i>
					</button>
				</div>
			</th>
			<th v-if="actions.length > 0" :style="{'width': actionsWidth + 'px'}"></th>
		</tr>

		<tr class="search-row" v-if="show.search">
			<th v-if="showSelections" style="width:42px"></th>
			<th v-for="column in columns" :data-field="column.field" :style="{'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }">
				<input v-if="column.is_searchable" type="search" placeholder="Zoeken" @keydown.enter="search(column.field, $event.target.value, $event)"/>
			</th>
			<th></th>
		</tr>

		<tr v-if="filters.length > 0">
			<td :colspan="columns.length + (actions.length > 0 ? 1 : 0) + (showSelections ? 1 : 0)">
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
			<td v-if="showSelections" style="width:42px;z-index:1">
				<div class="column-content pr-0">
					<input type="radio" class="radio-button radio-button-primary mr-0" :id="uniqueId + ':' + row.id" :name="name" :value="row.id" v-if="selectMode === 'single'" v-model="selection"/>
					<input type="checkbox" class="checkbox checkbox-primary mr-0" :id="uniqueId + ':' + row.id" :name="name + '[]'" :value="row.id" v-if="selectMode === 'multiple'" v-model="selection"/>
				</div>
			</td>

			<template v-for="(column, columnKey) in columns">
				<td :data-field="column.field" :data-row="rowKey" :data-column="columnKey" :style="{'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }">
					<component :is="createRowColumn(row, column)"></component>
				</td>
			</template>

			<td class="actions" v-if="actions.length > 0">
				<div class="column-content flex-row align-items-center pl-0">
					<latte-button-dropdown :aria-label="i18n.more" icon="dots-vertical" :small="true">
						<nav class="nav nav-list">
							<component data-close v-for="(action, actionKey) in actions" :is="createAction(action, row)" :key="actionKey"></component>
						</nav>
					</latte-button-dropdown>
				</div>
			</td>
		</tr>
		</tbody>
		<tfoot>
		<tr v-if="show.footer">
			<th v-if="showSelections" style="width:42px"></th>
			<th v-for="column in columns" :data-field="column.field">
				<div class="column-content">{{ column.label }}</div>
			</th>
			<th></th>
		</tr>

		<tr v-if="pagination.length > 0">
			<th :colspan="columns.length + (actions.length > 0 ? 1 : 0) + (showSelections ? 1 : 0)">
				<div class="column-content">
					<latte-pagination :pagination="pagination" @navigate="loadPage"></latte-pagination>
				</div>
			</th>
		</tr>
		</tfoot>
	</table>

</template>

<script>

	import { id, request } from "../../js/api";
	import { handleError } from "../../js/core";
	import { closest } from "../../js/util/dom";
	import { isNullOrWhitespace } from "../../js/util/string";
	import { forObject } from "../../js/i18n";

	export default {

		name: "latte-data-table",

		props: {

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

			selectMode: {
				default: "none",
				required: false,
				type: String,
				validator: value => ["none", "single", "multiple"].indexOf(value) > -1
			},

			showFooter: {
				default: false,
				required: false,
				type: Boolean
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
		},

		created()
		{
			this.i18n = forObject(this.i18n, "root");
		},

		data()
		{
			return {
				defaults: {
					column: {
						is_searchable: false,
						is_sortable: false
					}
				},
				i18n: {
					more: "More options",
					sortOn: "Sort by @0"
				},
				isLoading: false,
				actions: [],
				columns: [],
				data: [],
				filters: [],
				page: 1,
				pagination: [],
				params: {},
				panel: null,
				selection: this.value,
				sort: {
					by: "",
					order: 'DESC'
				},
				spinner: null,
				show: {
					footer: this.showFooter,
					header: this.showHeader,
					search: this.showSearch,
					sorting: this.showSorting
				},
				uniqueId: id()
			};
		},

		mounted()
		{
			this.panel = closest(this.$el, "div.panel");

			Latte.actions.on("data-tables:refresh", () => this.reload());

			this.loadSpinner();
			this.loadSetup();
		},

		computed: {

			actionsWidth()
			{
				return 52;
			},

			showSelections()
			{
				return this.selectMode !== "none";
			}

		},

		methods: {

			addFilter(filter)
			{
				for (let f of this.filters)
					if (f["property"] === filter["property"] && f["value"] === filter["value"])
						return;

				this.page = 1;

				filter.class = filter.class || "badge-info";

				this.filters.push(filter);
				this.loadFromUrl();
			},

			removeFilter(evt, filterKey)
			{
				this.page = 1;

				this.filters.splice(filterKey, 1);
				this.loadFromUrl();

				evt.preventDefault();
				evt.stopPropagation();
			},

			createAction(action, row)
			{
				return Vue.extend({

					template: action.template,

					data()
					{
						return {
							action: action,
							row: row
						};
					}

				});
			},

			createRowColumn(row, column)
			{
				const $this = this;
				const badgesHTML = `	<template v-for="badge of (row.badges || [])">
											<a class="badge ml-2" :class="['badge-' + badge.type]" @click="applyFilter($event, badge.filter, badge.type)" v-if="badge.filter !== null">{{ badge.message }}</a>
											<span class="badge ml-2" :class="['badge-' + badge.type]" v-if="badge.filter === null">{{ badge.message }}</span>
										</template>`;

				column.template = column.template.replace(`<slot name="badges"></slot>`, badgesHTML);

				return Vue.extend({

					template: column.template,

					data()
					{
						return {
							column: column,
							row: row,
							uniqueId: $this.uniqueId
						};
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
						},

						moment()
						{
							return moment(...arguments);
						},

						utc()
						{
							return moment.utc(...arguments);
						}

					}

				});
			},

			loadFromUrl()
			{
				this.data = [];
				this.pagination = [];

				this.isLoading = true;

				let url = `${this.url}/data?offset=${(this.page - 1) * this.limit}&limit=${this.limit}`;

				if (this.sort.by.trim() !== "")
					url += `&sort=${this.sort.order}&by=${this.sort.by}`;

				for (let key in this.params)
					if (this.params.hasOwnProperty(key) && !isNullOrWhitespace(this.params[key]))
						url += `&${key}=${encodeURIComponent(this.params[key])}`;

				for (let filter of this.filters)
					if (!isNullOrWhitespace(filter.value.toString()))
						url += `&filter[${filter["property"]}]=${filter["value"]}`;

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
				request(this.url)
					.then(r => r.json())
					.then(this.onReceivedSetupResponse)
					.catch(err => handleError(err));
			},

			loadSpinner()
			{
				if (this.panel === null)
					return;

				if (this.panel.querySelectorAll("span.spinner").length > 0)
					return;

				let spinner = this.spinner = document.createElement("span");
				spinner.classList.add("spinner", "spinner-primary");

				this.panel.appendChild(spinner);
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

				if (typeof response.data.sorting !== "undefined")
				{
					this.sort.by = response.data.sorting.by;
					this.sort.order = response.data.sorting.order;
				}

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

				if (this.panel === null)
					return;

				if (this.isLoading)
					this.panel.classList.add("is-loading");
				else
					this.panel.classList.remove("is-loading");
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
