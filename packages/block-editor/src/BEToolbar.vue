<template>

	<div class="panel-header be-toolbar">
		<latte-ripple as="button" class="btn btn-icon btn-text btn-dark inserter-btn" @click="onInserterClick"><i class="mdi mdi-plus-circle-outline"></i></latte-ripple>
		<div class="mx-auto"></div>
		<latte-ripple as="button" class="btn btn-contained btn-primary"><i class="mdi mdi-check-circle"></i><span>{{ "Save" | i18n("latte-ui") }}</span></latte-ripple>
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
