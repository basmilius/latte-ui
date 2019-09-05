export class CategoryRegistry
{

	#categories;

	get categories()
	{
		return this.#categories;
	}

	constructor(categories = [])
	{
		this.#categories = categories;
	}

	register(category)
	{
		this.#categories.push(category);
	}

	unregister(category)
	{
		this.#categories = this.#categories
			.filter(c => c.id !== category.id);
	}

}
