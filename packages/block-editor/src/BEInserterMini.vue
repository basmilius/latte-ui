<template>

	<button class="btn btn-icon btn-text btn-dark be-inserter be-inserter-mini" :class="{'is-open': isOpen}" @click="onClick">
		<i class="mdi mdi-plus-circle-outline"></i>
	</button>

</template>

<script>

	import BEInserterPopup from "./BEInserterPopup";
	import { editorInstance } from "./utils";

	export default {

		components: {BEInserterPopup},

		name: "BEInserterMini",

		data()
		{
			return {
				isOpen: false
			};
		},

		methods: {

			onClick()
			{
				editorInstance(this).inserter.open(this.$el.querySelector("i.mdi"), id => this.select(id), -15);
			},

			select(id)
			{
				this.$emit("select", id);
			}

		}

	}

</script>
