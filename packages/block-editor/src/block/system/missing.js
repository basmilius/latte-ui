import { Block } from "../../core/block/block";
import { translate } from "../../core/i18n";
import { fragment, sidebar } from "../../ui/render/settings";
import { blockActions } from "../../ui/render/block";

import Icon from "../../ui/Icon";

export class MissingBlock extends Block
{

	get showInInserter()
	{
		return false;
	}

	constructor()
	{
		super("missing", "", "");
	}

	renderEditor(h, instance)
	{
		return h("div", {class: "notice notice-error notice-outline mb-3"}, [
			h(Icon, {props: {name: "alert-circle"}}),
			h("div", {class: "d-flex flex-column"}, [
				h("strong", translate("Missing block")),
				h("p", translate("The @0 block is missing from the library. It won't be included in the rendered content. Remove this block to fix the issue.", instance.id))
			])
		]);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
