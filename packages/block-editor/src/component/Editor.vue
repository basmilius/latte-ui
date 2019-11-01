<template>

	<div class="be-editor">

		<InserterPopup ref="inserter"/>
		<InserterQuick ref="inserterQuick"/>

		<div class="be-editor-content">
			<Toolbar/>
			<ContentMount :content="content" v-if="view === 'visual'"/>
			<CodeMount :content="content" v-else-if="view === 'code'"/>
		</div>

		<Settings>
			<template #settings-before>
				<slot name="settings-before"></slot>
			</template>
			<template #settings-document>
				<slot name="settings-document"></slot>
			</template>
			<template #settings-after>
				<slot name="settings-after"></slot>
			</template>
		</Settings>

	</div>

</template>

<script>

	import { convertToBlocks, convertToData } from "../core/block/api";
	import { Latte } from "../util/latte";

	import ContentMount from "./ContentMount";
	import Inserter from "./Inserter";
	import InserterPopup from "./InserterPopup";
	import InserterQuick from "./InserterQuick";
	import Settings from "./Settings";
	import Toolbar from "./Toolbar";
	import CodeMount from "./CodeMount";

	export default {

		name: "Editor",

		components: {CodeMount, InserterQuick, InserterPopup, Inserter, ContentMount, Settings, Toolbar},

		props: {
			value: {default: () => [], type: Array}
		},

		data()
		{
			return {
				uniqueId: Latte.api.id(),
				lastUpdate: {
					count: 0,
					timestamp: Date.now()
				},
				content: null,
				selection: window.getSelection(),
				view: "visual"
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

			inserterQuick()
			{
				return this.$refs.inserterQuick;
			}

		},

		methods: {

			onInput()
			{
				this.$emit("be:content-ready", this.content);
				this.$emit("change", convertToData(this.content));

				this.lastUpdate.count++;
				this.lastUpdate.timestamp = Date.now();
			},

			onSelectionChanged()
			{
				/** @var {*} anchorElement */
				const anchorElement = this.selection.anchorNode;

				if (Latte.util.dom.closest(anchorElement, this.$el) === null)
					return;

				this.$emit("be:selection-changed", this.selection);
			},

			onValueChanged()
			{
				this.content = convertToBlocks(this, this.value);
				this.$emit("be:content-ready");
			}

		}

	}

</script>
