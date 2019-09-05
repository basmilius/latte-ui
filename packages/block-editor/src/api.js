import hash from "object-hash";
import { swapBlocks } from "./helper/animation";
import { entriesAreDifferent, first } from "./helper/array";
import { placeCaretAtEdge } from "./helper/selection";
import { defaultFocusOptions } from "./block";
import { getLatte } from "./utils";
import { handleComponentError } from "./helper/error";
import { createElement } from "./create-element";

let blockToFocus = undefined;
let blocksToUpdateChildren = [];
let blocksToUpdateEditor = [];
let isTransaction = false;

export class BlockEntry
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
		return this.#block.id !== "root" && (this.#isSelected || (this.#block.canHaveChildren && this.#children.filter(c => c.isSelected).length > 0));
	}

	constructor(editor, index, id, options, children = [], parent = undefined)
	{
		this.#block = editor.blockRegistry.findById(id) || editor.blockRegistry.findById("missing");
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
			this.#children = convertBlocks(this.#editor, children, this);
		else
			this.#children = undefined;

		this.#editor.$on("be:reset-block-selection", () => this.select(false));

		this.calculateHash();
	}

	calculateHash()
	{
		this.#hash = hash({
			p: performance.now(),
			id: this.#id,
			index: this.#index,
			depth: this.#depth,
			options: this.#options
		});
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
		getLatte().util.dom.raf(fn);
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

		const withElement = elm =>
		{
			this.editor.selection.removeAllRanges();

			elm.click();
			elm.focus();

			if (!elm.isContentEditable)
				return;

			if (options.select)
			{
				if (options.selectAll === false)
					placeCaretAtEdge(elm, options.placeAtEnd);
				else
					document.execCommand("selectAll");
			}

			if (fn)
				fn(elm);
		};

		if (this.element)
			return withElement(this.element);

		this.raf(() =>
		{
			if (!this.element)
				return handleComponentError(new Error("Cannot focus, block element is undefined."), "api/focus", {block: this});

			withElement(this.element);
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
		const L = getLatte();

		const rearrange = () =>
		{
			children.splice(this.#index + dir, 0, children.splice(this.#index, 1)[0]);

			this.#parent.setChildren(children, true);
			this.nextTick(() => this.focus());

			this.#isSwapping = false;
		};

		if (!self || !other)
			return;

		if (!animate)
			return rearrange();

		const selfElement = L.util.dom.closest(self.element, ".be-block-mount");
		const otherElement = L.util.dom.closest(other.element, ".be-block-mount");

		swapBlocks({
			firstElement: selfElement,
			secondElement: otherElement,
			scrollingContainer: L.util.dom.closest(selfElement, ".be-content-mount"),
			raf: L.util.dom.raf
		}, () => rearrange());
	}

	remove(focusSibbling = true)
	{
		if (this.#isRemoving)
			return;

		this.#isRemoving = true;

		if (focusSibbling)
		{
			if (this.previousSibbling)
				this.previousSibbling.focus();
			else if (this.nextSibbling)
				this.nextSibbling.focus();
			else
				this.editor.onEditorClick();
		}

		const children = this.#parent.children;
		children.splice(this.#index, 1);

		this.#parent.setChildren(children, true);
	}

	select(is = true)
	{
		if (this.#isRemoving || this.#isSelected === is)
			return;

		this.#isSelected = is;
		this.updateEditor(false, true);
	}

	setChildren(children, updateIndices = false, fn = undefined)
	{
		if (this.#isRemoving)
			return;

		this.#children = children;

		if (updateIndices)
			this.#children.forEach((child, index) => child.#index = index);

		this.calculateHash();
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
		this.calculateHash();
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

		if (!this.context)
			return;

		this.#editor.onInput();

		const blocks = this.context.$children.find(c => c.$options.name === "BEBlocks");

		if (blocks)
			blocks.updateBlocks();
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

}

export class BlockRegistry
{

	#blocks;

	get blocks()
	{
		return this.#blocks
			.filter(b => b.showInInserter);
	}

	constructor(blocks = [])
	{
		this.#blocks = blocks;
	}

	findById(id)
	{
		return first(this.#blocks.filter(b => b.id === id));
	}

	register(block)
	{
		this.#blocks.push(block);
	}

	unregister(block)
	{
		this.#blocks = this.#blocks
			.filter(b => b.id !== block.id);
	}

}

export function convertBlock(editor, index, block, parent = undefined)
{
	return new BlockEntry(editor, index, block.id, block.options, block.children || [], parent);
}

export function convertBlocks(editor, blocks, parent = undefined)
{
	return blocks.map((block, index) => convertBlock(editor, index, block, parent));
}

export function convertToBlocks(editor, data)
{
	return new BlockEntry(editor, -1, "root", {}, data);
}

export function convertToData(root)
{
	return root.children
		.filter(entry => entry !== undefined)
		.map(entry => entry.data());
}

export function convertToHtml(root)
{
	const tmp = document.createElement("div");

	renderChildren(root)
		.forEach(dom => tmp.appendChild(dom));

	return tmp.innerHTML;
}

export function convertToJson(root)
{
	return JSON.stringify(convertToData(root));
}

export function renderChildren(entry)
{
	return entry.children
		.map(child => child.render(createElement))
		.filter(dom => !!dom);
}
