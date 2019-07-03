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

	get name()
	{
		return this._name;
	}

	get description()
	{
		return this._description;
	}

	get editor()
	{
		return this._editor;
	}

	set editor(value)
	{
		this._editor = value;
	}

	constructor(id, category, icon, name, description)
	{
		this._id = id;
		this._category = category;
		this._icon = icon;
		this._name = name;
		this._description = description;
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
