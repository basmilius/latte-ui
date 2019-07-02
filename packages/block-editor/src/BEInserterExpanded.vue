<template>

	<div class="be-inserter be-inserter-expanded">
		<i class="mdi mdi-plus-circle-outline"></i>
		<span>{{ "Add block" | i18n("latte-ui") }}</span>

		<latte-popup :associate-with="$el">
			<BEInserterPopup @select="$emit('select', $event)" :blocks="blocks" :categories="categories"/>
		</latte-popup>
	</div>

</template>

<script>

	import BEInserterPopup from "./BEInserterPopup";

	export default {

		name: "BEInserterExpanded",

		components: {
			BEInserterPopup
		},

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
