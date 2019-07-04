<template>

	<div class="panel-header be-toolbar">
		<latte-ripple as="button" class="btn btn-icon btn-text btn-dark inserter-btn" @click="onInserterClick"><i class="mdi mdi-plus-circle-outline"></i></latte-ripple>
		<div class="mx-auto"></div>
	</div>

</template>

<script>

	import { editorInstance } from "./utils";
	import BEInserterPopup from "./BEInserterPopup";

	export default {

		components: {
			BEInserterPopup
		},

		name: "BEToolbar",

		data()
		{
			return {
				editor: editorInstance(this)
			};
		},

		methods: {

			onInserterClick()
			{
				const el = this.$el.querySelector("button.inserter-btn i.mdi");

				this.editor.inserter.open(el, id => this.editor.rootBlocks.insertBlock(id), -15, 9);
			}

		}

	}

</script>
