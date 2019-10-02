<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page mb-3" id="tests">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header">
							<span class="panel-title">Form elements</span>
						</div>
						<div class="panel-body">
							<div class="form-group">
								<input type="text" placeholder="Type your name..." class="form-control"/>
							</div>
							<div class="form-group">
								<input type="text" placeholder="Type your name..." class="form-control" disabled/>
							</div>
							<div class="form-group">
								<select class="form-control">
									<option value="1">This is an option</option>
								</select>
							</div>
							<div class="form-group">
								<select class="form-control" disabled>
									<option value="1">This is an option</option>
								</select>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group">
								<latte-autocomplete :data-source="autocompleteDataSource" v-model="selected"></latte-autocomplete>
							</div>
							<div class="form-group">
								<latte-autocomplete multi-select :data-source="autocompleteDataSource" v-model="selectedMulti"></latte-autocomplete>
							</div>
							<div class="form-group input-group">
								<div class="input-group-addon"><i class="mdi mdi-tag-heart"></i></div>
								<latte-autocomplete :data-source="autocompleteDataSource" v-model="selected"></latte-autocomplete>
							</div>
							<div class="form-group input-group">
								<div class="input-group-addon"><i class="mdi mdi-tag-heart"></i></div>
								<latte-autocomplete multi-select :data-source="autocompleteDataSource" v-model="selectedMulti"></latte-autocomplete>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group input-group">
								<div class="input-group-addon"><i class="mdi mdi-tag"></i></div>
								<span class="badge badge-primary"><span>Awesome</span><button class="btn"><i class="mdi mdi-close"></i></button></span>
								<span class="badge badge-primary"><span>Awesome</span><button class="btn"><i class="mdi mdi-close"></i></button></span>
								<input type="text" placeholder="Search for tags..." class="form-control"/>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group input-group">
								<div class="input-group-addon"><input type="checkbox" class="checkbox checkbox-primary"/></div>
								<input type="text" placeholder="Entry code..." class="form-control"/>
							</div>
							<div class="form-group input-group">
								<div class="input-group-addon"><input type="checkbox" class="checkbox checkbox-primary"/></div>
								<input type="text" placeholder="Entry code..." class="form-control"/>
							</div>
							<div class="form-group input-group">
								<div class="input-group-addon"><input type="checkbox" class="checkbox checkbox-primary"/></div>
								<input type="text" placeholder="Entry code..." class="form-control"/>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group input-group">
								<div class="input-group-addon"><i class="mdi mdi-email"></i></div>
								<input type="text" placeholder="E-mailaddress..." class="form-control"/>
							</div>
							<div class="form-group input-group">
								<input type="text" placeholder="E-mailaddress..." class="form-control"/>
								<div class="input-group-addon"><i class="mdi mdi-email"></i></div>
							</div>
							<div class="form-group input-group">
								<div class="input-group-addon"><i class="mdi mdi-email"></i></div>
								<input type="text" placeholder="E-mailaddress..." class="form-control"/>
								<button class="btn btn-contained btn-primary"><span>Save</span></button>
							</div>
							<div class="form-group input-group">
								<div class="input-group-addon"><i class="mdi mdi-email"></i></div>
								<input type="text" placeholder="E-mailaddress..." class="form-control"/>
								<div class="input-group-addon"><i class="mdi mdi-check-circle"></i></div>
							</div>
							<div class="form-group input-group">
								<div class="input-group-addon">https://example.com/profile/</div>
								<input type="text" placeholder="Choose an username..." class="form-control"/>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group input-group form-control-error">
								<div class="input-group-addon"><i class="mdi mdi-tag"></i></div>
								<input type="text" placeholder="Search for tags..." class="form-control"/>
							</div>
							<div class="form-group input-group form-control-info">
								<div class="input-group-addon"><i class="mdi mdi-tag"></i></div>
								<input type="text" placeholder="Search for tags..." class="form-control"/>
							</div>
							<div class="form-group input-group form-control-success">
								<div class="input-group-addon"><i class="mdi mdi-tag"></i></div>
								<input type="text" placeholder="Search for tags..." class="form-control"/>
							</div>
							<div class="form-group input-group form-control-warning">
								<div class="input-group-addon"><i class="mdi mdi-tag"></i></div>
								<input type="text" placeholder="Search for tags..." class="form-control"/>
							</div>
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

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../components/PageHeader";

	export default {

		components: {
			PageHeader
		},

		data()
		{
			let i = 0;
			let rows = Array.from(Array(10000), () => ({id: ++i, name: `Bas ${i}`}));

			return {
				rows: rows,
				selected: 0,
				selectedMulti: []
			};
		},

		methods: {

			autocompleteDataSource()
			{
				let items = [];

				for (let i = 0; i < 100; i++)
					items.push({value: i + 1, label: `Item ${i + 1}`});

				return {
					getEntries(ids)
					{
						return new Promise(resolve => resolve(items.filter(item => ids.indexOf(item.value) > -1)));
					},

					getSuggestions(query, offset, limit)
					{
						return new Promise(resolve => resolve(items.filter(item => item.label.indexOf(query) === 0).slice(offset, limit)));
					}
				};
			}

		}

	}

</script>
