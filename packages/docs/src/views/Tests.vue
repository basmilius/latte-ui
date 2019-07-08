<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="tests" v-if="false">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container" v-if="false">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Virtual scroller</span></div>
						<latte-virtual-scroller :items="rows" :item-height="48" style="height: 390px">

							<template v-slot="{item, style}">
								<div class="d-flex align-items-center justify-content-center bg-dark text-white border" :style="style">Item {{item.id}}</div>
							</template>

						</latte-virtual-scroller>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Virtual scroller (grid)</span></div>
						<latte-virtual-scroller :items="rows" :item-height="48" :item-width="222" items-class="d-flex flex-row flex-wrap" style="height: 390px">

							<template v-slot="{item, style}">
								<div class="d-flex align-items-center justify-content-center bg-dark text-white border" :style="style">Item {{item.id}}</div>
							</template>

						</latte-virtual-scroller>
					</div>

					<div class="panel">
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

					<div class="panel">
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

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Data table</span></div>
						<latte-data-table add-spinner-to-parent :data-source="datatableDataSource"></latte-data-table>
					</div>

				</div>
			</div>
		</div>

	</div>

	<div class="panel radius-none" style="height: calc(100vh - 60px); margin: -24px" v-else>
		<BEEditor :value="content">
			<template v-slot:settings-pane-after>
				<div class="panel-header"><span class="panel-title">Page settings</span></div>
				<BESettingsGroup title="General" padded>
					This panel was added with a slot.
				</BESettingsGroup>
				<BESettingsGroup title="View" padded>
					This panel was also added with a slot.
				</BESettingsGroup>
			</template>
		</BEEditor>
	</div>

</template>

<script>

	import PageHeader from "../components/PageHeader";
	import autocompleteData from "../assets/data/autocomplete-data.json";

	import { BEEditor } from "../../../block-editor/src";
	import BESettingsGroup from "../../../block-editor/src/BESettingsGroup";

	export default {

		components: {
			BESettingsGroup,
			BEEditor,
			PageHeader
		},

		data()
		{
			let i = 0;
			let rows = Array.from(Array(1000), () => ({id: ++i, name: `Bas ${i}`}));

			return {
				content: [
					{
						id: "paragraph",
						options: {
							text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor eleifend leo, ac mollis elit tempor nec. Nullam consequat lorem ut leo porttitor, eget porta purus ornare. Sed ac massa convallis, malesuada mi semper, dictum neque. Quisque varius justo vel volutpat elementum. Aenean fringilla mi sed luctus finibus. Sed ornare odio eu nisl tempus, a pulvinar justo molestie. In arcu ligula, ornare ut augue a, aliquet imperdiet nibh. Aenean mi massa, posuere vel tincidunt vel, eleifend eget lectus. Morbi convallis neque sed nulla commodo, eget imperdiet felis hendrerit. Donec nibh risus, vehicula vitae consequat nec, posuere in lorem. Cras dui lorem, tincidunt quis aliquam ac, suscipit in massa. Curabitur cursus ligula elit, in tempor massa vestibulum rutrum. Aliquam vitae fringilla felis. Maecenas felis eros, placerat consectetur enim id, luctus accumsan nunc. Sed sed est vitae nibh blandit dapibus."
						}
					}
				],
				rows: rows,
				acTwo: [],
				acTree: [3, 6]
			};
		},

		mounted()
		{
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

		// watch: {
		//
		// 	acTwo()
		// 	{
		// 		console.log(`Value for first multi-select: `, Array.from(this.acTwo));
		// 	},
		//
		// 	acTree()
		// 	{
		// 		console.log(`Value for second multi-select: `, Array.from(this.acTree));
		// 	}
		//
		// }

	}

</script>
