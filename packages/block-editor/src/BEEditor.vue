<template>

	<div class="be-editor" spellcheck="false">

		<div class="be-content-pane" @click.capture="onEditorClick">
			<BEToolbar ref="toolbar"/>

			<div class="be-content-mount">
				<div class="be-content-wrapper be-editing">
					<BEBlocks ref="rootBlocks" :value="content" @input="onInput"/>
				</div>
			</div>
		</div>

		<BEInserterList ref="inserterList"/>
		<BEInserterPopup ref="inserter"/>

		<BESettingsPane :editor="selfEditor">
			<template v-slot:before>
				<slot name="settings-pane-before"></slot>
			</template>
			<template v-slot:after>
				<slot name="settings-pane-after"></slot>
			</template>
		</BESettingsPane>

	</div>

</template>

<script>

	import { createElement } from "./create-element";
	import { defaultCategories } from "./block";
	import { ButtonBlock, ColumnsBlock, HeadingBlock, ParagraphBlock, WrapperBlock, YouTubeEmbedBlock } from "./blocks";

	import BEBlocks from "./BEBlocks";
	import BEInserterExpanded from "./BEInserterExpanded";
	import BEInserterList from "./BEInserterList";
	import BEInserterPopup from "./BEInserterPopup";
	import BESettingsPane from "./BESettingsPane";
	import BEToolbar from "./BEToolbar";
	import { getLatte } from "./utils";

	const L = getLatte();
	const defaultColorPalette = [
		{name: "Primary", value: "rgb(var(--color-primary))"},
		{name: "Black", value: "rgb(0, 0, 0)"},
		{name: "White", value: "rgb(255, 255, 255)"},
		{name: "Chili", value: "rgb(194, 24, 7)"},
		{name: "Ginger", value: "rgb(247, 54, 43)"},
		{name: "Pineapple", value: "rgb(255, 173, 0)"},
		{name: "Lemon", value: "rgb(245, 214, 0)"},
		{name: "Lime", value: "rgb(110, 204, 84)"},
		{name: "Fern", value: "rgb(79, 121, 66)"},
		{name: "Elderflower", value: "rgb(74, 204, 207)"},
		{name: "Cream Soda", value: "rgb(0, 171, 255)"},
		{name: "Sapphire", value: "rgb(24, 103, 192)"},
		{name: "Blackberry", value: "rgb(69, 56, 140)"},
		{name: "Grape", value: "rgb(102, 61, 166)"},
		{name: "Blueberry", value: "rgb(143, 120, 232)"},
		{name: "Tropical", value: "rgb(204, 120, 209)"},
		{name: "Bubble Gum", value: "rgb(247, 140, 191)"},
		{name: "Raspberry", value: "rgb(252, 0, 122)"},
		{name: "Hibiscus", value: "rgb(180, 55, 87)"},
		{name: "Tortilla", value: "rgb(153, 121, 80)"},
		{name: "Flint", value: "rgb(126, 123, 158)"},
		{name: "Slate", value: "rgb(63, 59, 84)"}
	];
	const testBlocks = [
		{
			id: "columns",
			children: [
				[
					{
						id: "youtube-embed",
						options: {}
					},
					{
						id: "heading",
						options: {type: "h4", text: "Gavin DeGraw - Soldier"}
					},
					{
						id: "paragraph",
						options: {text: "Nice music from YouTube."}
					}
				],
				[
					{
						id: "heading",
						options: {type: "h4", text: "Related videos"}
					}
				]
			],
			options: {
				preset: 1
			}
		}
	];

	export default {

		name: "BEEditor",

		components: {
			BEBlocks,
			BEInserterExpanded,
			BEInserterList,
			BEInserterPopup,
			BESettingsPane,
			BEToolbar
		},

		props: {
			colorPalette: {default: () => defaultColorPalette, type: Array},
			value: {default: () => testBlocks, type: Array}
		},

		created()
		{
			this.resetBlocksAndCategories();
		},

		destroyed()
		{
			document.removeEventListener("selectionchange", this.onSelectionChanged);
		},

		data()
		{
			return {
				uniqueId: L.api.id(),
				blocks: [],
				categories: [],
				content: [],
				rendered: "",
				selection: window.getSelection()
			};
		},

		mounted()
		{
			document.addEventListener("selectionchange", this.onSelectionChanged, {passive: true});
			document.execCommand("defaultParagraphSeparator", false, "p");
		},

		computed: {

			inserter()
			{
				return this.$refs.inserter;
			},

			inserterList()
			{
				return this.$refs.inserterList;
			},

			rootBlocks()
			{
				return this.$refs.rootBlocks;
			},

			selfEditor()
			{
				return this;
			},

			toolbar()
			{
				return this.$refs.toolbar;
			}

		},

		methods: {

			registerBlock(implementation)
			{
				this.blocks.push(new implementation());
			},

			registerCategory(id, icon, name)
			{
				this.categories.push({id, icon, name});
			},

			resetBlocksAndCategories()
			{
				this.blocks = [];
				this.categories = [];

				// Layout
				this.registerBlock(ButtonBlock);
				this.registerBlock(ColumnsBlock);
				this.registerBlock(WrapperBlock);

				// Text
				this.registerBlock(HeadingBlock);
				this.registerBlock(ParagraphBlock);

				// Embeds
				this.registerBlock(YouTubeEmbedBlock);

				defaultCategories.forEach(c => this.registerCategory(c.id, c.icon, c.name));
			},

			render()
			{
				const notNullOrUndefined = (p) =>
				{
					return p !== undefined && p !== null;
				};

				const processGroup = group => group
					.filter(item => notNullOrUndefined(item))
					.map((item, index) =>
					{
						let block = this.blocks
							.filter(b => notNullOrUndefined(b))
							.find(b => b.id === item.id);

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
					})
					.filter(item => notNullOrUndefined(item));

				const blocks = processGroup(this.content);
				const template = document.createElement("div");

				for (let block of blocks)
					template.appendChild(block);

				return this.rendered = template.innerHTML;
			},

			onEditorClick()
			{
				this.$emit("be:reset-settings-pane");
			},

			onInput(content)
			{
				this.content = content;
				this.$emit("input", content);
			},

			onSelectionChanged()
			{
				if (L.util.dom.closest(this.selection.anchorNode, this.$el) === null)
					return;

				this.$emit("be:selection-changed", this.selection);
			}

		},

		watch: {

			value: {
				immediate: true,
				handler()
				{
					this.content = this.value;
				}
			}

		}

	}

</script>
