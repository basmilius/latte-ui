<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="input-group" :disabled="disabled" :class="{'is-loading': isLoading}">

		<template v-for="selection in values">

			<slot name="selection" v-bind="selection">
				<div class="badge badge-primary">
					<span>{{ selection.label }}</span>
					<button class="btn" @click="selection.remove()"><Icon name="close"/></button>
				</div>
			</slot>

		</template>

		<input type="search" :name="name" :disabled="disabled" class="form-control" ref="field" :placeholder="placeholder" autocomplete="false" @focus="onFocus" v-model="searchTerm" @keydown.delete="onKeyPressDelete" @keydown.enter="onSelectSuggestion" @keydown.tab="onSelectFirstSuggestion" @keydown.down="onKeyPressDown" @keydown.up="onKeyPressUp" v-if="canSearch"/>

		<div class="popup" :class="{'is-open': shouldOpenSuggestions}" role="combobox">
			<div class="popup-body">
				<nav class="nav nav-list">
					<template v-for="(suggestion, index) in suggestionsFiltered">

						<a class="nav-link" :class="{'is-hover': currentSuggestion === index}" @pointermove.passive="currentSuggestion = index" @click="onSelectSuggestion" role="option">
							<slot name="suggestion" v-bind="suggestion">
								<div class="flex-grow-1" v-if="suggestion.sub_label">
									<span>{{ suggestion.label }}</span>
									<span class="text-soft">{{ suggestion.sub_label }}</span>
								</div>

								<span v-else>{{ suggestion.label }}</span>

								<Icon name="chevron-right"/>
							</slot>
						</a>

					</template>
				</nav>
			</div>
		</div>

		<span class="spinner spinner-primary"></span>

	</div>

</template>

