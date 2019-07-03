import BEBlocks from "../BEBlocks";
import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";

import { BlockBase } from "../block";
import { replaceIndex } from "../utils";

export class ColumnsBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			columns: 2,
			gutters: true
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

	renderEditor(h, {depth, options, children, setChildren})
	{
		return h("div", {class: `row be-block-columns ${options.gutters ? "gutters" : "no-gutters"}`}, Array(options.columns).fill(undefined).map((_, index) => h("div", {class: "col-12 col-lg"}, [
			h(BEBlocks, {
				props: {
					depth,
					value: children[index] || []
				},
				on: {
					input: c => setChildren(replaceIndex(children, index, c))
				}
			})
		])));
	}

	renderOptions(h, {depth, index, indexMax, rearrange, remove, children, options, setChildren, setOptions})
	{
		return h(BESettingsGroup, {props: {title: `${this.name} (${depth})`}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			h("label", {class: "be-settings-row"}, [
				h("span", "Amount of columns"),
				h("div", [
					h("input", {
						class: "custom-range",
						domProps: {
							min: 2,
							max: 6,
							value: options.columns,
							type: "range"
						},
						on: {
							input: evt =>
							{
								const columns = parseInt(evt.target.value);

								setChildren(children.slice(0, columns));
								setOptions({columns});
							}
						}
					})
				])
			]),
			h("label", {class: "be-settings-row"}, [
				h("span", "Gutters"),
				h("div", [
					h("input", {class: "toggle-button toggle-button-primary", domProps: {checked: options.gutters, type: "checkbox"}, on: {input: evt => setOptions({gutters: evt.target.checked})}})
				])
			])
		]);
	}

}
