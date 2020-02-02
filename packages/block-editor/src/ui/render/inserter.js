/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { translate } from "../../core/i18n";
import { terminate } from "../../util/event";
import { Latte } from "../../util/latte";

import Icon from "../Icon";

export function inserterInline(h, instance, indexAdjust = 0)
{
	return inserterInlineAbstract(h, "plus", evt => defaultOnClickHandler(evt, instance, instance.parent, ".be-inserter-inline", -12, 12, instance.index + indexAdjust));
}

export function inserterInlineAbstract(h, icon, onClick)
{
	return h("div", {class: "be-inserter-inline", on: {click: onClick}}, [
		h(Icon, {props: {name: icon}})
	]);
}

export function inserterNag(h, instance)
{
	return inserterNagAbstract(h, "plus-circle", "Add block", evt =>
	{
		instance.select();
		defaultOnClickHandler(evt, instance, instance, ".be-inserter-nag");
	});
}

export function inserterNagAbstract(h, icon, message, onClick)
{
	return h("div", {class: "be-inserter-nag", on: {click: onClick}}, [
		h(Icon, {props: {name: icon}}),
		h("span", translate(message))
	]);
}

function defaultOnClickHandler(evt, instance, parent, selector, ax = -15, ay = 12, index = undefined)
{
	terminate(evt);

	const elm = Latte.util.dom.closest(evt.target, selector);

	instance.editor.inserter.open(elm.querySelector("i.mdi"), block =>
	{
		instance.insertBlock(block.id, index, {}, {}, parent);
	}, ax, ay);
}
