import { description, settings } from "../../ui/render/settings";

export class Block
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

	render(h, instance)
	{
		return undefined;
	}

	renderEditor(h, instance)
	{
		return undefined;
	}

	renderOptions(h, instance)
	{
		return settings(h, instance, [
			description(h, instance.block)
		]);
	}

}
