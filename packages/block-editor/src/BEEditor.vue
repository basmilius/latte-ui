<template>

	<div class="be-editor" spellcheck="false">

		<div class="be-content-pane" @click="onEditorClick">
			<BEToolbar/>

			<div class="be-content-mount">
				<div class="be-content-wrapper">
					<BEBlocks ref="rootBlocks" :value="content" @input="onInput"/>
				</div>

				<textarea class="form-control radius-none my-5" :value="rendered" rows="10"></textarea>
				<div class="be-content-wrapper" v-html="rendered"></div>
			</div>
		</div>

		<BEInserterPopup ref="inserter"/>
		<BESettingsPane :editor="selfEditor"/>

	</div>

</template>

<script>

	import { Latte } from "@bybas/latte-ui";
	import { defaultCategories } from "./block";
	import { ColumnsBlock, FeaturedImageBlock, HeadingBlock, ParagraphBlock, WrapperBlock } from "./blocks";

	import BEBlocks from "./BEBlocks";
	import BEInserterExpanded from "./BEInserterExpanded";
	import BEInserterPopup from "./BEInserterPopup";
	import BESettingsPane from "./BESettingsPane";
	import BEToolbar from "./BEToolbar";
	import { createElement } from "./create-element";

	export default {

		name: "BEEditor",

		components: {
			BEBlocks,
			BEInserterExpanded,
			BEInserterPopup,
			BESettingsPane,
			BEToolbar
		},

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
											options: {text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis eu nunc eget mattis. Praesent et metus at enim placerat auctor sed condimentum lorem. Donec feugiat, diam vel blandit faucibus, turpis massa feugiat magna, vel sodales quam eros vitae justo. Sed sit amet eros tristique, scelerisque est at, ultricies nulla. Nam placerat efficitur tellus, ut egestas erat tincidunt id. Sed molestie eget turpis eget luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam eget lorem dolor. Phasellus at consequat magna, non aliquet ligula. Nam pellentesque urna felis, ac imperdiet erat tincidunt eget."}
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
				],
				rendered: ""
			};
		},

		computed: {

			inserter()
			{
				return this.$refs.inserter;
			},

			rootBlocks()
			{
				return this.$refs.rootBlocks;
			},

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

			save()
			{
				const processGroup = group => group.map((item, index) =>
				{
					let block = this.blocks.find(b => b.id === item.id);

					if (block === undefined)
						return undefined;

					const depth = this.depth + 1;
					const children = item.children || [];
					const options = Object.assign({}, block.defaultOptions || {}, item.options);

					return block.render(createElement, {
						depth,
						index,
						children,
						options,

						processGroup
					});
				}).filter(b => !!b);

				const blocks = processGroup(this.content);
				const template = document.createElement("div");

				for (let block of blocks)
					template.appendChild(block);

				console.log(template.innerHTML);

				return this.rendered = template.innerHTML;
			},

			onEditorClick()
			{
				Latte.action.dispatch("latte:be:reset-settings-pane");
			},

			onInput(content)
			{
				this.content = content;
			}

		}

	}

</script>
