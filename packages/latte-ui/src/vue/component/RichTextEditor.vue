<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<style lang="scss">

	div.rich-text-editor
	{
		display: flex;
		align-items: stretch;
		flex-flow: column nowrap;
		justify-content: flex-start;
		z-index: 0;

		div.rte-toolbar
		{
			position: sticky;
			top: var(--app-bar-height);
			flex: 0 0 auto;
			border-bottom: 1px solid var(--outline-color-secondary);
			border-top-left-radius: var(--border-radius);
			border-top-right-radius: var(--border-radius);
			overflow: hidden;
			z-index: 1;

			div.panel-header
			{
				min-height: 48px;
				padding: 0 9px;
				background: var(--panel-background);
				border: none;
			}

			button.btn.is-active
			{
				background: RGBA(var(--btn-background, var(--color-primary)), .05);
			}
		}

		div.rte-frame
		{
			position: relative;
			display: flex;
			align-items: stretch;
			flex: 1 1 auto;
			justify-content: flex-start;
			border-bottom-left-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
			overflow: hidden;

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
				overflow: auto;
			}
		}
	}

</style>

<template>

	<div class="panel panel-blank rich-text-editor" :class="{'is-focused': isFocused}" style="min-height: 300px">
		<div class="rte-toolbar">
			<div class="panel-header" v-for="(row, rowIndex) of toolbarRows" v-if="toolbar.enabled">

				<template v-for="el of row">

					<div class="divider divider-vertical" v-if="el.type === 'separator'"></div>
					<div class="btn-group" v-else-if="el.type === 'group'">
						<button class="btn btn-icon btn-text btn-dark m-0" :class="{'is-active': a.action.isActive || false}" @click="onToolbarActionClick($event, a.action)" :data-tooltip="a.action.label" v-for="a of el.actions"><i class="mdi" :class="[`mdi-${a.action.icon}`]"></i></button>
					</div>
					<button class="btn btn-icon btn-text btn-dark m-0" :class="{'is-active': el.action.isActive || false}" @click="onToolbarActionClick($event, el.action)" :data-tooltip="el.action.label" v-else-if="el.type === 'action'"><i class="mdi" :class="[`mdi-${el.action.icon}`]"></i></button>

				</template>

				<template v-if="rowIndex === 0">
					<div class="divider divider-vertical ml-auto"></div>
					<div class="btn-group">
						<button class="btn btn-icon btn-text btn-dark m-0" data-tooltip="More..."><i class="mdi mdi-dots-vertical"></i></button>
					</div>
				</template>

			</div>
		</div>
		<div class="rte-frame">
			<div class="rte-frame-placeholder" v-if="isPlaceholderShown">Type something here&hellip;</div>
			<div class="rte-frame-content" contenteditable spellcheck="false" ref="editableContent" @blur="onBlur" @focus="onFocus" @keydown="onKeyDown" @keyup="onKeyUp"></div>
		</div>
		<component :is="plugin" :key="key" v-for="(plugin, key) of plugins"></component>
	</div>

</template>

