import { placeCaretAtEdge } from "./helper/selection";
import { getLatte, replaceIndex } from "./utils";

export const defaultCategories = [
	{id: "layout", icon: "layers", name: "Layout"},
	{id: "text", icon: "format-text", name: "Text"},
	{id: "embeds", icon: "code-tags", name: "Embeds"},
	{id: "other", icon: "package-variant", name: "Other"}
];

export const defaultFocusData = {
	placeAtEnd: true,
	select: true,
	selectAll: false
};

export class BlockBase
{

	get id()
	{
		return this._id;
	}

	get canHaveChildren()
	{
		return false;
	}

	get category()
	{
		return this._category;
	}

	get icon()
	{
		return this._icon;
	}

	get description()
	{
		return undefined;
	}

	get keywords()
	{
		return [this.id];
	}

	get name()
	{
		return this._id;
	}

	constructor(id, category, icon)
	{
		this._id = id;
		this._category = category;
		this._icon = icon;
	}

	render(h, api)
	{
		return undefined;
	}

	renderEditor(h, api)
	{
		return undefined;
	}

	renderOptions(h, api)
	{
		return undefined;
	}

}

export class BlockAPI
{

	#block;
	#children;
	#group;
	#index;
	#item;
	#options;

	#blockNode = null;
	#isRemoved = false;

	get block()
	{
		return this.#block;
	}

	get blockId()
	{
		return this.#block.id;
	}

	get blockNode()
	{
		return this.#blockNode;
	}

	get children()
	{
		return this.#children;
	}

	get depth()
	{
		return this.#group.depth + 1;
	}

	get editor()
	{
		return this.#group.editor;
	}

	get elm()
	{
		return this.#blockNode.elm;
	}

	get group()
	{
		return this.#group;
	}

	get index()
	{
		return this.#index;
	}

	get isRemoved()
	{
		return this.#isRemoved;
	}

	get isSelected()
	{
		return this.#group.selectedIndex === this.#index;
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

	set isRemoved(value)
	{
		this.#isRemoved = value;
	}

	constructor(block, group, index, item)
	{
		this.#block = block;
		this.#blockNode = undefined;
		this.#group = group;
		this.#index = index;
		this.#item = item;

		this.#children = this.normalizeChildren(item.children);
		this.#options = this.normalizeOptions(item.options);
	}

	normalizeChildren(children)
	{
		return this.#block.canHaveChildren ? children || [] : undefined;
	}

	normalizeOptions(options)
	{
		return Object.assign({}, this.#block.defaultOptions || {}, options);
	}

	renderEditor(h)
	{
		return this.#blockNode = this.#block.renderEditor(h, this);
	}

	ensure(fn)
	{
		return !this.#isRemoved ? fn() : undefined;
	}

	focus(focusData = {}, fn = undefined)
	{
		focusData = Object.assign(defaultFocusData, focusData || {});

		const withElement = elm =>
		{
			this.editor.selection.removeAllRanges();

			elm.click();
			elm.focus();

			if (!elm.isContentEditable)
				return;

			if (focusData.select)
			{
				if (focusData.selectAll === false)
					placeCaretAtEdge(elm, focusData.placeAtEnd);
				else if (focusData.selectAll === false)
					elm.focus();
				else
					document.execCommand("selectAll");
			}

			if (fn)
				fn(elm);
		};

		if (this.#blockNode && this.#blockNode.elm)
			withElement(this.#blockNode.elm);
		else
			this.nextTick(() => withElement(this.#blockNode.elm));
	}

	getRelative(dir)
	{
		return this.#group.blocks[this.#index + dir] || undefined;
	}

	insertBlock(id, index = -1, options = {}, focusData = defaultFocusData)
	{
		this.#group.insertBlock(id, index, options, focusData);
	}

	nextTick(fn)
	{
		this.#group.$nextTick(fn);
	}

	raf(fn)
	{
		getLatte().util.dom.raf(fn);
	}

	rearrange(dir)
	{
		this.#group.rearrangeBlock(this.#index, dir);
	}

	remove()
	{
		this.#isRemoved = true;
		this.#group.removeBlock(this.#index);

		if (this.previousSibbling)
			this.previousSibbling.focus({placeAtEnd: true});
		else if (this.#group.contentFiltered.length > 0)
			this.nextTick(() => this.#group.blocks[this.#index].focus({}));
		else
			this.#group.setSelectedIndex(-1, undefined);
	}

	setChildren(children)
	{
		this.#group.updateSelection();
		this.ensure(() => replaceIndex(this.#group.content, this.#index, Object.assign({}, this.#item, {children})));
	}

	setOptions(options)
	{
		this.#group.updateSelection();
		this.ensure(() => replaceIndex(this.#group.content, this.#index, Object.assign({}, this.#item, {options: Object.assign(this.options, options)})));
	}

}
