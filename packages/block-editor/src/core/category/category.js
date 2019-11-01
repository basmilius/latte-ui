export class Category
{

	#id;
	#icon;
	#title;
	#description;

	get id()
	{
		return this.#id;
	}

	get icon()
	{
		return this.#icon;
	}

	get title()
	{
		return this.#title;
	}

	get description()
	{
		return this.#description;
	}

	constructor(id, icon, title, description = "")
	{
		this.#id = id;
		this.#icon = icon;
		this.#title = title;
		this.#description = description;
	}

}
