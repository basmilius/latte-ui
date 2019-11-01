import { translate } from "../../core/i18n";
import { Latte } from "../../util/latte";

import Icon from "../Icon";

export function inserterNag(h, instance)
{
	return inserterNagAbstract(h, instance, "plus-circle", "Add block", evt =>
	{
		const elm = Latte.util.dom.closest(evt.target, ".be-inserter-nag");

		instance.editor.inserter.open(elm.querySelector("i.mdi"), block =>
		{
			instance.insertBlock(block.id, undefined, {}, {}, instance);
		}, -15, 12);
	});
}

export function inserterNagAbstract(h, instance, icon, message, onClick)
{
	return h("div", {class: "be-inserter-nag", on: {click: evt => onClick(evt)}}, [
		h(Icon, {props: {name: icon}}),
		h("span", translate(message))
	]);
}
