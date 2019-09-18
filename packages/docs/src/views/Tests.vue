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

					<div class="panel" v-if="true">
						<div class="panel-header"><span class="panel-title">Virtual scroller</span></div>
						<latte-virtual-scroller :items="rows" :item-height="48" style="height: 390px">

							<template v-slot="{item, style}">
								<div class="d-flex align-items-center justify-content-center bg-dark text-white border" :style="style">Item {{item.id}}</div>
							</template>

						</latte-virtual-scroller>
					</div>

					<div class="panel" v-if="true">
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
				rows: rows
			};
		}

	}

</script>
