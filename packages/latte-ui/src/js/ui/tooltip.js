/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { createElement, live } from "../util/dom.js";
import { on } from "../core/action.js";
import { raf } from "../util/dom";
import { onlyMouse, onlyTouch } from "../util/touch";

let tooltipContained = true;
let tooltipElement = null;

export function initializeTooltips()
{
	tooltipElement = createElement("div", div =>
	{
		div.setAttribute("class", "tooltip is-hidden");

		document.body.appendChild(div);
	});

	live(document.body, "[data-tooltip]", "mouseover", onlyMouse(onTooltipElementHover));
	live(document.body, "[data-tooltip]", "mouseout", onlyMouse(despawnTooltip));

	live(document.body, "[data-tooltip]", "touchstart", onlyTouch(onTooltipElementHover));
	live(document.body, "[data-tooltip]", "touchend", onlyTouch(despawnTooltip));

	on("latte:tooltip", data => spawnTooltip(data));
	on("latte:tooltip:hide", () => despawnTooltip());
}

function despawnTooltip()
{
	tooltipElement.classList.add("is-hidden");
}

function spawnTooltip(data)
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

	tooltipElement.style.removeProperty("--ta-top");
	tooltipElement.style.removeProperty("--ta-left");

	raf(() =>
	{
		const tooltipRect = tooltipElement.getBoundingClientRect();

		let top = 0;
		let left = 0;
		let offset = 9;

		if (tooltipElement.classList.contains("tooltip-top"))
		{
			top = y - tooltipRect.height - offset;
			left = x - (tooltipRect.width / 2);
		}
		else if (tooltipElement.classList.contains("tooltip-left"))
		{
			top = y - (tooltipRect.height / 2);
			left = x - tooltipRect.width - offset;
		}
		else if (tooltipElement.classList.contains("tooltip-right"))
		{
			top = y - (tooltipRect.height / 2);
			left = x + offset;
		}
		else if (tooltipElement.classList.contains("tooltip-bottom"))
		{
			top = y + offset;
			left = x - (tooltipRect.width / 2);
		}

		if (data.adjustCoordinates)
		{
			let coords = data.adjustCoordinates(left, top, tooltipRect);
			top = coords.y;
			left = coords.x;
		}

		if (tooltipContained)
		{
			let adjustment = 0;
			let offset = 12;

			if (tooltipElement.classList.contains("tooltip-top") || tooltipElement.classList.contains("tooltip-bottom"))
			{
				if (offset > left)
				{
					adjustment = offset - left;
					left += adjustment;
				}

				if ((left + tooltipRect.width + offset) > window.innerWidth)
				{
					adjustment = window.innerWidth - (left + tooltipRect.width + offset);
					left += adjustment;
				}

				if (adjustment !== 0)
					tooltipElement.style.setProperty("--ta-left", `calc((50% - .45em) - ${Math.floor(adjustment)}px)`);
			}
			else if (tooltipElement.classList.contains("tooltip-left") || tooltipElement.classList.contains("tooltip-right"))
			{
				if (offset > top)
				{
					adjustment = offset - top;
					top += adjustment;
				}

				if ((top + tooltipRect.height + offset) > window.innerHeight)
				{
					adjustment = window.innerHeight - (top + tooltipRect.height + offset);
					top += adjustment;
				}

				if (adjustment !== 0)
					tooltipElement.style.setProperty("--ta-top", `calc((50% - .45em) - ${Math.floor(adjustment)}px)`);
			}
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

	const pos = el.getBoundingClientRect();

	spawnTooltip({
		x: pos.left + (pos.width / 2),
		y: pos.top + (pos.height / 2),
		classes: classes.split(" "),
		content: str,
		position: null,

		adjustCoordinates(x, y)
		{
			if (tooltipElement.classList.contains("tooltip-top"))
				y -= pos.height / 2;
			else if (tooltipElement.classList.contains("tooltip-left"))
				x -= pos.width / 2;
			else if (tooltipElement.classList.contains("tooltip-right"))
				x += pos.width / 2;
			else if (tooltipElement.classList.contains("tooltip-bottom"))
				y += pos.height / 2;

			return {x, y};
		}
	});
}
