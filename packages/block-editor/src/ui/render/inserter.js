import { translate } from "../../core/i18n";
import { terminate } from "../../util/event";
import { Latte } from "../../util/latte";

import Icon from "../Icon";

export function inserterInline(h, instance)
{
	return inserterInlineAbstract(h, "plus", defaultOnClickHandler(instance, instance.parent, ".be-inserter-inline", -12, 12, instance.index));
}

export function inserterInlineAbstract(h, icon, onClick)
{
	return h("div", {class: "be-inserter-inline", on: {click: onClick}}, [
		h(Icon, {props: {name: icon}})
	]);
}

export function inserterNag(h, instance)
{
	return inserterNagAbstract(h, "plus-circle", "Add block", defaultOnClickHandler(instance, instance, ".be-inserter-nag"));
}

export function inserterNagAbstract(h, icon, message, onClick)
{
	return h("div", {class: "be-inserter-nag", on: {click: onClick}}, [
		h(Icon, {props: {name: icon}}),
		h("span", translate(message))
	]);
}

function defaultOnClickHandler(instance, parent, selector, ax = -15, ay = 12, index = undefined)
{
	return evt =>
	{
		terminate(evt);

		const elm = Latte.util.dom.closest(evt.target, selector);

		instance.editor.inserter.open(elm.querySelector("i.mdi"), block =>
		{
			instance.insertBlock(block.id, index, {}, {}, parent);
		}, ax, ay);
	};
}
