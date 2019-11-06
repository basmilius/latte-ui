import { Block } from "../../core/block/block";
import { convertBlock, renderChildren, renderInstances } from "../../core/block/api";
import { range } from "../../util/array";
import { description, fragment, group, row, settings, sidebar } from "../../ui/render/settings";
import { additionalClasses, advancedOptions, blockActions } from "../../ui/render/block";
import { either, optional } from "../../util/vue";
import { inserterNag } from "../../ui/render/inserter";
import { rangeSlider, toggleButton } from "../../ui/render/element";
import { translate } from "../../core/i18n";

import BlockView from "../../component/BlockView";

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

function presetsSelect(h, instance)
{
	return row(h, false, [
		h("h6", translate("Presets")),
		h("div", {class: "d-flex flex-wrap be-columns-presets"}, presets.map((preset, index) => presetColumn(h, instance, preset, index)))
	]);
}

function presetColumn(h, instance, preset, index)
{
	const columns = Array(preset.columns)
		.fill(undefined)
		.map((_, column) => h("div", {class: "column", style: {flexGrow: preset.preview[column]}}));

	return h("div", {
		class: `preset ${instance.options.preset === index ? "is-active" : ""}`,
		on: {
			click: () => instance.transaction(() =>
			{
				instance.setChildren(instance.children.slice(0, preset.columns));
				instance.setOptions({preset: index === instance.options.preset ? -1 : index});

				instance.children.forEach(child => child.updateEditor());
			})
		}
	}, columns);
}

export function instanceChildOrDefault(block, instance, index)
{
	if (instance.children[index])
		return instance.children[index];

	return convertBlock(instance.editor, index, {id: block.groupBlock, children: []}, instance);
}

export class ColumnBlock extends Block
{

	get canHaveChildren()
	{
		return true;
	}

	get description()
	{
		return translate("A single column used in the columns block.");
	}

	get name()
	{
		return translate("Column");
	}

	get showInInserter()
	{
		return false;
	}

	constructor()
	{
		super("column", "", "");
	}

	render(h, instance)
	{
		const preset = presets[instance.parent.options.preset] || undefined;

		return h("div", {class: preset ? preset.classes[instance.index] : "col-12 col-lg"}, renderChildren(instance));
	}

	renderEditor(h, instance)
	{
		const preset = presets[instance.parent.options.preset] || undefined;
		const classes = `be-block-column ${preset ? preset.classes[instance.index] : "col-12 col-lg"}`;

		return either(
			instance.children.length > 0,
			() => h("div", {class: classes}, renderInstances(h, instance)),
			() => h("div", {class: classes}, [
				inserterNag(h, instance)
			])
		);
	}

}

export class ColumnsBlock extends Block
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
		return translate("Displays blocks in a column view.");
	}

	get keywords()
	{
		return [translate("Grid"), translate("Container")];
	}

	get name()
	{
		return translate("Columns");
	}

	constructor()
	{
		super("columns", "layout", "view-column");
	}

	prerender(instance)
	{
		const preset = presets[instance.options.preset] || undefined;
		const classes = `row be-block-columns ${instance.options.class} ${instance.options.gutters ? "" : "no-gutters"}`;
		const columns = preset ? preset.columns : instance.options.columns;

		return {preset, classes, columns};
	}

	render(h, instance)
	{
		const {classes, columns} = this.prerender(instance);

		range(0, columns, index =>
		{
			const child = instanceChildOrDefault(this, instance, index);

			if (!instance.children[index])
				instance.children.push(child);
		});

		return h("div", {class: classes}, renderChildren(instance));
	}

	renderEditor(h, instance)
	{
		const {classes, columns} = this.prerender(instance);

		range(0, columns, index =>
		{
			const child = instanceChildOrDefault(this, instance, index);

			if (!instance.children[index])
				instance.children.push(child);
		});

		return h("div", {class: classes}, instance.children.map(child => h(BlockView, {
			key: child.hash,
			props: {instance: child}
		})));
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				group(h, "Grid settings", true, [
					presetsSelect(h, instance),
					optional(instance.options.preset === -1, () => rangeSlider(h, "Amount of columns", () => instance.options.columns, columns =>
					{
						instance.setOptions({columns});
						instance.setChildren(instance.children.slice(0, columns));
					}, 2, 6, 1, "@0 columns")),
					toggleButton(h, "Gutters", () => instance.options.gutters, gutters => instance.setOptions({gutters}))
				]),
				advancedOptions(h, [
					additionalClasses(h, instance)
				])
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
