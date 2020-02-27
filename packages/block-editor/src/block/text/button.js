/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { Block } from "../../core/block/block";
import { description, fragment, group, settings, sidebar } from "../../ui/render/settings";
import { additionalClasses, advancedOptions, blockActions, blockAlignments } from "../../ui/render/block";
import { optionButtons, textField, toggleButton } from "../../ui/render/element";
import { classColorSelect } from "../../ui/render/color";
import { translate } from "../../core/i18n";
import { optional } from "../../util/vue";

export const buttonSizes = [
	{value: "small", icon: "alpha-s", tooltip: "block.text.button.sizes.small"},
	{value: "medium", icon: "alpha-m", tooltip: "block.text.button.sizes.medium"},
	{value: "large", icon: "alpha-l", tooltip: "block.text.button.sizes.large"},
	{value: "huge", icon: "alpha-h", tooltip: "block.text.button.sizes.huge"}
];

export const buttonStyles = [
	{value: "contained", icon: "alpha-a-box", tooltip: "block.text.button.styles.contained"},
	{value: "outline", icon: "alpha-a-box-outline", tooltip: "block.text.button.styles.outline"},
	{value: "text", icon: "alpha-a", tooltip: "block.text.button.styles.text"}
];

export function getButtonClasses(options)
{
	const classes = ["btn", `btn-${options.type}`, options.class];

	if (options.align)
	{
		if (options.align === "start")
			classes.push("mr-auto");
		else if (options.align === "center")
			classes.push("mx-auto");
		else if (options.align === "end")
			classes.push("ml-auto");
	}

	if (options.color)
		classes.push(`btn-${options.color}`);

	if (options.isFluid)
		classes.push("is-fluid");

	if (options.size && options.size !== "medium")
		classes.push(`is-${options.size}`);

	return classes.filter(c => c.trim() !== "").join(" ");
}

export class ButtonBlock extends Block
{

	get defaultOptions()
	{
		return {
			align: "start",
			class: "",
			color: undefined,
			isFluid: false,
			rippleButton: true,
			size: "medium",
			text: "Button",
			type: "contained",
			url: ""
		};
	}

	get description()
	{
		return translate("block.text.button.description");
	}

	get keywords()
	{
		return translate("block.text.button.keywords");
	}

	get name()
	{
		return translate("block.text.button.name");
	}

	constructor()
	{
		super("button", "text", "card-text");
	}

	render(h, entry)
	{
		return h(entry.options.rippleButton ? "latte-ripple" : "button", {
			class: getButtonClasses(entry.options),
			domProps: {href: entry.options.url},
			props: {as: "button"}
		}, [
			h("span", entry.options.text)
		]);
	}

	renderEditor(h, entry)
	{
		return h(entry.options.rippleButton ? "latte-ripple" : "button", {
			class: getButtonClasses(entry.options),
			props: {as: "button"}
		}, [
			h("span", {
				domProps: {
					contentEditable: "plaintext-only",
					innerHTML: entry.options.text
				},
				on: {
					blur: evt => entry.setOptions({text: evt.target.innerText})
				},
				style: {
					minWidth: "18px"
				}
			})
		]);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				group(h, translate("block.text.button.settings"), true, [
					classColorSelect(h, translate("common.color"), () => instance.options.color, color => instance.setOptions({color})),
					toggleButton(h, translate("common.fluid"), () => instance.options.isFluid, isFluid => instance.setOptions({isFluid})),
					toggleButton(h, translate("common.ripple"), () => instance.options.rippleButton, rippleButton => instance.setOptions({rippleButton})),
					optional(!instance.options.isFluid, () => blockAlignments(h, instance)),
					optionButtons(h, translate("common.size"), buttonSizes, () => instance.options.size, size => instance.setOptions({size})),
					optionButtons(h, translate("common.style"), buttonStyles, () => instance.options.type, type => instance.setOptions({type}))
				]),
				group(h, translate("block.text.button.settings.target"), true, [
					textField(h, translate("common.url"), () => instance.options.url, url => instance.setOptions({url}))
				]),
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
