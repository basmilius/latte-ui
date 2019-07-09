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

export const defaultCategories = [
	{id: "layout", icon: "layers", name: "Layout"},
	{id: "text", icon: "format-text", name: "Text"},
	{id: "embeds", icon: "code-tags", name: "Embeds"},
	{id: "other", icon: "package-variant", name: "Other"}
];
