/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { Block } from "../../core/block/block";
import { render, renderEditor } from "../primitive/text";
import { description, fragment, group, settings, sidebar, toolbar } from "../../ui/render/settings";
import { simpleColorSelect } from "../../ui/render/color";
import { alignments } from "../../ui/render/text";
import { additionalClasses, advancedOptions, blockActions } from "../../ui/render/block";
import { translate } from "../../core/i18n";
import { button, divider, optionButtons } from "../../ui/render/element";

const headerTypes = [
	{value: "h1", icon: "format-header-1", tooltip: "Header 1"},
	{value: "h2", icon: "format-header-2", tooltip: "Header 2"},
	{value: "h3", icon: "format-header-3", tooltip: "Header 3"},
	{value: "h4", icon: "format-header-4", tooltip: "Header 4"},
	{value: "h5", icon: "format-header-5", tooltip: "Header 5"},
	{value: "h6", icon: "format-header-6", tooltip: "Header 6"}
];

export class HeadingBlock extends Block
{

	get defaultOptions()
	{
		return {
			align: "left",
			class: "",
			color: undefined,
			type: "h3",
			text: ""
		};
	}

	get description()
	{
		return translate("Represents a header text.");
	}

	get keywords()
	{
		return [
			translate("Heading"),
			translate("Text"),
			translate("h1"),
			translate("h2"),
			translate("h3"),
			translate("h4"),
			translate("h5"),
			translate("h6")
		];
	}

	get name()
	{
		return translate("Header");
	}

	constructor()
	{
		super("heading", "text", "format-header-pound");
	}

	render(h, instance)
	{
		return render(instance.options.type, h, instance);
	}

	renderEditor(h, instance)
	{
		const isValidHeading = headerTypes.find(h => h.value === instance.options.type) !== undefined;

		return renderEditor(isValidHeading ? instance.options.type : "h3", h, instance);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				group(h, "Text settings", true, [
					optionButtons(h, "Header", headerTypes, () => instance.options.type, type => instance.setOptions({type}), false)
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
				fragment(h, headerTypes.slice(1, 4).map(b => button(h, {
					...b,
					iconBefore: b.icon,
					class: "m-0",
					color: instance.options.type === b.value ? "primary" : null,
					type: instance.options.type === b.value ? "outline" : "text"
				}, () => instance.setOptions({type: b.value})))),
				divider(h, false),
				alignments(h, instance)
			])
		]);
	}

}
