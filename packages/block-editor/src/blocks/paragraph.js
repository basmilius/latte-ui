import { BlockBase } from "../block";
import { optionTextColor, optionTextSize } from "../primitive/element";
import { render, renderEditor, renderTextFormatToolbar } from "../primitive/text";
import { blockActions, settingsGroup } from "../primitive/settings";

export class ParagraphBlock extends BlockBase
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
		return "Represents some text."
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
		super("paragraph", "text", "format-paragraph");
	}

	render(h, api)
	{
		return render("p", h, api);
	}

	renderEditor(h, api)
	{
		return renderEditor("p", h, api, "Start writing or type / to insert a block...");
	}

	renderOptions(h, api)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, api),
			renderTextFormatToolbar(h, api),
			optionTextColor(h, api),
			optionTextSize(h, api)
		]);
	}

}
