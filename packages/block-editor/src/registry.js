import { first } from "./helper/array";
import * as DefaultBlocks from "./blocks";
import { defaultCategories } from "./block";

export class BlockRegistry
{

	static #blocks = [];

	static get blocks()
	{
		return BlockRegistry.#blocks
			.filter(b => b.showInInserter);
	}

	static findById(id)
	{
		return first(BlockRegistry.#blocks.filter(b => b.id === id));
	}

	static register(block)
	{
		BlockRegistry.#blocks.push(block);
	}

	static registerDefaults()
	{
		const defaultBlocks = Object.values(DefaultBlocks);
		defaultBlocks.forEach(Block => BlockRegistry.register(new Block()));
	}

	static unregister(block)
	{
		BlockRegistry.#blocks = BlockRegistry.#blocks
			.filter(b => b.id !== block.id);
	}

}

export class CategoryRegistry
{

	static #categories = [];

	static get categories()
	{
		return CategoryRegistry.#categories;
	}

	static register(category)
	{
		CategoryRegistry.#categories.push(category);
	}

	static registerDefaults()
	{
		defaultCategories.forEach(cat => CategoryRegistry.register(cat));
	}

	static unregister(category)
	{
		CategoryRegistry.#categories = CategoryRegistry.#categories
			.filter(c => c.id !== category.id);
	}

}
