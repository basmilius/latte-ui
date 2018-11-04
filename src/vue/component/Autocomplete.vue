<template>

	<div class="latte-autocomplete" v-click-away="onBlur">
		<div class="form-control" :disabled="disabled">
			<span class="badge badge-primary" v-for="val in values"><span>{{ val.label }}</span><button class="btn" @click="removeValue(val.value)"><i class="mdi mdi-window-close"></i></button></span>
			<input type="search" :name="name" class="form-control" ref="field" :placeholder="placeholder" autocomplete="false" @focus="onFocus" v-model="searchTerm" @keydown.delete="onKeyPressDelete" @keydown.enter="onSelectSuggestion" @keydown.tab="onSelectFirstSuggestion" @keydown.down="onKeyPressDown" @keydown.up="onKeyPressUp" v-if="canSearch"/>
		</div>
		<div class="dropdown" :class="{'is-open': shouldOpenSuggestions}" role="combobox">
			<nav class="nav nav-list">

				<template v-for="(suggestion, index) in suggestionsFiltered">
					<a class="nav-link" :class="{'is-hover': currentSuggestion === index}" @pointermove.passive="currentSuggestion = index" @click="onSelectSuggestion" role="option">
						<span>{{ suggestion.label }} <span class="sub-label" v-if="suggestion.sub_label">{{ suggestion.sub_label }}</span></span>
						<i class="mdi mdi-chevron-right"></i>
					</a>
				</template>

			</nav>
		</div>
		<span class="spinner spinner-primary" v-if="isLoading"></span>
	</div>

</template>

<script>

	import { id, request } from "../../js/api";

	function areArraysEqual(a, b)
	{
		if (a.length !== b.length)
			return false;

		for (let i = 0; i < a.length; i++)
			if (a[i] !== b[i])
				return false;

		return true;
	}

	export default {

		name: "latte-autocomplete",

		props: {

			defaultValue: {
				default: undefined,
				required: false
			},

			disabled: {
				default: false,
				required: false,
				type: Boolean
			},

			limit: {
				default: 5,
				required: false,
				type: Number
			},

			multiSelect: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				default: id(),
				required: false,
				type: String
			},

			offset: {
				default: 0,
				required: false,
				type: Number
			},

			placeholder: {
				default: "Search...",
				required: false,
				type: String
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

		data()
		{
			return {
				abortController: null,
				canEmit: true,
				canOpen: false,
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
			this.onValueChanged();
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
				if (label === undefined || value === undefined)
					return;

				if (this.values.filter(v => v.value === value && v.label === label).length > 0)
					return;

				this.values.push({label, value});
			},

			removeValue(value)
			{
				this.values = this.values.filter(v => v.value !== value);
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
			},

			onSelectFirstSuggestion(evt)
			{
				if (this.suggestions.length === 0 || !this.shouldOpenSuggestions)
					return;

				if (this.currentSuggestion > -1)
					return;

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

			onReceiveSuggestions(response)
			{
				this.abortController = null;
				this.canOpen = true;
				this.currentSuggestion = -1;
				this.suggestions = response.data;
			},

			onReceiveValues(response)
			{
				this.values = response.data;
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

				if (this.abortController !== null)
				{
					this.abortController.abort();
					this.abortController = null;
				}

				this.abortController = new AbortController();

				request(`${this.url}?q=${encodeURIComponent(this.searchTerm.toLowerCase())}`, {cache: "no-cache", signal: this.signal})
					.then(r => r.json())
					.then(r => this.onReceiveSuggestions(r))
					.catch(err => console.error(err));
			},

			onValueChanged()
			{
				let value = this.multiSelect ? this.value : [this.value];
				value = value.filter ? value.filter(v => v > 0) : value;

				if (value.length === 0)
				{
					this.values = [];
					this.valueLast = [];
					return;
				}

				if (areArraysEqual(value, this.valueLast))
					return;

				if (this.isLoading)
					return;

				this.isLoading = true;

				request(`${this.url}?ids=${value.join(",")}`)
					.then(r => r.json())
					.then(r => this.onReceiveValues(r))
					.catch(err => console.error(err));

				this.valueLast = value;
			}

		},

		watch: {

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
			},

			values()
			{
				if (this.canEmit === false)
					return this.canEmit = true;

				let values = this.values.map(v => v.value);
				this.$emit("input", (this.multiSelect ? values : values[0]) || this.defaultValue);
			}

		}

	}

</script>
