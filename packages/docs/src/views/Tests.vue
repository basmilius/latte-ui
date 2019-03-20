<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="tests">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Rich text editor</span></div>
						<latte-rich-text-editor></latte-rich-text-editor>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Pagination</span></div>
						<div class="panel-body">

							<latte-pagination class="my-3" :offset="paginationOffset" :limit="paginationLimit" :total="500" controller-bar @navigate="paginationOffset = $event" @limit="paginationLimit = $event"></latte-pagination>
							<latte-pagination class="my-3" :offset="paginationOffset" :limit="paginationLimit" :total="500" controller-bar :navigation-controls="false" @navigate="paginationOffset = $event" @limit="paginationLimit = $event"></latte-pagination>
							<latte-pagination class="my-3" :offset="paginationOffset" :limit="paginationLimit" :total="500" @navigate="paginationOffset = $event" @limit="paginationLimit = $event"></latte-pagination>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Snackbar</span></div>
						<div class="panel-body">

							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showSnackbar($latte.ui.snackbar.Locations.BOTTOM_LEFT)">Bottom left</latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showSnackbar($latte.ui.snackbar.Locations.BOTTOM)">Bottom center</latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showSnackbar($latte.ui.snackbar.Locations.BOTTOM_RIGHT)">Bottom right</latte-ripple>

							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showSnackbar($latte.ui.snackbar.Locations.TOP_LEFT)">Top left</latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showSnackbar($latte.ui.snackbar.Locations.TOP)">Top center</latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showSnackbar($latte.ui.snackbar.Locations.TOP_RIGHT)">Top right</latte-ripple>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Submenu</span></div>
						<div class="panel-body">

							<latte-button-dropdown icon="dots-vertical">
								<nav class="nav nav-list">
									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>

									<div class="divider divider-horizontal"></div>

									<latte-submenu icon="dice-2" label="Submenu">
										<nav class="nav nav-list">
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
										</nav>
									</latte-submenu>

									<div class="divider divider-horizontal"></div>

									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
								</nav>
							</latte-button-dropdown>

						</div>
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
			return {
				paginationLimit: 10,
				paginationOffset: 0
			};
		},

		methods: {

			async showSnackbar(location)
			{
				const result = await Latte.ui.snackbar.create({
					action: {
						color: "success",
						label: "Dismiss"
					},
					duration: 10000,
					location: location,
					message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				});

				console.log(result);
			}

		}

	}

</script>
