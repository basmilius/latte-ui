import BEBlocks from "../BEBlocks";
import { BlockBase } from "../block";
import { optionAdditionalClasses } from "../primitive/element";
import { blockActions, settingsGroupWithDepth } from "../primitive/settings";
import { getElementDimensions, querySelector } from "../helper/element";

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

	calculateSelectionBorder(api)
	{
		const {dimensions, margin} = getElementDimensions(api.elm);

		let hgutters = margin.horizontal;
		let vgutters = this.isInline ? 0 : margin.vertical;

		let columnsLast = querySelector(api.elm, ".be-block-mount:last-child");
		let lastDimensions = getElementDimensions(columnsLast);

		return {
			height: dimensions.height + vgutters - lastDimensions.margin.bottom,
			width: dimensions.width + hgutters
		};
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
		return settingsGroupWithDepth(h, api.depth, this.name, [
			blockActions(h, api),
			optionAdditionalClasses(h, api)
		]);
	}

}
