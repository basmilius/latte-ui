<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-popup ref="popup" :associate-with="assiciatedElement" :margin-x="marginX" :margin-y="marginY" @open="onOpen">
		<Inserter @update="onCategoryUpdate" @select="onSelect" v-if="$refs.popup"/>
	</latte-popup>

</template>

<script>

	import { CategoryRegistry } from "../core/category/registry";
	import { Latte } from "../util/latte";
	import { findEditor } from "../util/vue";

	import Inserter from "./Inserter";

	export default {

		name: "InserterPopup",

		components: {Inserter},

		refs: ["popup"],

		data()
		{
			return {
				assiciatedElement: undefined,
				currentCategory: null,
				editor: findEditor(this),
				fn: undefined,
				marginX: 0,
				marginY: 0
			};
		},

		methods: {

			onCategoryUpdate()
			{
				Latte.util.dom.raf(() => this.$refs.popup.calculatePosition());
			},

			onSelect(block)
			{
				this.$emit("select", block);

				if (this.fn)
					this.fn(block);

				Latte.util.dom.raf(() => this.$refs.popup.close(), 90);
			},

			onOpen()
			{
				this.currentCategory = this.currentCategory || CategoryRegistry.categories[0].id;
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
