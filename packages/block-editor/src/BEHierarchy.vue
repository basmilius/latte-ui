<template>

	<button class="btn btn-icon btn-text btn-dark" :data-tooltip="'View hierarchy' | beTranslate">
		<i class="mdi mdi-notification-clear-all mdi-flip-v"></i>

		<latte-portal to="be-hierarchy">
			<div class="panel panel-blank be-hierarchy">
				<div class="panel-header">
					<span class="panel-title mr-3">{{ "Hierarchy" | beTranslate }}</span>
					<latte-ripple as="button" class="btn btn-outline btn-error ml-auto" @click="deleteEverything">
						<i class="mdi mdi-delete"></i>
						<span>{{ "Remove all" | beTranslate }}</span>
					</latte-ripple>
				</div>
				<div class="be-hierarchy-group" v-if="entry">
					<BEHierarchyItem :entry="child" :key="child.hash" v-for="child of entry.children"/>
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
				entry: undefined
			};
		},

		destroyed()
		{
			this.editor.$off("be:content-ready", this.updateEntry);
		},

		mounted()
		{
			this.editor.$on("be:content-ready", this.updateEntry);
		},

		methods: {

			deleteEverything()
			{
				if (!this.entry)
					return;

				this.entry.children.forEach(c => c.remove());
			},

			updateEntry(entry)
			{
				this.entry = entry;
			}

		}

	}

</script>
