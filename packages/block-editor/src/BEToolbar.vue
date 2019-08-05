<template>

	<div class="panel-header be-toolbar">
		<span></span>

		<button class="btn btn-outline btn-primary" @click="onInserterClick"><i class="mdi mdi-plus-circle"></i><span>{{ "Insert" | beTranslate }}</span></button>

		<div class="divider divider-vertical"></div>
		<button class="btn btn-icon btn-text btn-dark" @click="notImplemented" :data-tooltip="'View code' | beTranslate"><i class="mdi mdi-code-tags"></i></button>
		<BEHierarchy/>

		<div class="divider divider-vertical"></div>
		<button class="btn btn-icon btn-text btn-dark" @click="notImplemented" :data-tooltip="'Undo' | beTranslate"><i class="mdi mdi-undo"></i></button>
		<button class="btn btn-icon btn-text btn-dark" @click="notImplemented" :data-tooltip="'Redo' | beTranslate"><i class="mdi mdi-redo"></i></button>

		<latte-portal-target class="d-flex align-items-center" :name="beforePortalId" multiple></latte-portal-target>
		<slot name="before"></slot>

		<div class="mx-auto"></div>

		<latte-portal-target class="d-flex align-items-center" :name="afterPortalId" multiple></latte-portal-target>
		<slot name="after"></slot>

		<span></span>
	</div>

</template>

<script>

	import { editorInstance, getLatte, translate } from "./utils";
	import BEInserterPopup from "./BEInserterPopup";
	import BEHierarchy from "./BEHierarchy";

	const L = getLatte();

	export default {

		components: {
			BEHierarchy,
			BEInserterPopup
		},

		filters: {
			beTranslate: (text, ...params) => translate(text, ...params)
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

			notImplemented()
			{
				L.ui.message.alert("Notice", "This feature is not yet implemented.");
			},

			onInserterClick(evt)
			{
				const el = L.util.dom.closest(evt.target, ".btn").querySelector("i.mdi");

				this.editor.inserter.open(el, id => this.editor.rootBlocks.insertBlock(id), -15, 12);
			}

		}

	}

</script>