<script>

	import { id, request } from "../../js/core/api";
	import { handleError } from "../../js/core";
	import Icon from "./base/Icon.vue";

	function areArraysEqual(a, b)
	{
		if (a.length !== b.length)
			return false;

		for (let i = 0; i < a.length; i++)
			if (a[i] !== b[i])
				return false;

		return true;
	}

	/**
	 * Returns an url data source for autocomplete.
	 *
	 * @param {String} url
	 * @returns {Latte.iid.AutocompleteDataSourceMethods}
	 * @author Bas Milius <bas@mili.us>
	 * @version 1.8.0
	 */
	function urlDataSource(url)
	{
		let abortController = null;

		function reset()
		{
			if (abortController !== null)
				abortController.abort();

			abortController = new AbortController();
		}

		return {
			getEntries(ids)
			{
				return new Promise(resolve =>
				{
					reset();

					request(`${url}?ids=${ids.join(",")}`, {cache: "no-cache", signal: abortController.signal})
						.then(r => r.json())
						.then(r =>
						{
							abortController = null;
							resolve(r.data);
						});
				});
			},

			getSuggestions(query, offset, limit)
			{
				return new Promise(resolve =>
				{
					reset();

					request(`${url}?q=${encodeURI(query)}&offset=${offset}&limit=${limit}`, {cache: "no-cache", signal: abortController.signal})
						.then(r => r.json())
						.then(r =>
						{
							abortController = null;
							resolve(r.data);
						})
						.catch(() => resolve([]));
				});
			}
		};
	}

	export default {

		components: {Icon},

		name: "latte-autocomplete",

		props: {
			dataSource: {default: null, required: true, type: Function | String | null},
			defaultValue: {default: undefined},
			disabled: {default: false, type: Boolean},
			limit: {default: 5, type: Number},
			multiSelect: {default: false, type: Boolean},
			name: {default: id(), type: String},
			offset: {default: 0, type: Number},
			placeholder: {default: "Search...", type: String},
			value: {default: () => [], type: Array | Number}
		},

		beforeDestroy()
		{
			this.$el.removeOutsideEventListener("click", this.onBlur);
		},

		data()
		{
			return {
				canEmit: true,
				canOpen: false,
				dsi: null,
				isLoading: false,
				currentSuggestion: -1,
				searchTerm: "",
				suggestions: [],
				valueLast: [],
				values: []
			};
		},

		mounted()
		{
			this.$el.addOutsideEventListener("click", this.onBlur);
		},

		computed: {

			canSearch()
			{
				return this.multiSelect || this.values.length === 0;
			},

			shouldOpenSuggestions()
			{
				return this.canOpen && this.suggestionsFiltered.length > 0;
			},

			suggestionsFiltered()
			{
				return this.suggestions.filter(s => this.values.filter(v => v.label === s.label && v.value === s.value).length === 0);
			}

		},

		methods: {

			addValue(label, value)
			{
				if (!label || !value)
					return;

				if (this.values.filter(v => v.value === value).length > 0)
					return;

				const remove = () => this.removeValue(value);

				this.values.push({label, remove, value});
			},

			removeValue(value)
			{
				this.canEmit = true;
				this.values = this.values.filter(v => v.value !== value);
			},

			loadDataSource()
			{
				this.onValueChanged();
			},

			onBlur()
			{
				this.canOpen = false;
			},

			onFocus()
			{
				this.suggestions = [];
				this.canOpen = true;
			},

			onSelectSuggestion()
			{
				if (!this.suggestionsFiltered[this.currentSuggestion])
					return;

				const {label, value} = this.suggestionsFiltered[this.currentSuggestion];

				this.addValue(label, value);
				this.canOpen = false;
				this.searchTerm = "";

				this.$refs.field.focus();
			},

			onSelectFirstSuggestion(evt)
			{
				if (this.suggestions.length === 0 || !this.shouldOpenSuggestions)
					return;

				if (this.currentSuggestion === -1)
					this.onKeyPressDown();

				this.onSelectSuggestion();

				evt.preventDefault();
				evt.stopPropagation();
			},

			onKeyPressDelete()
			{
				if (this.searchTerm !== "")
					return;

				this.values.pop();
			},

			onKeyPressDown()
			{
				if (this.currentSuggestion + 1 >= this.suggestions.length)
					this.currentSuggestion = -1;
				else
					this.currentSuggestion++;
			},

			onKeyPressUp()
			{
				if (this.currentSuggestion - 1 < -1)
					this.currentSuggestion = this.suggestions.length - 1;
				else
					this.currentSuggestion--;
			},

			onReceiveSuggestions(suggestions)
			{
				this.canOpen = true;
				this.currentSuggestion = -1;
				this.suggestions = suggestions || [];
			},

			onReceiveValues(values)
			{
				values.filter(v => !!v).forEach(v => this.addValue(v.label, v.value));
				this.canEmit = true;
				this.isLoading = false;
			},

			onSearchTermChanged()
			{
				if (this.searchTerm.trim() === "")
				{
					this.currentSuggestion = -1;
					this.canOpen = false;
					return;
				}

				this.dsi.getSuggestions(this.searchTerm, this.offset, this.limit)
					.then(r => this.onReceiveSuggestions(r))
					.catch(err => handleError(err));
			},

			onValueChanged()
			{
				let value = (this.multiSelect ? this.value : [this.value])
					.filter(v => typeof v === "number");

				if (value.length === 0)
				{
					this.values = [];
					this.valueLast = [];
					return;
				}

				if (areArraysEqual(value, this.valueLast))
					return;

				this.isLoading = true;
				this.valueLast = value;

				this.dsi.getEntries(value)
					.then(r => this.onReceiveValues(r))
					.catch(err => handleError(err));
			}

		},

		watch: {

			dataSource: {
				deep: true,
				immediate: true,
				handler()
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

							this.loadDataSource();
							resolve();
						});
					});
				}
			},

			shouldOpenSuggestions()
			{
				this.currentSuggestion = -1;
			},

			searchTerm()
			{
				this.onSearchTermChanged();
			},

			value()
			{
				this.canEmit = false;
				this.onValueChanged();
				this.$nextTick(() => this.canEmit = true);
			},

			values()
			{
				if (this.canEmit === false)
					return this.canEmit = true;

				let values = this.values.map(v => v.value);
				this.$emit("input", (this.multiSelect ? values : (values.length === 1 ? values[0] : this.defaultValue)));
			}

		}

	}

</script>
