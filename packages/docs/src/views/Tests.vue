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
						<div class="panel-header"><span class="panel-title">Date / Time Pickers</span></div>
						<div class="panel-body">
							<latte-timepicker v-model="datetime"></latte-timepicker>
							<latte-timepicker class="mt-2"></latte-timepicker>
						</div>
						<div class="panel-body">
							<latte-datepicker v-model="datetime"></latte-datepicker>
							<latte-datepicker class="mt-2"></latte-datepicker>
						</div>
						<div class="panel-body">
							<latte-datetimepicker v-model="datetime"></latte-datetimepicker>
							<latte-datetimepicker class="mt-2"></latte-datetimepicker>
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

				</div>
			</div>
		</div>

	</div>

	<div class="panel radius-none" style="height: calc(100vh - 60px)" v-else>
		<BEEditor v-model="content">
			<template #settings-pane-after="{ blockSettingsShown }">
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
			let rows = Array.from(Array(50), () => ({id: ++i, name: `Bas ${i}`}));

			return {
				content: [],
				datetime: new Date(1996, 2, 13, 20, 15),
				rows: rows,
				acTwo: [],
				acTree: [3, 6],
				testEditor: false
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

		watch: {

			datetime()
			{
				console.log(this.moment(this.datetime).format("LLLL"));
			}

		}

	}

</script>
