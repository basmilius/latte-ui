/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { Block } from "../../core/block/block";
import { renderChildren, renderInstances } from "../../core/block/api";
import { either } from "../../util/vue";
import { inserterNag } from "../../ui/render/inserter";
import { description, fragment, settings, sidebar } from "../../ui/render/settings";
import { additionalClasses, advancedOptions, blockActions } from "../../ui/render/block";
import { translate } from "../../core/i18n";

export class WrapperBlock extends Block
{

	get canHaveChildren()
	{
		return true;
	}

	get defaultOptions()
	{
		return {
			class: ""
		};
	}

	get description()
	{
		return translate("block.layout.wrapper.description");
	}

	get keywords()
	{
		return translate("block.layout.wrapper.keywords");
	}

	get name()
	{
		return translate("block.layout.wrapper.name");
	}

	constructor()
	{
		super("wrapper", "layout", "border-none-variant");
	}

	render(h, instance)
	{
		return h("div", {class: `be-block-wrapper ${instance.options.class}`}, renderChildren(instance));
	}

	renderEditor(h, instance)
	{
		return either(
			instance.children.length > 0,
			() => h("div", {class: `be-block-wrapper ${instance.options.class}`}, renderInstances(h, instance)),
			() => h("div", {class: `be-block-wrapper ${instance.options.class}`}, [
				inserterNag(h, instance)
			])
		);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				advancedOptions(h, [
					additionalClasses(h, instance)
				])
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
