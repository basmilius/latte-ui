import { BlockBase } from "../block";
import { render, renderEditor } from "../primitive/list";
import { renderTextFormatToolbar } from "../primitive/text";
import { optionTextColor, optionTextSize } from "../primitive/element";
import { blockActions, settingsGroup } from "../primitive/settings";

export class OrderedListBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			align: "left",
			color: undefined,
			fontSize: 1,
			text: "<li></li>"
		};
	}

	get description()
	{
		return "An list that is ordered with numbers.";
	}

	get isInline()
	{
		return true;
	}

	get keywords()
	{
		return ["list", "ordered"];
	}

	get name()
	{
		return "Ordered List";
	}

	constructor()
	{
		super("ordered-list", "text", "format-list-numbered");
	}

	render(h, entry)
	{
		return render(h, "ol", entry);
	}

	renderEditor(h, entry)
	{
		return renderEditor(h, "ol", entry);
	}

	renderOptions(h, entry)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, entry),
			renderTextFormatToolbar(h, entry, {textAlignment: false, textIdentation: false}),
			optionTextColor(h, entry),
			optionTextSize(h, entry)
		]);
	}

}
