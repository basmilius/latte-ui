import { BlockBase } from "../block";
import { blockActions, settingsGroup } from "../primitive/settings";

export class HtmlBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			code: ""
		};
	}

	get description()
	{
		return "Allows you to add custom HTML code.";
	}

	get keywords()
	{
		return ["html", "custom", "code"];
	}

	get name()
	{
		return "Custom HTML";
	}

	constructor()
	{
		super("html", "other", "language-html5");
	}

	renderEditor(h, api)
	{
		return h("latte-tab-container", {}, [
			h("div", {class: "d-flex align-items-center mb-1"}, [
				h("strong", this.name),
				h("latte-tab-bar", {class: "ml-auto"})
			]),
			h("latte-tab", {props: {label: "HTML"}}, [
				h("textarea", {
					class: "form-control",
					domProps: {
						rows: 10,
						value: api.options.code
					},
					on: {
						input: evt => api.setOptions({code: evt.target.value})
					}
				})
			]),
			h("latte-tab", {props: {label: "Preview"}}, [
				h("div", {
					class: "be-block-custom-html-code",
					domProps: {
						innerHTML: api.options.code
					}
				})
			])
		])
	}

	renderOptions(h, api)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, api)
		]);
	}

}
