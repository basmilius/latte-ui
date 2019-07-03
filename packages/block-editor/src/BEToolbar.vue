<template>

	<div class="panel-header be-toolbar">
		<button class="btn btn-icon btn-text btn-dark inserter-btn" @click="onInserterClick"><i class="mdi mdi-plus-circle-outline"></i></button>
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

		methods: {

			onInserterClick()
			{
				const editor = editorInstance(this);
				const el = this.$el.querySelector("button.inserter-btn i.mdi");

				editor.inserter.open(el, id => editor.rootBlocks.insertBlock(id), -15, 9);
			}

		}

	}

</script>
