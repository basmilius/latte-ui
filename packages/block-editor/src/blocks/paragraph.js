import { BlockBase } from "../block";
import { optionAdditionalClasses, optionTextColor, optionTextSize } from "../primitive/element";
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

	render(h, entry)
	{
		return render("p", h, entry);
	}

	renderEditor(h, entry)
	{
		return renderEditor("p", h, entry, "Start writing or type / to insert a block...");
	}

	renderOptions(h, entry)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, entry),
			renderTextFormatToolbar(h, entry),
			optionTextColor(h, entry),
			optionTextSize(h, entry),
			optionAdditionalClasses(h, entry)
		]);
	}

}
