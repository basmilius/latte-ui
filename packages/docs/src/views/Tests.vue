<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page mb-3" id="tests" v-if="!testEditor">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Window</span></div>
						<div class="panel-body">

							<button class="btn btn-outline btn-primary btn-icon" ref="windowButton"><i class="mdi mdi-dots-horizontal"></i></button>

							<latte-popup :associate-with="$refs.windowButton" :margin-x="-9">
								<latte-window>
									<template v-slot="{navigate}">

										<nav class="nav nav-list" style="min-width: 210px">
											<a class="nav-link" @click="navigate(1)"><i class="mdi mdi-chevron-right"></i><span>Sub</span></a>
											<a class="nav-link" @click="navigate(3)"><i class="mdi mdi-chevron-right"></i><span>Sub 2</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
										</nav>

										<nav class="nav nav-list" style="min-width: 210px">
											<a class="nav-link" @click="navigate(0)"><i class="mdi mdi-chevron-left"></i><span>Previous</span></a>
											<a class="nav-link" @click="navigate(2)"><i class="mdi mdi-chevron-right"></i><span>Sub</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
										</nav>

										<nav class="nav nav-list" style="min-width: 210px">
											<a class="nav-link" @click="navigate(1)"><i class="mdi mdi-chevron-left"></i><span>Previous</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
										</nav>

										<nav class="nav nav-list" style="min-width: 210px">
											<a class="nav-link" @click="navigate(0)"><i class="mdi mdi-chevron-left"></i><span>Previous</span></a>
											<a class="nav-link"><span>Item</span></a>
											<a class="nav-link"><span>Item</span></a>
										</nav>

									</template>
								</latte-window>
							</latte-popup>

						</div>
					</div>

					<div class="panel" v-if="false">
						<div class="panel-header"><span class="panel-title">Virtual scroller</span></div>
						<latte-virtual-scroller :items="rows" :item-height="48" style="height: 390px">

							<template v-slot="{item, style}">
								<div class="d-flex align-items-center justify-content-center bg-dark text-white border" :style="style">Item {{item.id}}</div>
							</template>

						</latte-virtual-scroller>
					</div>

					<div class="panel" v-if="false">
						<div class="panel-header"><span class="panel-title">Virtual scroller (grid)</span></div>
						<latte-virtual-scroller :items="rows" :item-height="48" :item-width="222" items-class="d-flex flex-row flex-wrap" style="height: 390px">

							<template v-slot="{item, style}">
								<div class="d-flex align-items-center justify-content-center bg-dark text-white border" :style="style">Item {{item.id}}</div>
							</template>

						</latte-virtual-scroller>
					</div>

					<div class="panel" v-if="false">
						<div class="panel-header">
							<span class="panel-title">Emoji stuff</span>
							<div class="ml-auto"></div>
							<latte-emoji-picker></latte-emoji-picker>
							<latte-emoji-picker close-on-select></latte-emoji-picker>
						</div>
						<div class="panel-body">
							<p v-emojify>{{ "Emoji's are now replaced in latte-ui 🎉🙅🏽‍♂️" }}</p>
							<p v-emojify>{{ "🥳🤪✋🏼🍑🥳🥳🥳😘" }}</p>
						</div>
					</div>

					<div class="panel" v-if="false">
						<div class="panel-header"><span class="panel-title">Autocomplete</span></div>
						<div class="panel-body">
							<latte-autocomplete :data-source="autocompleteDataSource"></latte-autocomplete>
						</div>
						<div class="panel-body">
							<latte-autocomplete :data-source="autocompleteDataSource" v-model="acTwo" multi-select></latte-autocomplete>
						</div>
						<div class="panel-body">
							<latte-autocomplete :data-source="autocompleteDataSource" v-model="acTree" multi-select :value="[3, 6]"></latte-autocomplete>
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>

	<div class="panel radius-none" style="height: calc(100vh - 60px)" v-else>
		<BEEditor v-model="content">
			<template v-slot:settings-pane-after="{blockSettingsShown}">
				<template v-if="!blockSettingsShown">
					<div class="panel-header"><span class="panel-title">Page settings</span></div>
					<BESettingsGroup title="General" :padded="true">
						This panel was added with a slot.
					</BESettingsGroup>
					<BESettingsGroup title="View" :opened="false" :padded="true">
						This panel was also added with a slot.
					</BESettingsGroup>
				</template>
			</template>
		</BEEditor>
	</div>

</template>

<script>

	import { BEEditor } from "../../../block-editor/src";

	import autocompleteData from "../assets/data/autocomplete-data.json";
	import BESettingsGroup from "../../../block-editor/src/BESettingsGroup";
	import PageHeader from "../components/PageHeader";

	export default {

		components: {
			BESettingsGroup,
			BEEditor,
			PageHeader
		},

		data()
		{
			let i = 0;
			let rows = Array.from(Array(100), () => ({id: ++i, name: `Bas ${i}`}));

			return {
				content: [],
				rows: rows,
				acTwo: [],
				acTree: [3, 6],
				testEditor: true
			};
		},

		destroyed()
		{
			document.body.style.removeProperty("overflow");
		},

		mounted()
		{
			if (this.testEditor)
				document.body.style.setProperty("overflow", "hidden");
		},

		methods: {

			autocompleteDataSource()
			{
				const data = Array.from(autocompleteData);

				return {
					async getEntries(ids)
					{
						return ids.map(id => data.find(d => d.value === id));
					},

					async getSuggestions(query, offset, limit)
					{
						return data
							.filter(d => d.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
							.slice(offset, offset + limit);
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
