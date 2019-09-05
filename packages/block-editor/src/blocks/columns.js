import BEBlocks from "../BEBlocks";

import { convertBlock } from "../api";
import { BlockBase } from "../block";
import { notNullOrUndefined } from "../utils";
import { blockActions, optional, rangeField, settingsGroupWithDepth, toggleButton } from "../primitive/settings";
import { optionAdditionalClasses } from "../primitive/element";
import { getElementDimensions, querySelector, querySelectorAll } from "../helper/element";
import { range } from "../helper/array";

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

export class ColumnBlock extends BlockBase
{

	get canHaveChildren()
	{
		return true;
	}

	get description()
	{
		return "A single column used in the columns block.";
	}

	get name()
	{
		return "Column";
	}

	get showInInserter()
	{
		return false;
	}

	constructor()
	{
		super("column", "", "");
	}

	renderEditor(h, entry)
	{
		const preset = presets[entry.parent.options.preset] || undefined;

		return h("div", {class: preset ? preset.classes[entry.index] : "col-12 col-lg"}, [
			h(BEBlocks, {
				key: entry.hash,
				props: {entry}
			})
		]);
	}

}

export class ColumnsBlock extends BlockBase
{

	get canHaveChildren()
	{
		return true;
	}

	get canHaveGroups()
	{
		return true;
	}

	get groupBlock()
	{
		return "column";
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

	get isInline()
	{
		return true;
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

	calculateSelectionBorder(entry)
	{
		const {dimensions, margin} = getElementDimensions(entry.element);

		let hgutters = margin.horizontal;
		let vgutters = this.isInline ? 0 : margin.vertical;

		let columns = querySelectorAll(entry.element, ".col-12");
		let columnsLast = columns.map(column => querySelector(column, ".be-block-mount:last-child")).filter(column => notNullOrUndefined(column));
		let lastDimensions = columnsLast.map(l => getElementDimensions(l).margin.bottom);

		return {
			height: dimensions.height + vgutters - Math.max(0, ...lastDimensions),
			width: dimensions.width + hgutters
		};
	}

	render(h, {children, options, processGroup})
	{
		if (children.flat().length === 0)
			return undefined;

		const preset = presets[options.preset] || undefined;

		return h(
			"div",
			{class: `row be-block-columns ${options.class} ${options.gutters ? "" : "no-gutters"}`},
			Array(preset ? preset.columns : options.columns)
				.fill(undefined)
				.map((_, index) => h("div", {class: preset ? preset.classes[index] : "col-12 col-lg"}, processGroup(children[index] || [])))
		);
	}

	renderEditor(h, entry)
	{
		const preset = presets[entry.options.preset] || undefined;
		const classes = `row be-block-columns ${entry.options.class} ${entry.options.gutters ? "" : "no-gutters"}`;
		const columns = preset ? preset.columns : entry.options.columns;

		const entryChildOrDefault = index =>
		{
			if (entry.children[index])
				return entry.children[index];

			return convertBlock(entry.editor, index, {id: this.groupBlock, children: []}, entry);
		};

		range(0, columns, index =>
		{
			const child = entryChildOrDefault(index);

			if (!entry.children[index])
				entry.children.push(child);
		});

		return h(
			"div",
			{key: entry.hash, class: classes},
			range(0, columns, index => entry.children[index].renderEditor(h))
		);
	}

	renderOptions(h, entry)
	{
		return settingsGroupWithDepth(h, entry.depth, this.name, [
			blockActions(h, entry),
			h("div", {class: "be-settings-row flex-column"}, [
				h("span", "Preset"),
				h("div", {class: "d-flex flex-wrap be-settings-columns-presets"}, presets.map((preset, index) =>
					h("div", {
							class: `preset ${entry.options.preset === index ? "is-active" : ""}`,
							on: {click: () => entry.setOptions({preset: index === entry.options.preset ? -1 : index})}
						},
						Array(preset.columns)
							.fill(undefined)
							.map((_, column) => h("div", {class: "column", style: {flexGrow: preset.preview[column]}}))
					)
				))
			]),
			optional(entry.options.preset === -1, () => rangeField(h, "Amount of columns", () => entry.options.columns, columns =>
			{
				entry.setChildren(entry.children.slice(0, columns));
				entry.setOptions({columns});
			}, 2, 6, 1)),
			toggleButton(h, "Gutters", () => entry.options.gutters, gutters => entry.setOptions({gutters})),
			optionAdditionalClasses(h, entry)
		]);
	}

}
