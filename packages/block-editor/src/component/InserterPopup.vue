<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-popup ref="popup" :associate-with="assiciatedElement" :margin-x="marginX" :margin-y="marginY" @close="onClose" @open="onOpen">
		<Inserter @select="onSelect"/>
	</latte-popup>

</template>

<script>

	import { CategoryRegistry } from "../core/category/registry";
	import { findEditor } from "../util/vue";

	import Inserter from "./Inserter";

	export default {

		name: "InserterPopup",

		components: {Inserter},

		data()
		{
			return {
				assiciatedElement: undefined,
				currentCategory: null,
				editor: findEditor(this),
				fn: undefined,
				isOpen: false,
				marginX: 0,
				marginY: 0
			};
		},

		methods: {

			onSelect(block)
			{
				this.$emit("select", block);

				if (this.fn)
					this.fn(block);

				this.close();
			},

			onClose()
			{
				this.isOpen = false;
			},

			onOpen()
			{
				this.currentCategory = this.currentCategory || CategoryRegistry.categories[0].id;
				this.isOpen = true;
			},

			close()
			{
				this.$refs.popup.close();
			},

			open(associateWith, fn, marginX = 0, marginY = 0)
			{
				this.assiciatedElement = associateWith;
				this.fn = fn;
				this.marginX = marginX;
				this.marginY = marginY;
				this.$refs.popup.open();
			}

		}

	}

</script>
