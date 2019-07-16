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

	render(h, api)
	{
		return render(h, "ol", api);
	}

	renderEditor(h, api)
	{
		return renderEditor(h, "ol", api);
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
