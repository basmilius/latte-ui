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
			<h1>Bas' playground</h1>
			<p>Here are a few things i'm working on for the next release of Latte UI :-)</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Typography</span></div>
						<div class="panel-body">
							<h1>Heading 1</h1>
							<h2>Heading 2</h2>
							<h3>Heading 3</h3>
							<h4>Heading 4</h4>
							<h5>Heading 5</h5>
							<h6>Heading 6</h6>
							<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, autem beatae consequuntur eum illo quam qui. Accusantium animi deleniti est facere fugit, inventore labore nemo neque nobis praesentium sed voluptatum!</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dicta neque quos similique vitae. Cupiditate eligendi molestias numquam odio ratione recusandae vel! Dolorum facilis natus, neque nisi optio recusandae sed.</p>
							<p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores commodi consequuntur cum delectus eius eveniet facere labore, nobis, odio provident quis quos, sequi suscipit tempore? Ad dolorum fugit rerum!</p>
							<ul>
								<li>Item</li>
								<li>Item</li>
								<li>Item</li>
							</ul>
							<ol>
								<li>Item</li>
								<li>Item</li>
								<li>Item</li>
							</ol>
							<p>
								<abbr title="HyperText Markup Language">HTML</abbr>
							</p>
							<blockquote>
								<blockquote>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus ad aliquam aliquid aperiam blanditiis culpa delectus doloribus enim est eum eveniet exercitationem fugiat, necessitatibus nemo neque tenetur totam vel!</p>
								</blockquote>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus ad aliquam aliquid aperiam blanditiis culpa delectus doloribus enim est eum eveniet exercitationem fugiat, necessitatibus nemo neque tenetur totam vel!</p>
							</blockquote>
							<blockquote>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus ad aliquam aliquid aperiam blanditiis culpa delectus doloribus enim est eum eveniet exercitationem fugiat, necessitatibus nemo neque tenetur totam vel!</p>
								<blockquote>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus ad aliquam aliquid aperiam blanditiis culpa delectus doloribus enim est eum eveniet exercitationem fugiat, necessitatibus nemo neque tenetur totam vel!</p>
								</blockquote>
							</blockquote>
							<blockquote>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus ad aliquam aliquid aperiam blanditiis culpa delectus doloribus enim est eum eveniet exercitationem fugiat, necessitatibus nemo neque tenetur totam vel!</p>
								<footer>Bas Milius</footer>
							</blockquote>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Date/time pickers</span></div>
						<div class="panel-body">
							<latte-datepicker></latte-datepicker>
						</div>
						<div class="panel-body">
							<latte-timepicker></latte-timepicker>
						</div>
						<div class="panel-body">
							<latte-datetimepicker></latte-datetimepicker>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Silhouette</span></div>
						<div class="panel-body" style="background: rgb(var(--main-background))">
							<div class="row">

								<div class="col-12 col-lg-6">

									<div class="panel">
										<latte-silhouette class="panel-media embed-responsive embed-responsive-16by9"></latte-silhouette>
										<div class="panel-header">
											<latte-silhouette class="avatar avatar-36px mr-3"></latte-silhouette>
											<div class="panel-column">
												<latte-silhouette as="span" class="panel-title w-75"></latte-silhouette>
												<latte-silhouette as="span" class="panel-sub-title mt-1 w-50"></latte-silhouette>
											</div>
										</div>
										<div class="panel-body">
											<latte-silhouette as="p"></latte-silhouette>
										</div>
										<div class="panel-footer justify-content-end">
											<latte-silhouette as="button" class="btn btn-contained btn-primary"></latte-silhouette>
										</div>
									</div>

								</div>

								<div class="col-12 col-lg-6 mt-panel-gutter mt-lg-0">

									<div class="panel">
										<div class="panel-media embed-responsive embed-responsive-16by9" style="background-image: url(/image/wallpaper/1.jpg)"></div>
										<div class="panel-header">
											<latte-initials class="avatar avatar-36px mr-3" initials="BM"></latte-initials>
											<div class="panel-column">
												<span class="panel-title">Silhouette</span>
												<span class="panel-sub-title">Silhouettes are amazing :-)</span>
											</div>
											<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-dots-vertical"></i></button>
										</div>
										<div class="panel-body">
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid at dolores eius eligendi enim eveniet in molestiae neque nisi nostrum numquam, officiis omnis pariatur placeat, quasi qui similique vitae?</p>
										</div>
										<div class="panel-footer justify-content-end">
											<button class="btn btn-contained btn-primary"><i class="mdi mdi-check-circle"></i><span>Save</span></button>
										</div>
									</div>

								</div>

							</div>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Form elements</span></div>
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
								<div class="input-group-addon"><input type="checkbox" class="checkbox"/></div>
								<input type="text" placeholder="Entry code..." class="form-control"/>
							</div>
							<div class="form-group input-group form-control-error">
								<div class="input-group-addon"><input type="checkbox" class="checkbox"/></div>
								<input type="text" placeholder="Entry code..." class="form-control"/>
							</div>
							<div class="form-group input-group form-control-info">
								<div class="input-group-addon"><input type="checkbox" class="checkbox"/></div>
								<input type="text" placeholder="Entry code..." class="form-control"/>
							</div>
							<div class="form-group input-group form-control-success">
								<div class="input-group-addon"><input type="checkbox" class="checkbox"/></div>
								<input type="text" placeholder="Entry code..." class="form-control"/>
							</div>
							<div class="form-group input-group form-control-warning">
								<div class="input-group-addon"><input type="checkbox" class="checkbox"/></div>
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
