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

		<latte-swiper :view-padding="[0, 90, 12, 90]" :item-padding="12" style="margin: 0 calc(0px - var(--content-gutter))">
			<div class="panel" v-for="i in cards">
				<div class="panel-header py-4 flex-column">
					<latte-initials initials="BM" class="avatar avatar-48px"></latte-initials>
					<span class="panel-title mt-3">User {{ i }}</span>
				</div>
			</div>
		</latte-swiper>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Swiper</span></div>
						<latte-swiper>
							<div class="panel-body border-top-0" v-for="i in cards">
								Card {{ i }}
							</div>
						</latte-swiper>
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
				cards: [1, 2, 3, 4, 5],
				paginationLimit: 10,
				paginationOffset: 0
			};
		},

		methods: {}

	}

</script>
