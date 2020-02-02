<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="be-content-mount" @click="onContentClick" v-if="content">
		<div class="be-content-wrapper">
			<BlockView :instance="content"/>
		</div>
	</div>

</template>

<script>

	import { BlockInstance } from "../core/block/instance";
	import { findEditor } from "../util/vue";

	import BlockView from "./BlockView";

	export default {

		name: "ContentMount",

		components: {BlockView},

		props: {
			content: {required: true, type: BlockInstance | null}
		},

		data()
		{
			return {
				editor: findEditor(this)
			};
		},

		methods: {

			onContentClick()
			{
				this.editor.$emit("be:reset-block-selection");
			}

		}

	}

</script>
