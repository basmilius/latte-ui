/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { defaultFocusOptions } from "./options";
import { BlockRegistry } from "./registry";
import { convertBlocks } from "./api";
import { Latte } from "../../util/latte";
import { swapBlocks } from "../../util/animation";
import { lastSelectionRange, placeCaretAtEdge, saveLastSelection } from "../../util/selection";
import { handleComponentError } from "../../util/error";
import { entriesAreDifferent } from "../../util/array";

let blockToFocus = undefined;
let blocksToUpdateChildren = [];
let blocksToUpdateEditor = [];
let isTransaction = false;

export class BlockInstance
{

	#hash;
	#block;
	#editor;
	#id;
	#depth;
	#index;
	#children;
	#options;
	#parent;

	#node;

	#isRemoving = false;
	#isSelected = false;
	#isSwapping = false;

	get hash()
	{
		return this.#hash;
	}

	get block()
	{
		return this.#block;
	}

	get editor()
	{
		return this.#editor;
	}

	get id()
	{
		return this.#id;
	}

	get depth()
	{
		return this.#depth;
	}

	get index()
	{
		return this.#index;
	}

	get children()
	{
		return this.#children;
	}

	get options()
	{
		return this.#options;
	}

	get nextSibbling()
	{
		return this.getRelative(1);
	}

	get previousSibbling()
	{
		return this.getRelative(-1);
	}

	get context()
	{
		return this.#node ? this.#node.context : undefined;
	}

	get element()
	{
		return this.#node ? this.#node.elm : undefined;
	}

	get parent()
	{
		return this.#parent;
	}

	get isFirst()
	{
		return this.#parent ? this.index === 0 : false;
	}

	get isLast()
	{
		return this.#parent ? this.index === this.#parent.children.length - 1 : false;
	}

	get isRemoving()
	{
		return this.#isRemoving;
	}

