/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { first } from "../../util/array";

import * as DefaultBlocks from "../../block";

export class BlockRegistry
{

	static #blocks = [];

	static get blocks()
	{
		return this.#blocks
			.filter(b => b.showInInserter);
	}

	static findById(id)
	{
		return first(this.#blocks.filter(b => b.id === id));
	}

	static register(block)
	{
		if (this.#blocks.find(b => b.id === block.id))
			return;

		this.#blocks.push(block);
	}

	static registerDefaults()
	{
		const defaultBlocks = Object.values(DefaultBlocks);
		defaultBlocks.forEach(Block => this.register(new Block()));
	}

	static unregister(block)
	{
		this.#blocks = this.#blocks
			.filter(b => b.id !== block.id);
	}

}

export function initializeBlockRegistry()
{
	BlockRegistry.registerDefaults();
}
