import Vue from "vue";

import { BlockBase } from "../block";
import { blockActions, settingsGroup } from "../primitive/settings";
import { getLatte, translate } from "../utils";

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

	render(h, entry)
	{
		return getLatte().util.dom.toDOM(entry.options.code.replace(/\t/g, "").replace(/\r?\n|\r/g, " "));
	}

	renderEditor(h, entry)
	{
		return h("latte-tab-container", {style: {zIndex: "0"}}, [
			h("div", {class: "position-relative d-flex align-items-center mb-1", style: {zIndex: "1"}}, [
				h("strong", this.name),
				h("latte-tab-bar", {class: "ml-auto"})
			]),
			h("latte-tab", {props: {label: translate("Visual")}}, [
				h(Vue.extend({
					template: entry.options.code
						.replace(/href=/g, "data-be-href=")
						.replace(/data-action=/g, "data-be-action=")
				}))
			]),
			h("latte-tab", {props: {label: translate("Code")}}, [
				h("textarea", {
					class: "form-control",
					domProps: {
						rows: 10,
						value: entry.options.code
					},
					on: {
						input: evt => entry.setOptions({code: evt.target.value})
					}
				})
			])
		]);
	}

	renderOptions(h, entry)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, entry)
		]);
	}

}
