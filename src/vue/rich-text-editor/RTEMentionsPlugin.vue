<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-popup :associate-with="span || undefined" :margin-x="-30" :margin-y="9" ref="popup">

		<nav class="nav nav-list">
			<a class="nav-link" v-for="mention of mentionsFiltered"><span>{{ mention }}</span></a>
			<div class="section" v-if="mentionsFiltered.length === 0">No results...</div>
		</nav>

	</latte-popup>

</template>

<script>

	import { createElement } from "../../js/util/dom";

	export default {

		name: "RTEMentionsPlugin",

		data()
		{
			return {
				isLookingForMentions: false,
				span: null,
				text: "",
				mentions: [
					"Bas Milius",
					"Martijn Woolschot",
					"Jorden Willemsen",
					"Ynze Hettema",
					"Fleur Nijhuis",
					"Geert Milius",
					"Nina Milius"
				]
			};
		},

		mounted()
		{
			// this.$parent.$on("blur", () => this.moveOut());
			this.$parent.$on("keydown", evt => this.onEditorKeyDown(evt));
			this.$parent.$on("keyup", evt => this.onEditorKeyUp(evt));
			this.$parent.$on("remove-emptyness", () => this.onRemoveEmptyness());
		},

		computed: {

			mentionsFiltered()
			{
				return this.mentions.filter(m => m.toLowerCase().startsWith(this.text.toLowerCase())).slice(0, 3);
			}

		},

		methods: {

			moveOut(evt)
			{
				if (this.span === null)
					return;

				if (evt && evt.key.length === 1)
					this.$parent.setSelectionAfter(this.span, false, evt.key);
				else
					this.$parent.setSelectionAfter(this.span);

				if (this.span.innerText.trim() === "@")
					this.span.remove();

				this.text = "";
				this.span = null;
			},

			onEditorKeyDown(evt)
			{
				const shouldCancel = evt.key === "Escape" || (evt.key === "Backspace" && this.text === "") || (evt.key !== "@" && evt.key.match("[a-zA-Z0-9-_ ]") === null);

				if (this.isLookingForMentions && shouldCancel)
				{
					evt.preventDefault();
					this.moveOut(evt);
				}

				this.isLookingForMentions = (this.isLookingForMentions || evt.key === "@") && !shouldCancel;

				if (evt.key === "@")
				{
					evt.preventDefault();

					this.span = createElement("span", span =>
					{
						span.classList.add("rte-mention");
						span.innerHTML = "@";
					});

					this.$parent.addElementAtCursor(this.span);
					this.$parent.setSelection(this.span, 1);
				}
			},

			onEditorKeyUp()
			{
				if (!this.isLookingForMentions)
					return;

				const el = window.getSelection().anchorNode;
				const offset = window.getSelection().anchorOffset;

				if (!(el instanceof Text))
					return;

				this.text = el.splitText(offset).wholeText.substr(1);
			},

			onRemoveEmptyness()
			{
				this.$parent.editableContent.querySelectorAll("span.rte-mention:empty").forEach(el => el.remove());
			}

		},

		watch: {

			isLookingForMentions()
			{
				if (this.isLookingForMentions)
					this.$refs.popup.open();
				else
					this.$refs.popup.close();
			}

		}

	}

</script>

<style lang="scss">

	div.rich-text-editor span.rte-mention
	{
		color: RGB(var(--color-primary));
		font-weight: 500;
	}

</style>
