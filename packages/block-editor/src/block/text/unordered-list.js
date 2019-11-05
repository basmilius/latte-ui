import { AbstractListBlock } from "../primitive/list";
import { translate } from "../../core/i18n";

export class UnorderedListBlock extends AbstractListBlock
{

	get description()
	{
		return translate("An list that is not ordered.");
	}

	get keywords()
	{
		return [translate("List"), translate("Unordered")];
	}

	get name()
	{
		return translate("Unordered List");
	}

	constructor()
	{
		super("ul", "unordered-list", "text", "format-list-bulleted");
	}

}
