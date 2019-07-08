import { BlockBase } from "../block";
import { getLatte } from "../utils";
import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";

const L = getLatte();

const buttonTypes = [
	{id: "contained", label: "Contained"},
	{id: "soft", label: "Soft"},
	{id: "text", label: "Text"}
];

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
		return h("button", {
			class: `btn`
		});
	}

	renderEditor(h, {options, setOptions})
	{
		const classes = ["btn", `btn-${options.type}`];

		if (options.pillButton)
			classes.push("btn-pill");

		return h(
			"button",
			{
				class: classes
			},
			[
				h("span", {
					domProps: {
						contentEditable: "plaintext-only",
						innerHTML: options.text
					},
					on: {
						blur: evt => setOptions({text: evt.target.innerText})
					},
					style: {
						minWidth: "18px"
					}
				})
			]
		);
	}

	renderOptions(h, {editor, index, indexMax, rearrange, remove, options, setOptions})
	{
		const uniqueId = getLatte().api.id();

		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			h("label", {class: "be-settings-row"}, [
				h("span", "Pill button"),
				h("div", [
					h("input", {class: "toggle-button toggle-button-primary", domProps: {checked: options.pillButton, type: "checkbox"}, on: {input: evt => setOptions({pillButton: evt.target.checked})}})
				])
			]),
			h("div", {class: "be-settings-row flex-column"}, [
				h("span", "Type"),
				buttonTypes.map(buttonType => h("label", {class: "d-flex align-items-center my-1 w-100"}, [
					h("div", [
						h("input", {class: "radio-button radio-button-primary mr-3", domProps: {checked: options.type === buttonType.id, type: "radio", name: uniqueId, value: buttonType.id}, on: {click: () => setOptions({type: buttonType.id})}})
					]),
					h("span", {class: "m-0"}, buttonType.label)
				]))
			]),
			h("label", {class: "be-settings-row flex-column"}, [
				h("span", "URL"),
				h("input", {class: "form-control", domProps: {type: "text", value: options.url}, on: {input: evt => setOptions({url: evt.target.value})}})
			])
		]);
	}

}
