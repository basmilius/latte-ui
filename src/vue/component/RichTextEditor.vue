<!--
  - Copyright © 2018 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<style lang="scss">

	div.rich-text-editor
	{
		div.panel-header.rte-toolbar
		{
			min-height: 54px;
			border: none;
		}

		div.rte-frame
		{
			position: relative;
			display: flex;
			align-items: stretch;
			justify-content: flex-start;
			border-top: 2px solid var(--outline-color-secondary);

			div.rte-frame-placeholder
			{
				position: absolute;
				display: block;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 24px;
				opacity: .5;
			}

			div.rte-frame-content
			{
				position: relative;
				display: block;
				padding: 24px;
				flex: 1 1 0;
				outline: none;
			}
		}
	}

</style>

<template>

	<div class="panel panel-blank rich-text-editor" :class="{'is-focused': isFocused}">
		<div class="panel-header rte-toolbar">
			<div class="btn-group">
				<button class="btn btn-text btn-dark"><span>Proxima Nova</span></button>
				<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-chevron-down"></i></button>
			</div>
			<div class="divider divider-vertical mx-3"></div>
			<div class="btn-group">
				<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-format-bold"></i></button>
				<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-format-italic"></i></button>
				<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-format-underline"></i></button>
			</div>
		</div>
		<div class="rte-frame" style="min-height: 300px">
			<div class="rte-frame-placeholder" v-if="isPlaceholderShown">Type something here&hellip;</div>
			<div class="rte-frame-content" contenteditable ref="editableContent" @blur="onBlur" @focus="onFocus" @keydown="onKeyDown" @keyup="onKeyUp"></div>
		</div>
		<component :is="plugin" :key="key" v-for="(plugin, key) of plugins"></component>
	</div>

</template>

<script>

	export default {

		name: "latte-rich-text-editor",

		props: {

			plugins: {
				default: () => ["RTEMentionsPlugin"],
				required: false,
				type: Array
			},

			value: {
				default: "<p><br></p>",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				html: this.value,
				text: "",
				isFocused: false
			};
		},

		mounted()
		{
			this.initialize();
		},

		computed: {

			editableContent()
			{
				return this.$refs.editableContent;
			},

			isPlaceholderShown()
			{
				return this.text.trim() === "";
			}

		},

		methods: {

			initialize()
			{
				this.editableContent.addEventListener("DOMSubtreeModified", () => this.onContentChanged());
				this.editableContent.innerHTML = this.html;
				this.text = this.editableContent.innerText;

				document.execCommand("defaultParagraphSeparator", false, "p");
				document.execCommand("styleWithCSS", true);
			},

			addElementAtCursor(el)
			{
				const selection = window.getSelection();

				if (selection.rangeCount > 0)
				{
					const range = selection.getRangeAt(0);
					range.deleteContents();
					range.insertNode(el);
				}
				else
				{
					this.editableContent.appendChild(el);
				}
			},

			removeEmptyness()
			{
				this.$emit("remove-emptyness");

				this.editableContent.querySelectorAll("p:empty").forEach(el => el.remove());
			},

			setSelection(el, offset = 0, collapse = true)
			{
				const range = document.createRange();
				const selection = window.getSelection();

				range.setStart(el, offset);
				range.collapse(collapse);
				selection.removeAllRanges();
				selection.addRange(range);
			},

			setSelectionAfter(el, collapse = false, char = "\u00A0")
			{
				if (char === " ")
					char = "\u00A0";

				const range = document.createRange();
				const selection = window.getSelection();
				let dummy = document.createTextNode(char);

				if (el.nextSibling && !(el.nextSibling instanceof HTMLBRElement) && el.nextSibling.wholeText !== "")
				{
					range.setStart(el.nextSibling, 1);
				}
				else
				{
					if (el.nextSibling)
						el.parentNode.insertBefore(dummy, el.nextSibling);
					else
						el.parentNode.appendChild(dummy);

					range.setStartAfter(dummy);
				}

				range.collapse(collapse);

				selection.removeAllRanges();
				selection.addRange(range);
			},

			setSelectionBefore(el, collapse = false)
			{
				const range = document.createRange();
				const selection = window.getSelection();

				range.setStartBefore(el);
				range.collapse(collapse);

				selection.removeAllRanges();
				selection.addRange(range);
			},

			onBlur()
			{
				this.isFocused = false;
				this.$emit("blur");
			},

			onContentChanged()
			{
				this.removeEmptyness();

				this.html = this.editableContent.innerHTML;
				this.text = this.editableContent.innerText;

				if (this.isPlaceholderShown && this.isFocused)
				{
					document.execCommand("selectAll", false, null);
					document.execCommand("removeFormat", false, null);
				}
			},

			onFocus()
			{
				this.isFocused = true;
				this.$emit("focus");
			},

			onKeyDown(evt)
			{
				this.$emit("keydown", evt);
			},

			onKeyUp(evt)
			{
				this.$emit("keyup", evt);
			}

		},

		watch: {

			html()
			{
				if (this.html === "")
					this.html = "<p><br></p>";

				this.$emit("input", this.html);
			},

			value()
			{
				this.editableContent.innerHTML = this.html;
				this.text = this.editableContent.innerText;
			}

		}

	}

</script>