<script>

	import { closest } from "../../js/util/dom";

	const defaultPlugins = ["RTEBasicFormattingPlugin", "RTEAlignmentPlugin", "RTEMentionsPlugin"];
	const domObserverConfig = {attributes: true, childList: true, subtree: true};

	export default {

		name: "latte-rich-text-editor",

		props: {

			plugins: {
				default: () => defaultPlugins,
				required: false,
				type: Array
			},

			value: {
				default: "<p><br></p>",
				required: false,
				type: String
			}

		},

		destroyed()
		{
			if (this.domObserver !== null)
				this.domObserver.disconnect();
		},

		data()
		{
			return {
				commands: [],
				toolbar: {
					enabled: true,
					rows: []
				},
				html: this.value,
				text: "",
				domObserver: null,
				isFocused: false,
				isMutationsAllowed: true
			};
		},

		mounted()
		{
			this.initialize();

			this.addToolbarAction("indent-increase", "format-indent-increase", "Indent", 0, {groupId: "indention"});
			this.addToolbarAction("indent-decrease", "format-indent-decrease", "Outdent", 0, {groupId: "indention"});

			this.addToolbarAction("extra-image", "image", "Insert image...", 0, {groupId: "extra"});
			this.addToolbarAction("extra-link", "link", "Insert link...", 0, {groupId: "extra"});
			this.addToolbarAction("extra-code", "code-braces", "Insert code...", 0, {groupId: "extra"});
			this.addToolbarAction("extra-plus", "plus", "Insert...", 0, {groupId: "extra"});
		},

		computed: {

			editableContent()
			{
				return this.$refs.editableContent;
			},

			isPlaceholderShown()
			{
				return this.text.trim() === "";
			},

			toolbarRows()
			{
				const definitions = [];

				for (let row of this.toolbar.rows)
				{
					let rd = [];

					for (let action of row)
					{
						if (action.groupId)
						{
							let groupIndex = rd.findIndex(g => g.type === "group" && g.group.id === action.groupId);

							if (groupIndex === -1)
							{
								if (rd.length > 0)
									rd.push({type: "separator"});

								groupIndex = rd.length;

								rd.push({type: "group", actions: [], group: {id: action.groupId}});
							}

							rd[groupIndex].actions.push({type: "action", action});
						}
						else
						{
							if (rd.length > 0)
								rd.push({type: "separator"});

							rd.push({type: "action", action});
						}
					}

					definitions.push(rd);
				}

				return definitions;
			}

		},

		methods: {

			initialize()
			{
				this.editableContent.innerHTML = this.html;
				this.text = this.editableContent.innerText;

				this.domObserver = new MutationObserver(mutations => this.onContentChanged(mutations));
				this.domObserver.observe(this.editableContent, domObserverConfig);

				document.addEventListener("selectionchange", evt => this.onSelectionChanged(evt));
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

			addToolbarAction(id, icon, label, row = 0, options = {})
			{
				while (this.toolbar.rows[row] === undefined)
					this.toolbar.rows.push([]);

				this.toolbar.rows[row].push({id, icon, label, ...options});
			},

			executeCommand(id, ...params)
			{
				const command = this.commands.find(c => c.id === id);

				if (!command)
					return;

				this.isMutationsAllowed = false;
				this.editableContent.focus();
				command.fn(...params);
				this.isMutationsAllowed = true;
				this.onContentChanged();
			},

			getToolbarAction(id)
			{
				let action;

				for (let row of this.toolbar.rows)
					if ((action = row.find(a => a.id === id)) !== null)
						return action;

				return undefined;
			},

			registerCommand(id, fn)
			{
				this.commands.push({id, fn});
			},

			removeEmptyness()
			{
				this.isMutationsAllowed = false;

				this.$emit("remove-emptyness");
				this.editableContent.querySelectorAll("p:empty").forEach(el => el.remove());

				this.isMutationsAllowed = true;
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
			},

			onSelectionChanged(evt)
			{
				const selection = window.getSelection();

				if (closest(selection.anchorNode, this.$el) === null)
					return;

				this.$emit("selection-changed", selection, evt);
			},

			onToolbarActionClick(evt, action)
			{
				this.$emit("toolbar-action", evt, action);
				this.$emit(`toolbar-action:${action.id}`, evt, action);
			}

		},

		watch: {

			html()
			{
				if (this.html === "")
					this.html = "<p><br></p>";

				this.$emit("input", this.html);
			},

			isMutationsAllowed()
			{
				if (this.isMutationsAllowed)
					this.domObserver.observe(this.editableContent, domObserverConfig);
				else
					this.domObserver.disconnect();
			},

			value()
			{
				this.editableContent.innerHTML = this.html;
				this.text = this.editableContent.innerText;
			}

		}

	}

</script>
