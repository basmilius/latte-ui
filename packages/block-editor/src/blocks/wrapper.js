import BEBlocks from "../BEBlocks";
import { BlockBase } from "../block";
import { optionAdditionalClasses } from "../primitive/element";
import { blockActions, settingsGroupWithDepth } from "../primitive/settings";

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

		return h("div", {class: `row be-block-wrapper ${options.class}`}, [
			h("div", {class: "col-12"}, processGroup(children))
		]);
	}

	renderEditor(h, entry)
	{
		return h(BEBlocks, {
			class: `be-block-wrapper ${entry.options.class}`,
			props: {entry}
		});
	}

	renderOptions(h, entry)
	{
		return settingsGroupWithDepth(h, entry.depth, this.name, [
			blockActions(h, entry),
			optionAdditionalClasses(h, entry)
		]);
	}

}
