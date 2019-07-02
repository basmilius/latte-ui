import BEBlocks from "../BEBlocks";
import BESettingsGroup from "../BESettingsGroup";
import BERearrange from "../BERearrange";

import { BlockBase } from "../block";
import { replaceIndex } from "../utils";

export class ColumnsBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			columns: 2
		};
	}

	constructor()
	{
		super("columns", "layout", "view-column", "Columns", "Displays blocks next to each other.");
	}

	render(h, options)
	{
		return super.render(h, options);
	}

	renderEditor(h, {options, children, setChildren})
	{
		return h("div", {class: `row be-block-columns`}, Array(options.columns).fill(undefined).map((_, index) => h("div", {class: "col-12 col-lg"}, [
			h(BEBlocks, {
				props: {
					blocks: this.editor.blocks,
					categories: this.editor.categories,
					value: children[index] || []
				},
				on: {
					input: c => setChildren(replaceIndex(children, index, c))
				}
			})
		])));
	}

	renderOptions(h, {index, indexMax, rearrange, children, options, setChildren, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BERearrange, {props: {index, indexMax, rearrange}, slot: "header"}),
			h("label", {class: "be-settings-row"}, [
				h("span", "Amount of columns"),
				h("div", [
					h("input", {class: "custom-range", domProps: {checked: options.shouldFade, min: 2, max: 6, value: options.columns, type: "range"}, on: {input: evt => setOptions({columns: parseInt(evt.target.value)})}})
				])
			])
		]);
	}

}
