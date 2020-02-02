/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { Block } from "../../core/block/block";
import { description, fragment, settings, sidebar } from "../../ui/render/settings";
import { blockActions } from "../../ui/render/block";
import { translate } from "../../core/i18n";

export class PageBreakBlock extends Block
{

	get description()
	{
		return translate("Breaks the page into multiple views.");
	}

	get keywords()
	{
		return [translate("Break"), translate("Pages")];
	}

	get name()
	{
		return translate("Page Break");
	}

	constructor()
	{
		super("page-break", "layout", "format-page-break");
	}

	render(h, instance)
	{
		return document.createComment("page-break");
	}

	renderEditor(h, instance)
	{
		return h("div", {class: "be-page-break-mount"}, [
			h("div", {
				attrs: {"data-text": translate("Page Break")},
				class: "be-page-break"
			})
		]);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this)
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
