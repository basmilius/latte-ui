import { AbstractListBlock } from "../primitive/list";
import { translate } from "../../core/i18n";

export class OrderedListBlock extends AbstractListBlock
{

	get description()
	{
		return translate("An list that is ordered with numbers.");
	}

	get keywords()
	{
		return [translate("List"), translate("Ordered")];
	}

	get name()
	{
		return translate("Ordered List");
	}

	constructor()
	{
		super("ol", "ordered-list", "text", "format-list-numbered");
	}

}
