<template>

	<div class="panel-header be-toolbar">
		<latte-button-dropdown icon="plus-circle-outline">
			<BEInserterPopup :blocks="blocks" :categories="categories"/>
		</latte-button-dropdown>
	</div>

</template>

<script>

	import BEInserterPopup from "./BEInserterPopup";

	export default {

		components: {
			BEInserterPopup
		},

		name: "BEToolbar",

		props: {

			blocks: {
				default: () => [],
				required: true,
				type: Array
			},

			categories: {
				default: () => [],
				required: true,
				type: Array
			}

		}

	}

</script>
