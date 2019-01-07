/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { createElement, live } from "../util/dom.js";
import { on } from "../actions.js";
import { raf } from "../util/dom";

let tooltipElement = null;

export function initializeTooltips()
{
	tooltipElement = createElement("div", div =>
	{
		div.setAttribute("class", "tooltip is-hidden");

		document.body.appendChild(div);
	});

	live(document.body, "[data-tooltip]", "pointerover", (el, evt) => onTooltipElementHover(el, evt));
	live(document.body, "[data-tooltip]", "pointerout", (el, evt) => onTooltipElementLeave(el, evt));

	on("latte:tooltip", data => onSmartTooltip(data));
	on("latte:tooltip:hide", () => onTooltipElementLeave());
}

function onSmartTooltip(data)
{
	let {x, y, content, position = "vertical"} = data;

	if (content === undefined)
		return;

	tooltipElement.innerHTML = "";

	if (content instanceof HTMLElement)
		tooltipElement.appendChild(content);
	else
		tooltipElement.innerHTML = content;

	tooltipElement.classList.remove(...tooltipElement.classList.values());
	tooltipElement.classList.add("tooltip", ...(data.classes || []));

	if (position === "top" || (position === "vertical" && y > window.innerHeight / 2))
		tooltipElement.classList.add("tooltip-top");

	if (position === "left" || (position === "horizontal" && x > window.innerWidth / 2))
		tooltipElement.classList.add("tooltip-left");

	if (position === "right" || (position === "horizontal" && x <= window.innerWidth / 2))
		tooltipElement.classList.add("tooltip-right");

	if (position === "bottom" || (position === "vertical" && y <= window.innerHeight / 2))
		tooltipElement.classList.add("tooltip-bottom");

	tooltipElement.style.removeProperty("--tooltip-arrow-top");
	tooltipElement.style.removeProperty("--tooltip-arrow-left");

	raf(() =>
	{
		const tRect = tooltipElement.getBoundingClientRect();

		let top = 0;
		let left = 0;
		let offset = 9;

		if (tooltipElement.classList.contains("tooltip-top"))
		{
			top = y - tRect.height - offset;
			left = x - (tRect.width / 2);
		}
		else if (tooltipElement.classList.contains("tooltip-left"))
		{
			top = y - (tRect.height / 2);
			left = x - tRect.width - offset;
		}
		else if (tooltipElement.classList.contains("tooltip-right"))
		{
			top = y - (tRect.height / 2);
			left = x + offset;
		}
		else if (tooltipElement.classList.contains("tooltip-bottom"))
		{
			top = y + offset;
			left = x - (tRect.width / 2);
		}

		tooltipElement.style.setProperty("transform", `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`);
	});
}

function onTooltipElementHover(el)
{
	const str = el.dataset.tooltip;
	const classes = el.dataset.tooltipClass || "tooltip-bottom";

	if (str.trim() === "")
		return;

	if (el.classList.contains("tooltip-disabled"))
		return;

	tooltipElement.innerHTML = str;
	tooltipElement.setAttribute("class", `tooltip ${classes}`);

	tooltipElement.style.removeProperty("--tooltip-arrow-top");
	tooltipElement.style.removeProperty("--tooltip-arrow-left");

	const rect = el.getBoundingClientRect();
	const tRect = tooltipElement.getBoundingClientRect();

	let top = 0;
	let left = 0;
	let offset = 9;

	if (tooltipElement.classList.contains("tooltip-top"))
	{
		top = rect.top - tRect.height - offset;
		left = rect.left + ((rect.width / 2) - (tRect.width / 2));
	}
	else if (tooltipElement.classList.contains("tooltip-left"))
	{
		top = rect.top + ((rect.height / 2) - (tRect.height / 2));
		left = rect.left - tRect.width - offset;
	}
	else if (tooltipElement.classList.contains("tooltip-right"))
	{
		top = rect.top + ((rect.height / 2) - (tRect.height / 2));
		left = rect.left + rect.width + offset;
	}
	else if (tooltipElement.classList.contains("tooltip-bottom"))
	{
		top = rect.top + rect.height + offset;
		left = rect.left + ((rect.width / 2) - (tRect.width / 2));
	}

	if (tooltipElement.classList.contains("tooltip-contain"))
	{
		let offset = 12;

		if (tooltipElement.classList.contains("tooltip-top") || tooltipElement.classList.contains("tooltip-bottom"))
		{
			let adj = 0;

			if (offset > left)
			{
				adj = offset - left;
				left += adj;
			}

			if ((left + tRect.width + offset) > window.innerWidth)
			{
				adj = window.innerWidth - (left + tRect.width + offset);
				left += adj;
			}

			if (adj !== 0)
				tooltipElement.style.setProperty("--tooltip-arrow-left", `calc((50% - .45em) - ${Math.floor(adj)}px)`);
		}

		if (tooltipElement.classList.contains("tooltip-left") || tooltipElement.classList.contains("tooltip-right"))
		{
			let adj = 0;

			if (offset > top)
			{
				adj = offset - top;
				top += adj;
			}

			if ((top + tRect.height + offset) > window.innerHeight)
			{
				adj = window.innerHeight - (top + tRect.height + offset);
				top += adj;
			}

			if (adj !== 0)
				tooltipElement.style.setProperty("--tooltip-arrow-top", `calc((50% - .45em) - ${Math.floor(adj)}px)`);
		}
	}

	tooltipElement.style.setProperty("transform", `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`);
}

function onTooltipElementLeave()
{
	tooltipElement.classList.add("is-hidden");
}
