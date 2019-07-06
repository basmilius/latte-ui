export class BlockBase
{

	get id()
	{
		return this._id;
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

	render(h, options)
	{
		return undefined;
	}

	renderEditor(h, options)
	{
		return undefined;
	}

	renderOptions(h, options)
	{
		return undefined;
	}

}

export const defaultCategories = [
	{id: "layout", icon: "layers", name: "Layout"},
	{id: "text", icon: "format-text", name: "Text"},
	{id: "embeds", icon: "code-tags", name: "Embeds"}
];
