import { AbstractListBlock } from "../primitive/list";

export class UnorderedListBlock extends AbstractListBlock
{

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
		super("ul", "unordered-list", "text", "format-list-bulleted");
	}

}
