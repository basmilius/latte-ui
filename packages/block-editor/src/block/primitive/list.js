/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getStyles, onBlur, onKeyDown as textOnKeyDown, removeEmptyElements } from "./text";
import { first, last } from "../../util/array";
import { atEdge } from "../../util/selection";
import { Block } from "../../core/block/block";
import { description, fragment, group, settings, sidebar, toolbar } from "../../ui/render/settings";
import { divider, rangeSlider } from "../../ui/render/element";
import { simpleColorSelect } from "../../ui/render/color";
import { additionalClasses, advancedOptions, blockActions } from "../../ui/render/block";
import { alignments, boldItalicUnderline } from "../../ui/render/text";

export class AbstractListBlock extends Block
{

	#tag;

	get defaultOptions()
	{
		return {
			align: "left",
			color: undefined,
			fontSize: 1,
			text: "<li></li>"
		};
	}

	constructor(tag, id, category, icon)
	{
		super(id, category, icon);

		this.#tag = tag;
	}

	render(h, instance)
	{
		return h(this.#tag, {
			class: instance.options.class,
			domProps: {
				innerHTML: instance.options.text
			},
			style: getStyles(instance.options)
		});
	}

	renderEditor(h, instance)
	{
		return h(this.#tag, {
			class: instance.options.class,
			domProps: {
				contentEditable: "true",
				innerHTML: instance.options.text
			},
			on: {
				blur: evt => onBlur(evt, instance),
				input: () => instance.updateEditor(false),
				keydown: evt => onKeyDown(evt, instance)
			},
			style: getStyles(instance.options)
		});
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				group(h, "Text settings", true, [
					rangeSlider(h, "Size", () => instance.options.fontSize, fontSize => instance.setOptions({fontSize}), .7, 3, .1, "@0em")
				]),
				group(h, "Color settings", true, [
					simpleColorSelect(h, "Color", () => instance.options.color, color => instance.setOptions({color}))
				]),
				advancedOptions(h, [
					additionalClasses(h, instance)
				])
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			]),
			toolbar(h, instance, [
				boldItalicUnderline(h, instance),
				divider(h, false),
				alignments(h, instance)
			])
		]);
	}

}

function onKeyDown(evt, instance)
{
	const list = evt.target;
	const items = Array.from(list.getElementsByTagName("li"));

	const firstItem = first(items);
	const lastItem = last(items);

	if (evt.key === "Enter")
	{
		removeEmptyElements(evt);

		if (atEdge(list, true) && lastItem.innerHTML.trim() === "")
		{
			evt.preventDefault();
			lastItem.remove();
			instance.insertBlock("paragraph", instance.index + 1, {text: " "}, {placeAtEnd: false});
		}

		return;
	}

	if (evt.key === "Backspace")
	{
		removeEmptyElements(evt);

		if (atEdge(list) && items.length === 1 && firstItem.innerHTML.trim() === "")
		{
			evt.preventDefault();
			instance.remove();
		}

		return;
	}

	textOnKeyDown(evt, instance);
}
