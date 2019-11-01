import { AbstractListBlock } from "../primitive/list";

export class OrderedListBlock extends AbstractListBlock
{

	get description()
	{
		return "An list that is ordered with numbers.";
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
		super("ol", "ordered-list", "text", "format-list-numbered");
	}

}
