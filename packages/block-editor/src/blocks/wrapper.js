import BEBlocks from "../BEBlocks";
import BEBlockActions from "../BEBlockActions";
import BESettingsGroup from "../BESettingsGroup";
import { BlockBase } from "../block";
import { optionAdditionalClasses } from "./primitive/element";

export class WrapperBlock extends BlockBase
{

	get canHaveChildren()
	{
		return true;
	}

	get defaultOptions()
	{
		return {
			class: ""
		};
	}

	get description()
	{
		return "Wraps blocks into a wrapper.";
	}

	get keywords()
	{
		return ["wrapper"];
	}

	get name()
	{
		return "Wrapper";
	}

	constructor()
	{
		super("wrapper", "layout", "border-none-variant");
	}

	render(h, {children, options, processGroup})
	{
		if (children.length === 0)
			return undefined;

		return h(
			"div",
			{class: `row be-block-wrapper ${options.class}`},
			[
				h("div", {class: "col-12"}, processGroup(children))
			]
		);
	}

	renderEditor(h, api)
	{
		return h("div", {class: `row be-block-wrapper ${api.options.class}`}, [
			h("div", {class: "col-12"}, [
				h(BEBlocks, {
					props: {
						depth: api.depth,
						value: api.children || []
					},
					on: {
						input: c => api.setChildren(c)
					}
				})
			])
		]);
	}

	renderOptions(h, api)
	{
		return h(BESettingsGroup, {props: {title: this.name, depth: api.depth}}, [
			h(BEBlockActions, {props: {api}, slot: "header"}),
			optionAdditionalClasses(h, api)
		]);
	}

}
