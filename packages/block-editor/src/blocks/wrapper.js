import BEBlocks from "../BEBlocks";
import { BlockBase } from "../block";
import { optionAdditionalClasses } from "../primitive/element";
import { blockActions, settingsGroupWithDepth } from "../primitive/settings";
import { renderChildren } from "../api";

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

	render(h, entry)
	{
		return h("div", {class: `row be-block-wrapper ${entry.options.class}`}, [
			h("div", {class: "col-12"}, renderChildren(entry))
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
