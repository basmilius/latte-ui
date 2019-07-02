<template>

	<div class="be-editor" spellcheck="false">

		<div class="be-content-pane" @click="onEditorClick">
			<BEToolbar :blocks="blocks" :categories="categories"/>

			<div class="container">
				<div class="panel-body">
					<BEBlocks :blocks="blocks" :categories="categories" :value="content" @input="onInput"/>
				</div>
			</div>
		</div>

		<BESettingsPane :editor="selfEditor"/>

	</div>

</template>

<script>

	import { Latte } from "@bybas/latte-ui";

	import BEBlocks from "./BEBlocks";
	import BEInserterExpanded from "./BEInserterExpanded";
	import BEInserterPopup from "./BEInserterPopup";
	import BESettingsPane from "./BESettingsPane";
	import BEToolbar from "./BEToolbar";

	import { defaultCategories } from "./block";
	import { ColumnsBlock, FeaturedImageBlock, HeadingBlock, ParagraphBlock, WrapperBlock } from "./blocks";

	export default {

		name: "BEEditor",

		components: {BESettingsPane, BEBlocks, BEToolbar, BEInserterPopup, BEInserterExpanded},

		created()
		{
			// Layout
			this.registerBlock(ColumnsBlock);
			this.registerBlock(FeaturedImageBlock);
			this.registerBlock(WrapperBlock);

			// Text
			this.registerBlock(HeadingBlock);
			this.registerBlock(ParagraphBlock);

			defaultCategories.forEach(c => this.registerCategory(c.id, c.icon, c.name));
		},

		data()
		{
			return {
				uniqueId: Latte.api.id(),
				blocks: [],
				categories: [],
				content: [
					{
						id: "columns",
						children: [
							[
								{
									id: "heading",
									options: {type: "h4", text: "Test block editor stuff"}
								},
								{
									id: "featured-image",
									options: {imageUrl: "https://appmanager.marveld.ideemedia.cloud/storage/b40f062c/2019/06/243ba0ae-9261-11e9-b0dd-525400806242.webp", title: "Teun & Pleun"}
								}
							],
							[
								{
									id: "heading",
									options: {type: "h4", text: "Below is a wrapper block"}
								},
								{
									id: "wrapper",
									children: [
										{
											id: "heading",
											options: {type: "h3", text: "Header number 6"}
										},
										{
											id: "paragraph",
											options: {text: "Lorem ipsum..."}
										}
									],
									options: {}
								}
							]
						],
						options: {
							columns: 2
						}
					}
				]
			};
		},

		computed: {

			selfEditor()
			{
				return this;
			}

		},

		methods: {

			registerBlock(implementation)
			{
				const block = new implementation();
				block.editor = this;

				this.blocks.push(block);
			},

			registerCategory(id, icon, name)
			{
				this.categories.push({id, icon, name});
			},

			onEditorClick()
			{
				Latte.action.dispatch("latte:be:reset-settings-pane");
			},

			onInput(content)
			{
				console.clear();
				console.log(JSON.stringify(content));
			}

		}

	}

</script>
