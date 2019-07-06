import BEBlocks from "../BEBlocks";
import BEBlockActions from "../BEBlockActions";
import BESettingsGroup from "../BESettingsGroup";
import { BlockBase } from "../block";

export class WrapperBlock extends BlockBase
{

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

	renderEditor(h, {depth, index, children, options, setChildren})
	{
		return h("div", {class: `row be-block-wrapper ${options.class}`}, [
			h("div", {class: "col-12"}, [
				h(BEBlocks, {
					props: {
						depth,
						value: children || []
					},
					on: {
						input: c => setChildren(c)
					}
				})
			])
		]);
	}

	renderOptions(h, {depth, index, indexMax, rearrange, remove, children, options, setChildren, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name, depth}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			h("label", {class: "be-settings-row flex-column"}, [
				h("span", "Additional classes"),
				h("input", {class: "form-control", domProps: {type: "text", value: options.class}, on: {input: evt => setOptions({class: evt.target.value})}})
			])
		]);
	}

}
