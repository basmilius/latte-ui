/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { AbstractListBlock } from "../primitive/list";
import { translate } from "../../core/i18n";

export class UnorderedListBlock extends AbstractListBlock
{

	get description()
	{
		return translate("block.text.unordered_list.description");
	}

	get keywords()
	{
		return translate("block.text.unordered_list.keywords");
	}

	get name()
	{
		return translate("block.text.unordered_list.name");
	}

	constructor()
	{
		super("ul", "unordered-list", "text", "format-list-bulleted");
	}

}
