import { getElementDimensionsAndOffset } from "../../util/element";
import { terminate } from "../../util/event";
import { saveLastSelection } from "../../util/selection";
import { Latte } from "../../util/latte";

import BlockDescription from "../BlockDescription";
import Fragment from "../../component/Fragment";
import SettingsGroup from "../../component/SettingsGroup";

export function description(h, block)
{
	return h(BlockDescription, {
		props: {block}
	});
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
				const tdim = getElementDimensionsAndOffset(nag);

				const {top, left} = calc(dim, edim, tdim);

				nag.style.setProperty("--nag-x", `${left}px`);
				nag.style.setProperty("--nag-y", `${top}px`);
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

function sidebarCalc(dim, edim)
{
	/*
	 * Dear Developer,
	 *
	 * The calc() function should probably account for the height
	 * of our sidebar.
	 *
	 * - Bas
	 */

	if (dim.offset.top + dim.dimensions.height < 183)
		dim.offset.top = dim.offset.top + dim.dimensions.height;
	else if (dim.offset.top < 183)
		dim.offset.top = 183;

	if (dim.offset.left > edim.offset.left + edim.dimensions.width / 2)
		dim.offset.left = edim.offset.left + edim.dimensions.width + 69;

	return {
		top: dim.offset.top - 60,
		left: dim.offset.left - 60
	};
}

function toolbarCalc(dim, edim, tdim)
{
	if (dim.offset.top + dim.dimensions.height < 183)
		dim.offset.top = dim.offset.top + dim.dimensions.height;
	else if (dim.offset.top < 183)
		dim.offset.top = 183;

	if (dim.offset.left + (tdim.dimensions.width - 48) > edim.offset.left + edim.dimensions.width)
		dim.offset.left = edim.offset.left + edim.dimensions.width - tdim.dimensions.width;

	return {
		top: dim.offset.top - 60,
		left: dim.offset.left
	};
}
