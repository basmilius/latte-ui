import { renderInstances } from "../../core/block/api";
import { Block } from "../../core/block/block";
import { inserterNag } from "../../ui/render/inserter";
import { fragment } from "../../ui/render/settings";
import { either } from "../../util/vue";

export class RootBlock extends Block
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

	renderEditor(h, instance)
	{
		return either(
			instance.children.length > 0,
			() => fragment(h, renderInstances(h, instance)),
			() => fragment(h, [
				inserterNag(h, instance)
			])
		);
	}

}
