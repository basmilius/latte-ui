import { BlockBase } from "../block";
import { translate } from "../utils";
import { icon } from "../primitive/element";

export class MissingBlock extends BlockBase
{

	get isInline()
	{
		return true;
	}

	get showInInserter()
	{
		return false;
	}

	constructor()
	{
		super("missing", "", "");
	}

	renderEditor(h, entry)
	{
		return h("div", {class: "notice notice-error notice-outline mb-3"}, [
			icon(h, "alert-circle"),
			h("div", {class: "d-flex flex-column"}, [
				h("strong", translate("Missing block")),
				h("span", translate("Block @0 is missing from the library. It won't be included in the rendered content.", entry.id))
			])
		]);
	}

}
