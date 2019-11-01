import { Block } from "../../core/block/block";
import { render, renderEditor } from "../primitive/text";
import { description, fragment, group, settings, sidebar, toolbar } from "../../ui/render/settings";
import { simpleColorSelect } from "../../ui/render/color";
import { divider, rangeSlider } from "../../ui/render/element";
import { alignments, boldItalicUnderline, indent } from "../../ui/render/text";
import { additionalClasses, advancedOptions, blockActions } from "../../ui/render/block";

export class ParagraphBlock extends Block
{

	get defaultOptions()
	{
		return {
			align: "left",
			color: undefined,
			fontSize: 1,
			indent: 0,
			text: ""
		};
	}

	get description()
	{
		return "A simple paragraph of text."
	}

	get keywords()
	{
		return ["paragraph", "text"];
	}

	get name()
	{
		return "Paragraph";
	}

	constructor()
	{
		super("paragraph", "text", "format-pilcrow");
	}

	render(h, instance)
	{
		return render("p", h, instance);
	}

	renderEditor(h, instance)
	{
		return renderEditor("p", h, instance, "Start writing or type / to insert a block...");
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				group(h, "Text settings", true, [
					rangeSlider(h, "Size", () => instance.options.fontSize, fontSize => instance.setOptions({fontSize}), .7, 3, .1, "@0em")
				]),
				group(h, "Color settings", true, [
					simpleColorSelect(h, "Color", () => instance.options.color, color => instance.setOptions({color}))
				]),
				advancedOptions(h, [
					additionalClasses(h, instance)
				])
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			]),
			toolbar(h, instance, [
				boldItalicUnderline(h, instance),
				divider(h, false),
				alignments(h, instance),
				divider(h, false),
				indent(h, instance)
			])
		]);
	}

}
