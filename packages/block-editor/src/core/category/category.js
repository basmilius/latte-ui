/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

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
