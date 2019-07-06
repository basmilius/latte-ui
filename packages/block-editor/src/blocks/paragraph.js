import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";
import { BlockBase } from "../block";
import { optionTextColor, optionTextSize, render, renderEditor } from "./primitive/text";

export class ParagraphBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			color: undefined,
			fontSize: 1,
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
		return renderEditor("p", h, api);
	}

	renderOptions(h, {editor, index, indexMax, rearrange, remove, options, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			optionTextColor(h, {editor, options, setOptions}),
			optionTextSize(h, {options, setOptions})
		]);
	}

}
