<template>

	<div class="panel-header be-toolbar">
		<span></span>

		<button class="btn btn-contained btn-primary" @click="onInserterClick"><i class="mdi mdi-plus-circle"></i><span>{{ "Insert" |i18n("latte-ui") }}</span></button>

		<div class="divider divider-vertical"></div>
		<button class="btn btn-icon btn-text btn-dark" :data-tooltip="'View code' | i18n('latte-ui')"><i class="mdi mdi-code-tags"></i></button>
		<button class="btn btn-icon btn-text btn-dark" :data-tooltip="'View hierarchy' | i18n('latte-ui')"><i class="mdi mdi-notification-clear-all mdi-flip-v"></i></button>

		<div class="divider divider-vertical"></div>
		<button class="btn btn-icon btn-text btn-dark" disabled :data-tooltip="'Undo' | i18n('latte-ui')"><i class="mdi mdi-undo"></i></button>
		<button class="btn btn-icon btn-text btn-dark" disabled :data-tooltip="'Redo' | i18n('latte-ui')"><i class="mdi mdi-redo"></i></button>

		<latte-portal-target class="d-flex align-items-center" :name="beforePortalId" multiple></latte-portal-target>
		<div class="mx-auto"></div>
		<latte-portal-target class="d-flex align-items-center" :name="afterPortalId" multiple></latte-portal-target>

		<button class="btn btn-text btn-primary" @click="render"><span>Render</span></button>

		<span></span>
	</div>

</template>

<script>

	import { editorInstance, getLatte } from "./utils";
	import BEInserterPopup from "./BEInserterPopup";

	const L = getLatte();

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

		computed: {

			afterPortalId()
			{
				return `${this.editor.uniqueId}-toolbar-after`;
			},

			beforePortalId()
			{
				return `${this.editor.uniqueId}-toolbar-before`;
			}

		},

		methods: {

			onInserterClick(evt)
			{
				const el = L.util.dom.closest(evt.target, ".btn").querySelector("i.mdi");

				this.editor.inserter.open(el, id => this.editor.rootBlocks.insertBlock(id), -15, 9);
			},

			render()
			{
				console.log(this.editor.render());
			}

		}

	}

</script>
