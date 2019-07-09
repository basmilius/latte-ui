import BEBlocks from "../BEBlocks";
import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";

import { BlockBase } from "../block";
import { replaceIndex } from "../utils";

const presets = [
	{
		columns: 2,
		classes: [
			"col-12 col-lg-4",
			"col-12 col-lg-8"
		],
		preview: [33, 67]
	},
	{
		columns: 2,
		classes: [
			"col-12 col-lg-8",
			"col-12 col-lg-4"
		],
		preview: [67, 33]
	},
	{
		columns: 3,
		classes: [
			"col-12 col-lg-3",
			"col-12 col-lg-6",
			"col-12 col-lg-3"
		],
		preview: [25, 50, 25]
	}
];

export class ColumnsBlock extends BlockBase
{

	get canHaveChildren()
	{
		return true;
	}

	get defaultOptions()
	{
		return {
			class: "",
			columns: 2,
			gutters: true,
			preset: -1
		};
	}

	get description()
	{
		return "Displays blocks in a column view.";
	}

	get keywords()
	{
		return ["column", "columns", "grid"];
	}

	get name()
	{
		return "Columns";
	}

	constructor()
	{
		super("columns", "layout", "view-column");
	}

	render(h, {children, options, processGroup})
	{
		if (children.flat().length === 0)
			return undefined;

		const preset = presets[options.preset] || undefined;

		return h(
			"div",
			{class: `row be-block-columns ${options.class} ${options.gutters ? "gutters" : "no-gutters"}`},
			Array(preset ? preset.columns : options.columns)
				.fill(undefined)
				.map((_, index) => h("div", {class: preset ? preset.classes[index] : "col-12 col-lg"}, processGroup(children[index] || [])))
		);
	}

	renderEditor(h, {depth, options, children, setChildren})
	{
		const preset = presets[options.preset] || undefined;

		return h(
			"div",
			{class: `row be-block-columns ${options.class} ${options.gutters ? "gutters" : "no-gutters"}`},
			Array(preset ? preset.columns : options.columns)
				.fill(undefined)
				.map((_, index) => h("div", {class: preset ? preset.classes[index] : "col-12 col-lg"}, [
					h(BEBlocks, {
						props: {
							depth,
							value: children[index] || []
						},
						on: {
							input: c => setChildren(replaceIndex(children, index, c))
						}
					})
				]))
		);
	}

	renderOptions(h, {depth, index, indexMax, rearrange, remove, children, options, setChildren, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name, depth}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			h("div", {class: "be-settings-row flex-column"}, [
				h("span", "Preset"),
				h("div", {class: "d-flex flex-wrap be-settings-columns-presets"}, presets.map((preset, index) =>
					h("div", {
							class: `preset ${options.preset === index ? "is-active" : ""}`,
							on: {click: () => setOptions({preset: index === options.preset ? -1 : index})}
						},
						Array(preset.columns)
							.fill(undefined)
							.map((_, column) => h("div", {class: "column", style: {flexGrow: preset.preview[column]}}))
					)
				))
			]),
			options.preset === -1 ? h("label", {class: "be-settings-row"}, [
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
			]) : undefined,
			h("label", {class: "be-settings-row"}, [
				h("span", "Gutters"),
				h("div", [
					h("input", {class: "toggle-button toggle-button-primary", domProps: {checked: options.gutters, type: "checkbox"}, on: {input: evt => setOptions({gutters: evt.target.checked})}})
				])
			]),
			h("label", {class: "be-settings-row flex-column"}, [
				h("span", "Additional classes"),
				h("input", {class: "form-control", domProps: {type: "text", value: options.class}, on: {input: evt => setOptions({class: evt.target.value})}})
			])
		]);
	}


}
