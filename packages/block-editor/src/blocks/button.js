import { BlockBase } from "../block";
import { getLatte } from "../utils";
import { blockActions, radioButtons, settingsGroup, textField, toggleButton } from "../primitive/settings";

const buttonTypes = [
	{id: "contained", label: "Contained"},
	{id: "outline", label: "Outline"},
	{id: "soft", label: "Soft"},
	{id: "text", label: "Text"}
];

function getButtonClasses(options)
{
	const classes = ["btn", `btn-${options.type}`];

	if (options.pillButton)
		classes.push("btn-pill");

	return classes;
}

export class ButtonBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			pillButton: false,
			rippleButton: false,
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
		const uniqueId = getLatte().api.id();

		return settingsGroup(h, this.name, [
			blockActions(h, entry),
			toggleButton(h, "Ripple", () => entry.options.rippleButton, rippleButton => entry.setOptions({rippleButton})),
			toggleButton(h, "Pill", () => entry.options.pillButton, pillButton => entry.setOptions({pillButton})),
			radioButtons(h, "Type", () => entry.options.type, type => entry.setOptions({type}), uniqueId, buttonTypes),
			textField(h, "URL", () => entry.options.url, url => entry.setOptions({url}))
		]);
	}

}
