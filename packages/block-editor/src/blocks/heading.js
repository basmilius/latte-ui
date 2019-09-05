import { BlockBase } from "../block";
import { render, renderEditor } from "../primitive/text";
import { optionButtons, optionTextColor } from "../primitive/element";
import { blockActions, settingsGroup } from "../primitive/settings";
import { translate } from "../utils";

const headerTypes = [
	{value: "h1", icon: "format-header-1", tooltip: translate("Header 1")},
	{value: "h2", icon: "format-header-2", tooltip: translate("Header 2")},
	{value: "h3", icon: "format-header-3", tooltip: translate("Header 3")},
	{value: "h4", icon: "format-header-4", tooltip: translate("Header 4")},
	{value: "h5", icon: "format-header-5", tooltip: translate("Header 5")},
	{value: "h6", icon: "format-header-6", tooltip: translate("Header 6")}
];

export class HeadingBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			color: undefined,
			type: "h3",
			text: ""
		};
	}

	get description()
	{
		return "Represents a header text."
	}

	get isInline()
	{
		return true;
	}

	get keywords()
	{
		return ["header", "heading", "text", "h1", "h2", "h3", "h4", "h5", "h6"];
	}

	get name()
	{
		return "Header";
	}

	constructor()
	{
		super("heading", "text", "format-header-1");
	}

	render(h, entry)
	{
		return render(entry.options.type, h, entry);
	}

	renderEditor(h, entry)
	{
		return renderEditor(entry.options.type, h, entry);
	}

	renderOptions(h, entry)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, entry),
			optionTextColor(h, entry),
			optionButtons(h, translate("Type"), headerTypes, () => entry.options.type, type => entry.setOptions({type}))
		]);
	}

}
