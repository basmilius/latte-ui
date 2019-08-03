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

	render(h, {options})
	{
		return h(
			options.rippleButton ? "latte-ripple" : "button",
			{
				class: getButtonClasses(options),
				domProps: {
					href: options.url
				},
				props: {as: "button"}
			},
			[
				h("span", options.text)
			]
		);
	}

	renderEditor(h, api)
	{
		return h(
			api.options.rippleButton ? "latte-ripple" : "button",
			{
				class: getButtonClasses(api.options),
				props: {as: "button"}
			},
			[
				h("span", {
					domProps: {
						contentEditable: "plaintext-only",
						innerHTML: api.options.text
					},
					on: {
						blur: evt => api.setOptions({text: evt.target.innerText})
					},
					style: {
						minWidth: "18px"
					}
				})
			]
		);
	}

	renderOptions(h, api)
	{
		const uniqueId = getLatte().api.id();

		return settingsGroup(h, this.name, [
			blockActions(h, api),
			toggleButton(h, "Ripple", () => api.options.rippleButton, rippleButton => api.setOptions({rippleButton})),
			toggleButton(h, "Pill", () => api.options.pillButton, pillButton => api.setOptions({pillButton})),
			radioButtons(h, "Type", () => api.options.type, type => api.setOptions({type}), uniqueId, buttonTypes),
			textField(h, "URL", () => api.options.url, url => api.setOptions({url}))
		]);
	}

}
