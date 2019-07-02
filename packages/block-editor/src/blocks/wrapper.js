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

	render(h, options)
	{
		return super.render(h, options);
	}

	renderEditor(h, {index, children, setChildren})
	{
		return h("div", {class: `be-block-wrapper`}, [
			h(BEBlocks, {
				props: {
					blocks: this.editor.blocks,
					categories: this.editor.categories,
					value: children || []
				},
				on: {
					input: c => setChildren(c)
				}
			})
		]);
	}

	renderOptions(h, {index, indexMax, rearrange, remove, children, options, setChildren, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"})
		]);
	}

}