	get isSelected()
	{
		if (this.#block.id === "root")
			return false;

		return this.#isSelected && !this.containsAnythingSelected;
	}

	get isSelectionInside()
	{
		if (this.#block.id === "root")
			return false;

		return this.#isSelected || this.containsAnythingSelected;
	}

	get containsAnythingSelected()
	{
		return this.#block.canHaveChildren && this.#children.filter(c => c.isSelected || c.isSelectionInside).length > 0;
	}

	constructor(editor, index, id, options, children = [], parent = undefined)
	{
		this.#block = BlockRegistry.findById(id) || BlockRegistry.findById("missing");
		this.#editor = editor;
		this.#id = id;
		this.#depth = parent ? parent.#block.canHaveGroups ? parent.depth : parent.depth + 1 : 0;
		this.#index = index;
		this.#options = Object.assign({}, this.#block.defaultOptions, options);
		this.#parent = parent;

		if (this.#block.canHaveGroups)
			children = children.map(g => ({
				id: this.#block.groupBlock,
				children: g
			}));

		if (this.#block.canHaveChildren)
			this.#children = convertBlocks(editor, children, this);
		else
			this.#children = undefined;

		editor.$on("be:reset-block-selection", () => this.select(false));

		this.calculateHash();
	}

	calculateHash()
	{
		this.#hash = Latte.api.id();
	}

	data()
	{
		const data = {
			id: this.#id,
			options: this.#options
		};

		if (this.#block.canHaveGroups)
			data.children = this.#children.map(c => c.children.map(d => d.data()));
		else if (this.#block.canHaveChildren)
			data.children = this.#children.map(c => c.data());

		return data;
	}

	nextTick(fn)
	{
		if (this.context)
			this.context.$nextTick(fn);
	}

	raf(fn)
	{
		Latte.util.dom.raf(fn);
	}

	transaction(fn)
	{
		isTransaction = true;

		fn();

		isTransaction = false;

		while (blocksToUpdateEditor.length > 0)
			blocksToUpdateEditor.shift().updateEditor();

		while (blocksToUpdateChildren.length > 0)
			blocksToUpdateChildren.shift().updateChildren();

		if (blockToFocus)
		{
			blockToFocus[0].focus(blockToFocus[1], blockToFocus[2]);
			blockToFocus = undefined;
		}
	}

	focus(options = defaultFocusOptions, fn = undefined)
	{
		if (isTransaction)
			return blockToFocus = [this, options, fn];

		options = Object.assign(defaultFocusOptions, options || {});

		this.withElement(elm =>
		{
			this.#editor.selection.removeAllRanges();

			elm.click();
			elm.focus();

			if (elm.isContentEditable && options.select)
			{
				if (options.selectAll === false)
					placeCaretAtEdge(elm, options.placeAtEnd);
				else
					document.execCommand("selectAll");
			}

			if (fn)
				fn(elm);
		});
	}

	focusAndExecute(fn)
	{
		this.focus({select: false}, () =>
		{
			if (lastSelectionRange)
			{
				this.#editor.selection.setBaseAndExtent(
					lastSelectionRange.startContainer,
					lastSelectionRange.startOffset,
					lastSelectionRange.endContainer,
					lastSelectionRange.endOffset
				);
			}

			fn();
			saveLastSelection(this);
		});
	}

	getRelative(dir)
	{
		return this.#parent.children[this.#index + dir] || undefined;
	}

	insertBlock(id, index = undefined, options = {}, focusOptions = defaultFocusOptions, parent = undefined)
	{
		this.insertBlocks([{id, options}], index, focusOptions, true, parent);
	}

	insertBlocks(spec, index = undefined, focusOptions = defaultFocusOptions, focusLast = true, parent = undefined)
	{
		parent = parent || this.#parent;

		const blocks = convertBlocks(this.#editor, spec, parent);
		const children = parent.children;

		if (index === undefined)
			children.push(...blocks);
		else
			children.splice(index, 0, ...blocks);

		parent.setChildren(children, true);

		if (!focusOptions)
			return;

		blocks[focusLast ? blocks.length - 1 : 0].focus(focusOptions);
	}

	rearrange(dir, animate = true)
	{
		if (this.#isRemoving || this.#isSwapping)
			return;

		this.#isSwapping = true;

		const children = this.#parent.children;
		const self = children[this.#index];
		const other = children[this.#index + dir];

		const rearrange = () =>
		{
			children.splice(this.#index + dir, 0, children.splice(this.#index, 1)[0]);

			this.#parent.setChildren(children, true);
			this.focusAndExecute(() => this.raf(() => this.#isSwapping = false));
		};

		if (!self || !other)
			return;

		if (!animate)
			return rearrange();

		swapBlocks({
			firstElement: self.element,
			secondElement: other.element,
			scrollingContainer: this.#editor.$el.querySelector(".be-editor-content")
		}, () => rearrange());
	}

	remove(focusSibbling = true)
	{
		if (this.#isRemoving)
			return;

		this.#isRemoving = true;

		this.editor.inserter.close();

		if (focusSibbling)
		{
			if (this.previousSibbling)
				this.previousSibbling.focus();
			else if (this.nextSibbling)
				this.nextSibbling.focus();
			else
				this.#editor.$emit("be:reset-block-selection");
		}

		const children = this.#parent.children;
		children.splice(this.#index, 1);

		this.#parent.setChildren(children, true);
	}

	select(is = true)
	{
		if (this.#isRemoving || this.#isSelected === is)
			return;

		if (is)
			this.#editor.$emit("be:reset-block-selection");

		this.raf(() =>
		{
			this.#isSelected = is;
			this.updateEditor(false, true);
		});
	}

	setChildren(children, updateIndices = false, fn = undefined)
	{
		if (this.#isRemoving)
			return;

		this.#children = children;

		if (updateIndices)
		{
			this.#children.forEach((child, index) =>
			{
				child.#index = index;
				child.updateEditor(false);
			});
		}

		this.updateChildren();

		if (fn)
			fn();
	}

	setOptions(options, fn = undefined)
	{
		if (this.#isRemoving)
			return;

		if (!entriesAreDifferent(this.#options, options))
		{
			if (fn)
				fn();

			return;
		}

		this.#options = Object.assign({}, this.#options, options);
		this.updateEditor();

		if (fn)
			fn();
	}

	render(h)
	{
		return this.block.render(h, this);
	}

	renderEditor(h)
	{
		return this.#node = this.block.renderEditor(h, this);
	}

	updateChildren()
	{
		if (this.#isRemoving)
			return;

		if (isTransaction)
			return blocksToUpdateChildren.push(this);

		this.#editor.onInput();

		if (this.context)
			this.context.$forceUpdate();
	}

	updateEditor(dataUpdate = true, bubble = false)
	{
		if (this.#isRemoving)
			return;

		if (isTransaction)
			return blocksToUpdateEditor.push(this);

		if (bubble && this.#parent)
			this.#parent.updateEditor(dataUpdate, bubble);

		if (dataUpdate)
			this.#editor.onInput();

		if (this.context)
			this.context.$forceUpdate();
	}

	withElement(fn)
	{
		if (this.element)
			return fn(this.element);

		this.raf(() =>
		{
			if (!this.element)
				return handleComponentError(new Error("Failed, element not found."), "api/withElement", {block: this});

			fn(this.element);
		});
	}

}
