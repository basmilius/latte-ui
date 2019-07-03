<template>

	<div class="be-inserter be-inserter-expanded" @click="onClick">
		<i class="mdi mdi-plus-circle-outline"></i>
		<span>{{ "Add block" | i18n("latte-ui") }}</span>
	</div>

</template>

<script>

	import { editorInstance } from "./utils";
	import BEInserterPopup from "./BEInserterPopup";

	export default {

		name: "BEInserterExpanded",

		components: {
			BEInserterPopup
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
