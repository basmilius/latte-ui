<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="app-bar app-bar-flat be-toolbar">
		<div class="app-bar-row">

			<slot name="start-before"></slot>
			<Button type="text" color="primary" icon-before="plus-circle" aria-tooltip="Insert a new block." :disabled="editor.view !== 'visual'" @click="launchInserter"/>
			<div class="divider divider-vertical"></div>
			<Button type="text" icon-before="undo-variant" aria-tooltip="Undo" disabled/>
			<Button type="text" icon-before="redo-variant" aria-tooltip="Redo" disabled/>
			<slot name="start-after"></slot>

			<div class="mx-auto">
				<latte-portal-target name="toolbar-center"/>
			</div>

			<slot name="end-before"></slot>
			<Button type="text" icon-before="eye" aria-tooltip="View visual" v-if="editor.view === 'code'" @click="editor.view = 'visual'"/>
			<Button type="text" icon-before="code-tags" aria-tooltip="View code" v-if="editor.view === 'visual'" @click="editor.view = 'code'"/>
			<div class="divider divider-vertical"></div>
			<Button type="text" icon-before="dots-vertical" aria-tooltip="More options..."/>
			<slot name="end-after"></slot>

		</div>
	</div>

</template>

<script>

	import { findEditor } from "../util/vue";

	import Button from "../ui/Button";

	export default {

		name: "Toolbar",

		components: {Button},

		data()
		{
			return {
				editor: findEditor(this)
			};
		},

		methods: {

			launchInserter(evt)
			{
				this.editor.inserter.open(evt.target, block =>
				{
					this.editor.content.insertBlock(block.id, undefined, {}, {}, this.editor.content);
				}, -15, 12);
			}

		}

	}

</script>
