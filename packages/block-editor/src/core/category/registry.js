/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { defaultCategories } from "./options";
import { Category } from "./category";

export class CategoryRegistry
{

	static #categories = [];

	static get categories()
	{
		return this.#categories;
	}

	static register(category)
	{
		if (this.#categories.find(c => c.id === category.id))
			return;

		this.#categories.push(category);
	}

	static registerDefaults()
	{
		defaultCategories.forEach(c => this.register(new Category(c.id, c.icon, c.title, c.description || "")));
	}

	static unregister(category)
	{
		this.#categories = this.#categories
			.filter(c => c.id !== category.id);
	}

}

export function initializeCategoryRegistry()
{
	CategoryRegistry.registerDefaults();
}
