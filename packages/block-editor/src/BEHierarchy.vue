<template>

	<button class="btn btn-icon btn-text btn-dark" :data-tooltip="'View hierarchy' | beTranslate">
		<i class="mdi mdi-notification-clear-all mdi-flip-v"></i>

		<latte-portal to="be-hierarchy">
			<div class="panel panel-blank be-hierarchy">
				<div class="panel-header">
					<span class="panel-title mr-3">{{ "Hierarchy" | beTranslate }}</span>
					<button class="btn btn-outline btn-error ml-auto"><i class="mdi mdi-delete"></i><span>{{ "Remove all" | beTranslate }}</span></button>
				</div>
				<div class="be-hierarchy-group">
					<BEHierarchyItem :api="item.api" :blocks="item.blocks" :key="index" v-for="(item, index) of items"/>
				</div>
			</div>
		</latte-portal>

		<latte-popup ref="popup" :associate-with="$el" :margin-x="-9" :margin-y="6">
			<latte-portal-target name="be-hierarchy"></latte-portal-target>
		</latte-popup>
	</button>

</template>

<script>

	import { editorInstance, translate } from "./utils";
	import BEHierarchyItem from "./BEHierarchyItem";

	export default {

		components: {BEHierarchyItem},

		filters: {
			beTranslate: (text, ...params) => translate(text, ...params)
		},

		name: "BEHierarchy",

		data()
		{
			return {
				editor: editorInstance(this),
				items: []
			};
		},

		destroyed()
		{
			this.editor.$off("content-update", this.updateItems);
		},

		mounted()
		{
			this.editor.$on("content-update", this.updateItems);
			this.updateItems();
		},

		methods: {

			updateItems()
			{
				this.$nextTick(() =>
				{
					const blocks = this.editor.rootBlocks.$children;

					this.items = blocks.map(b => ({
						api: b.api,
						blocks: b.$children.filter(c => c.$options.name === "BEBlocks")
					})).filter(b => b.api !== undefined);

					this.$forceUpdate();
				});
			}

		}

	}

</script>
