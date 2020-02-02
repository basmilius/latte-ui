/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getElementDimensionsAndOffset } from "../../util/element";
import { terminate } from "../../util/event";
import { saveLastSelection } from "../../util/selection";
import { Latte } from "../../util/latte";

import Fragment from "../../component/Fragment";
import Icon from "../Icon";
import SettingsGroup from "../../component/SettingsGroup";

export function description(h, block)
{
	return h("div", {class: "be-block-description"}, [
		h(Icon, {props: {name: block.icon}}),
		h("div", {class: "caption"}, [
			h("strong", block.name),
			h("p", {class: "text-muted"}, block.description)
		])
	]);
}

export function fragment(h, children)
{
	return h(Fragment, children);
}

export function group(h, title, isPadded, children)
{
	return h(SettingsGroup, {
		props: {
			title: title,
			padded: isPadded
		}
	}, children);
}

export function row(h, isRow, children, tag = "label")
{
	return h(tag, {class: `be-settings-row ${isRow ? "flex-row" : "flex-column"}`}, children);
}

export function settings(h, instance, children)
{
	return h("latte-portal", {props: {to: `${instance.editor.uniqueId}-settings-block`}}, children);
}

export function nag(h, instance, calc, classes, children)
{
	const nagId = Latte.api.id();

	instance.withElement(element =>
	{
		const fn = () =>
		{
			if (!element || !instance.isSelected || !instance.element || !element.parentNode)
				return;

			const nag = element.parentNode.querySelector(`#${nagId}`);
			const wrap = instance.editor.$el.querySelector(".be-content-wrapper");

			if (nag && wrap)
			{
				const dim = getElementDimensionsAndOffset(element);
				const edim = getElementDimensionsAndOffset(wrap);
				const rdim = getElementDimensionsAndOffset(instance.editor.$el);
				const tdim = getElementDimensionsAndOffset(nag);

				const {top, left} = calc(dim, edim, rdim, tdim);

				nag.style.setProperty("--nagX", `${left}px`);
				nag.style.setProperty("--nagY", `${top}px`);
			}

			window.requestAnimationFrame(fn);
		};

		fn();
	});

	return h("div", {
		domProps: {id: nagId},
		class: `be-editor-nag ${classes}`,
		on: {
			click: evt => terminate(evt),
			mousedown: evt => terminate(evt, () => saveLastSelection(instance))
		}
	}, children);
}

export function sidebar(h, instance, children)
{
	return nag(h, instance, sidebarCalc, "be-sidebar", children);
}

export function toolbar(h, instance, children)
{
	return nag(h, instance, toolbarCalc, "be-toolbar", children);
}

function sidebarCalc(dim, edim, rdim)
{
	const offset = 72;
	const snapPoint = rdim.offset.top + 138;

	if (dim.offset.top + dim.dimensions.height < snapPoint - offset)
		dim.offset.top = dim.offset.top + offset + dim.dimensions.height;
	else if (dim.offset.top < snapPoint)
		dim.offset.top = snapPoint;

	if (dim.offset.left > edim.offset.left + edim.dimensions.width / 2)
		dim.offset.left = edim.offset.left + edim.dimensions.width + 69 + 24;

	return {
		top: dim.offset.top - offset,
		left: dim.offset.left - offset
	};
}

function toolbarCalc(dim, edim, rdim, tdim)
{
	const offset = 72;
	const snapPoint = rdim.offset.top + 138;

	if (dim.offset.top + dim.dimensions.height < snapPoint - offset)
		dim.offset.top = dim.offset.top + offset + dim.dimensions.height;
	else if (dim.offset.top < snapPoint)
		dim.offset.top = snapPoint;

	if (dim.offset.left > edim.offset.left + edim.dimensions.width / 2)
		dim.offset.left = edim.offset.left + edim.dimensions.width - tdim.dimensions.width + 15;
	else
		dim.offset.left = dim.offset.left - 15;

	return {
		top: dim.offset.top - offset,
		left: dim.offset.left
	};
}
