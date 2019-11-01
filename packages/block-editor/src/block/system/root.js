import { Block } from "../../core/block/block";
import { inserterNag } from "../../ui/render/inserter";
import { fragment } from "../../ui/render/settings";
import { either } from "../../util/vue";

import BlockView from "../../component/BlockView";

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
			() => fragment(h, instance.children.map(child => h(BlockView, {
				key: child.hash,
				props: {instance: child}
			}))),
			() => fragment(h, [
				inserterNag(h, instance)
			])
		);
	}

}
