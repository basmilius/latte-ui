import BEBlocks from "../BEBlocks";
import BEBlockActions from "../BEBlockActions";
import BESettingsGroup from "../BESettingsGroup";
import { BlockBase } from "../block";

export class WrapperBlock extends BlockBase
{

	constructor()
	{
		super("wrapper", "layout", "border-none-variant", "Wrapper", "Wraps blocks in a wrapper.");
	}

	render(h, {children, options, processGroup})
	{
		if (children.length === 0)
			return undefined;

		return h(
			"div",
			{
				class: `row be-block-wrapper`
			},
			[
				h("div", {class: "col-12"}, processGroup(children))
			]
		);
	}

	renderEditor(h, {depth, index, children, setChildren})
	{
		return h("div", {class: `row be-block-wrapper`}, [
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
		return h(BESettingsGroup, {props: {title: `${this.name} (${depth})`}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"})
		]);
	}

}
