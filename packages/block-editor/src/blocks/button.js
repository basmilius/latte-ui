import { BlockBase } from "../block";
import { getLatte } from "../utils";
import { blockActions, settingsGroup, textField, toggleButton } from "../primitive/settings";

const buttonTypes = [
	{id: "contained", label: "Contained"},
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
			"button",
			{
				class: getButtonClasses(options),
				domProps: {
					href: options.url
				}
			},
			[
				h("span", options.text)
			]
		);
	}

	renderEditor(h, api)
	{
		return h(
			"button",
			{
				class: getButtonClasses(api.options)
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
			toggleButton(h, "Pill button", () => api.options.pillButton, pillButton => api.setOptions({pillButton})),
			h("div", {class: "be-settings-row flex-column"}, [
				h("span", "Type"),
				buttonTypes.map(buttonType => h("label", {class: "d-flex align-items-center my-1 w-100"}, [
					h("input", {
						class: "radio-button radio-button-primary mr-3",
						domProps: {
							checked: api.options.type === buttonType.id,
							type: "radio",
							name: uniqueId,
							value: buttonType.id
						},
						on: {
							click: () => api.setOptions({type: buttonType.id})
						}
					}),
					h("span", {class: "m-0"}, buttonType.label)
				]))
			]),
			textField(h, "URL", () => api.options.url, url => api.setOptions({url}))
		]);
	}

}
