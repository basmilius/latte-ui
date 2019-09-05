import { BlockBase } from "../block";
import { translate } from "../utils";
import { blockActions, settingsGroup, textField, toggleButton } from "../primitive/settings";
import { optionAdditionalClasses, optionButtons } from "../primitive/element";

const buttonSizes = [
	{value: "sm", icon: "alpha-s", tooltip: translate("Small")},
	{value: "md", icon: "alpha-m", tooltip: translate("Medium")},
	{value: "lg", icon: "alpha-l", tooltip: translate("Large")}
];

const buttonStyles = [
	{value: "contained", icon: "alpha-a-box", tooltip: translate("Solid")},
	{value: "outline", icon: "alpha-a-box-outline", tooltip: translate("Outline")},
	{value: "text", icon: "alpha-a", tooltip: translate("Text")}
];

function getButtonClasses(options)
{
	const classes = ["btn", `btn-${options.type}`, options.class];

	if (options.pillButton)
		classes.push("btn-pill");

	if (options.size && options.size !== "md")
		classes.push(`btn-${options.size}`);

	return classes.filter(c => c.trim() !== "").join(" ");
}

export class ButtonBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			class: "",
			pillButton: false,
			rippleButton: false,
			size: "md",
			text: "Button",
			type: "contained",
			url: ""
		};
	}

	get description()
	{
		return "A button that can link to an action or url.";
	}

	get keywords()
	{
		return ["button", "link", "action"];
	}

	get name()
	{
		return "Button";
	}

	get isInline()
	{
		return true;
	}

	constructor()
	{
		super("button", "layout", "card-text");
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

	renderOptions(h, entry)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, entry),
			toggleButton(h, "Ripple", () => entry.options.rippleButton, rippleButton => entry.setOptions({rippleButton})),
			toggleButton(h, "Pill", () => entry.options.pillButton, pillButton => entry.setOptions({pillButton})),
			optionButtons(h, "Size", buttonSizes, () => entry.options.size, size => entry.setOptions({size})),
			optionButtons(h, "Style", buttonStyles, () => entry.options.type, type => entry.setOptions({type})),
			textField(h, "URL", () => entry.options.url, url => entry.setOptions({url})),
			optionAdditionalClasses(h, entry)
		]);
	}

}
