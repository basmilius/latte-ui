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

	render(h, api)
	{
		return render(h, "ul", api);
	}

	renderEditor(h, api)
	{
		return renderEditor(h, "ul", api);
	}

	renderOptions(h, api)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, api),
			renderTextFormatToolbar(h, api, {textAlignment: false, textIdentation: false}),
			optionTextColor(h, api),
			optionTextSize(h, api)
		]);
	}

}
