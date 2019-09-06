import { BlockBase } from "../block";
import BEBlocks from "../BEBlocks";

export class RootBlock extends BlockBase
{

	get canHaveChildren()
	{
		return true;
	}

	get showInInserter()
	{
		return false;
	}

	constructor()
	{
		super("root", "", "");
	}

	renderEditor(h, entry)
	{
		return h(BEBlocks, {
			props: {entry}
		});
	}

}
