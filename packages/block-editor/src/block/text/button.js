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
import { additionalClasses, advancedOptions, blockActions } from "../../ui/render/block";
import { optionButtons, textField, toggleButton } from "../../ui/render/element";
import { classColorSelect } from "../../ui/render/color";
import { translate } from "../../core/i18n";

export const buttonSizes = [
	{value: "small", icon: "alpha-s", tooltip: "Small"},
	{value: "medium", icon: "alpha-m", tooltip: "Medium"},
	{value: "large", icon: "alpha-l", tooltip: "Medium"},
	{value: "huge", icon: "alpha-h", tooltip: "Large"}
];

export const buttonStyles = [
	{value: "contained", icon: "alpha-a-box", tooltip: "Solid"},
	{value: "outline", icon: "alpha-a-box-outline", tooltip: "Outline"},
	{value: "text", icon: "alpha-a", tooltip: "Text"}
];

export function getButtonClasses(options)
{
	const classes = ["btn", `btn-${options.type}`, options.class];

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
			class: "",
			color: undefined,
			isFluid: false,
			rippleButton: true,
			size: "md",
			text: "Button",
			type: "contained",
			url: ""
		};
	}

	get description()
	{
		return translate("A button that can link to an action or url.");
	}

	get keywords()
	{
		return [translate("Link"), translate("Action")];
	}

	get name()
	{
		return translate("Button");
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
				group(h, "Button settings", true, [
					classColorSelect(h, "Color", () => instance.options.color, color => instance.setOptions({color})),
					toggleButton(h, "Fluid", () => instance.options.isFluid, isFluid => instance.setOptions({isFluid})),
					toggleButton(h, "Ripple", () => instance.options.rippleButton, rippleButton => instance.setOptions({rippleButton})),
					optionButtons(h, "Size", buttonSizes, () => instance.options.size, size => instance.setOptions({size})),
					optionButtons(h, "Style", buttonStyles, () => instance.options.type, type => instance.setOptions({type}))
				]),
				group(h, "Target options", true, [
					textField(h, "URL", () => instance.options.url, url => instance.setOptions({url}))
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
