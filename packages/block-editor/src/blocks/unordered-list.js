import { BlockBase } from "../block";
import { render, renderEditor } from "../primitive/list";
import { renderTextFormatToolbar } from "../primitive/text";
import { optionTextColor, optionTextSize } from "../primitive/element";
import { blockActions, settingsGroup } from "../primitive/settings";

export class UnorderedListBlock extends BlockBase
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
		return "An list that is not ordered.";
	}

	get isInline()
	{
		return true;
	}

	get keywords()
	{
		return ["list", "unordered"];
	}

	get name()
	{
		return "Unordered List";
	}

	constructor()
	{
		super("unordered-list", "text", "format-list-bulleted");
	}

	render(h, entry)
	{
		return render(h, "ul", entry);
	}

	renderEditor(h, entry)
	{
		return renderEditor(h, "ul", entry);
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
