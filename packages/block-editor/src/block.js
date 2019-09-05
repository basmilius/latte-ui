import { getElementDimensions } from "./helper/element";

export const defaultCategories = [
	{id: "layout", icon: "layers", name: "Layout"},
	{id: "text", icon: "format-text", name: "Text"},
	{id: "embeds", icon: "code-tags", name: "Embeds"},
	{id: "other", icon: "package-variant", name: "Other"}
];

export const defaultFocusOptions = {
	placeAtEnd: true,
	select: true,
	selectAll: false
};

export class BlockBase
{

	#id;
	#category;
	#icon;

	get id()
	{
		return this.#id;
	}

	get canHaveChildren()
	{
		return false;
	}

	get canHaveGroups()
	{
		return false;
	}

	get showInInserter()
	{
		return true;
	}

	get category()
	{
		return this.#category;
	}

	get icon()
	{
		return this.#icon;
	}

	get isInline()
	{
		return false;
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
		return this.#id;
	}

	constructor(id, category, icon)
	{
		this.#id = id;
		this.#category = category;
		this.#icon = icon;
	}

	calculateSelectionBorder(entry)
	{
		const {dimensions, margin} = getElementDimensions(entry.element);

		let hgutters = margin.horizontal;
		let vgutters = this.isInline ? 0 : margin.vertical;

		return {
			height: dimensions.height + vgutters,
			width: dimensions.width + hgutters
		};
	}

	render(h, entry)
	{
		return undefined;
	}

	renderEditor(h, entry)
	{
		return undefined;
	}

	renderOptions(h, entry)
	{
		return undefined;
	}

}
