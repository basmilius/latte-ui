<template>

	<div class="be-editor" spellcheck="false">

		<div class="be-content-pane" @click.capture="onEditorClick">
			<BEToolbar ref="toolbar">
				<template #before>
					<slot name="toolbar-before"></slot>
				</template>
				<template #after>
					<span class="text-muted">Last update: {{ moment(lastUpdate).format("HH:mm:ss.SSSS") }} ({{ updateCount }})</span>
					<slot name="toolbar-after"></slot>
				</template>
			</BEToolbar>

			<div class="be-content-mount">
				<div class="be-content-wrapper be-editing">
					<BEBlockMount :entry="content" v-if="content"/>
				</div>
			</div>
		</div>

		<BEInserterList ref="inserterList"/>
		<BEInserterPopup ref="inserter"/>

		<BESettingsPane>
			<template #before="api">
				<slot name="settings-pane-before" v-bind="api"></slot>
			</template>
			<template #after="api">
				<slot name="settings-pane-after" v-bind="api"></slot>
			</template>
		</BESettingsPane>

	</div>

</template>

<script>

	/*
	TODO
	 - Editor needs to emit an input event when content changes, but there is nothing that can do that at this moment.
	 */

	import { defaultCategories } from "./block";
	import { getLatte } from "./utils";
	import * as DefaultBlocks from "./blocks";

	import BEBlocks from "./BEBlocks";
	import BEInserterExpanded from "./BEInserterExpanded";
	import BEInserterList from "./BEInserterList";
	import BEInserterPopup from "./BEInserterPopup";
	import BESettingsPane from "./BESettingsPane";
	import BEToolbar from "./BEToolbar";

	import { BlockRegistry, convertToBlocks, convertToHtml, convertToJson } from "./api";
	import { CategoryRegistry } from "./categories";
	import BEBlockMount from "./BEBlockMount";

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
			BEBlockMount,
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
			Object.values(DefaultBlocks).forEach(block => this.blockRegistry.register(new block()));
			defaultCategories.forEach(category => this.categoryRegistry.register(category));
		},

		destroyed()
		{
			document.removeEventListener("selectionchange", this.onSelectionChanged);
		},

		data()
		{
			return {
				lastUpdate: Date.now(),
				updateCount: 0,
				uniqueId: L.api.id(),
				blockRegistry: new BlockRegistry(),
				categoryRegistry: new CategoryRegistry(),
				canUpdate: true,
				content: undefined,
				selection: window.getSelection()
			};
		},

		mounted()
		{
			document.addEventListener("selectionchange", this.onSelectionChanged, {passive: true});
			document.execCommand("defaultParagraphSeparator", false, "div");

			this.onValueChanged();
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

			toolbar()
			{
				return this.$refs.toolbar;
			}

		},

		methods: {

			onEditorClick(evt = undefined)
			{
				if (evt && L.util.dom.closest(evt.target, ".be-options-side") !== null)
					return;

				if (evt && L.util.dom.closest(evt.target, ".be-toolbar") !== null)
					return;

				this.$emit("be:reset-block-selection");
			},

			onInput()
			{
				this.$emit("be:content-ready", this.content);
				this.lastUpdate = Date.now();
				this.updateCount++;

				console.clear();
				console.log(convertToJson(this.content));
				console.log(convertToHtml(this.content));

				// this.canUpdate = false;
				//
				// this.$emit("input", convertToData(this.content));
				// this.$nextTick(() => this.canUpdate = true);
			},

			onSelectionChanged()
			{
				/** @var {*} anchorElement */
				const anchorElement = this.selection.anchorNode;

				if (L.util.dom.closest(anchorElement, this.$el) === null)
					return;

				this.$emit("be:selection-changed", this.selection);
			},

			onValueChanged()
			{
				if (!this.canUpdate)
					return;

				this.content = convertToBlocks(this, this.value);
				this.$emit("be:content-ready");
				this.onInput();
			}

		},

		watch: {

			value()
			{
				this.onValueChanged();
			}

		}

	}

</script>
