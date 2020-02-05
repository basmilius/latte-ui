<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="be-editor">

		<InserterPopup ref="inserter"/>
		<InserterQuick ref="inserterQuick"/>

		<div class="be-editor-content">
			<Toolbar>
				<template #start-before><slot name="toolbar-start-before"/></template>
				<template #start-after><slot name="toolbar-start-after"/></template>
				<template #end-before><slot name="toolbar-end-before"/></template>
				<template #end-after><slot name="toolbar-end-after"/></template>
			</Toolbar>
			<Notice icon="information" type="info" is-fluid>
				<template #content="{icon}">
					<div class="container">
						<div class="notice-body">
							<Icon :name="icon"/>
							<p>
								<strong>Work in progress!</strong><br/>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae consequatur cumque dolores placeat tempore ut. Architecto facere facilis inventore laboriosam, laborum quae, reiciendis repudiandae sed tempora tenetur unde voluptate.
							</p>
						</div>
					</div>
				</template>
			</Notice>
			<ContentMount :content="content" v-if="view === 'visual'"/>
			<CodeMount :content="content" v-else-if="view === 'code'"/>
		</div>

		<Settings>
			<template #before><slot name="settings-before"></slot></template>
			<template #document><slot name="settings-document"></slot></template>
			<template #after><slot name="settings-after"></slot></template>
		</Settings>

	</div>

</template>

<script>

	import { convertToBlocks, convertToData } from "..";
	import { Latte } from "../util/latte";

	import CodeMount from "./CodeMount";
	import ContentMount from "./ContentMount";
	import Inserter from "./Inserter";
	import InserterPopup from "./InserterPopup";
	import InserterQuick from "./InserterQuick";
	import Settings from "./Settings";
	import Toolbar from "./Toolbar";
	import Notice from "../ui/Notice";
	import Icon from "../ui/Icon";

	export default {

		name: "Editor",

		components: {Icon, Notice, CodeMount, InserterQuick, InserterPopup, Inserter, ContentMount, Settings, Toolbar},

		props: {
			value: {default: () => [], type: Array}
		},

		refs: ["inserter", "inserterQuick"],

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

		},

		watch: {

			value()
			{
				this.onValueChanged();
			}

		}

	}

</script>
