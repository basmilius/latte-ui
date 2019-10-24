<template>

	<div class="be-inserter be-inserter-mini">
		<button class="btn btn-icon btn-text btn-dark" :class="{'is-open': isOpen}" @click="onClick">
			<i class="mdi mdi-plus"></i>
		</button>
	</div>

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
				editor: editorInstance(this),
				isOpen: false
			};
		},

		methods: {

			onClick()
			{
				this.editor.inserter.open(this.$el.querySelector("i.mdi"), id => this.select(id), -15);
			},

			select(id)
			{
				this.$emit("select", id);
			}

		}

	}

</script>
