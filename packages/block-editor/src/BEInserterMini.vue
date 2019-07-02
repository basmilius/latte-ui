<template>

	<button class="btn btn-icon btn-text btn-dark be-inserter be-inserter-mini" :class="{'is-open': isOpen}">
		<i class="mdi mdi-plus-circle-outline"></i>
		<latte-popup :associate-with="$el" :margin-x="-9" @close="isOpen = false" @open="isOpen = true">
			<BEInserterPopup @select="$emit('select', $event)" :blocks="blocks" :categories="categories"/>
		</latte-popup>
	</button>

</template>

<script>

	import BEInserterPopup from "./BEInserterPopup";

	export default {

		components: {BEInserterPopup},

		name: "BEInserterMini",

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

		},

		data()
		{
			return {
				isOpen: false
			};
		}

	}

</script>
