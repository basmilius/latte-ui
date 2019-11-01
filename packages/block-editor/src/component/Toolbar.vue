<template>

	<div class="app-bar app-bar-flat be-toolbar">
		<div class="app-bar-row">

			<slot name="start-before"></slot>
			<Button type="text" color="primary" icon-before="plus-circle" @click="launchInserter"/>
			<div class="divider divider-vertical"></div>
			<Button type="text" icon-before="undo" disabled/>
			<Button type="text" icon-before="redo" disabled/>
			<slot name="start-after"></slot>

			<div class="mx-auto"></div>

			<slot name="end-before"></slot>
			<Button type="text" icon-before="dots-vertical"/>
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
