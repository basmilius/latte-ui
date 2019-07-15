<template>

	<div class="be-inserter be-inserter-expanded" @click="onClick">
		<i class="mdi mdi-plus-circle-outline"></i>
		<span>{{ "Add block" | beTranslate }}</span>
	</div>

</template>

<script>

	import { editorInstance, translate } from "./utils";
	import BEInserterPopup from "./BEInserterPopup";

	export default {

		name: "BEInserterExpanded",

		components: {
			BEInserterPopup
		},

		filters: {
			beTranslate: (text, ...params) => translate(text, ...params)
		},

		methods: {

			onClick()
			{
				editorInstance(this).inserter.open(this.$el.querySelector("i.mdi"), id => this.select(id), -15, 9);
			},

			select(id)
			{
				this.$emit("select", id);
			}

		}

	}

</script>
