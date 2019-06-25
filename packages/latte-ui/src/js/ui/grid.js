/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

export const eventBus = new Vue({});

export function bottom(layout)
{
	let max = 0, bottomY;

	for (let i = 0, len = layout.length; i < len; i++)
	{
		bottomY = layout[i].y + layout[i].height;

		if (bottomY > max)
			max = bottomY;
	}

	return max;
}

export function collides(item1, item2)
{
	if (item1 === item2)
		return false;

	if (item1.x + item1.width <= item2.x)
		return false;

	if (item1.x >= item2.x + item2.width)
		return false;

	if (item1.y + item1.height <= item2.y)
		return false;

	if (item1.y >= item2.y + item2.height)
		return false;

	// Yay!

	return true;
}

export function compact(layout, verticalCompact)
{
	const compareWith = getStatics(layout);
	const sorted = sortLayoutItemsByRowCol(layout);
	const out = Array(layout.length);

	for (let i = 0, len = sorted.length; i < len; i++)
	{
		let item = sorted[i];

		if (!item.static)
		{
			item = compactItem(compareWith, item, verticalCompact);

			compareWith.push(item);
		}

		out[layout.indexOf(item)] = item;

		item.moved = false;
	}

	return out;
}

export function compactItem(compareWith, item, verticalCompact)
{
	if (verticalCompact)
		while (item.y > 0 && !getFirstCollision(compareWith, item))
			item.y--;

	let collides;

	while ((collides = getFirstCollision(compareWith, item)))
		item.y = collides.y + collides.height;

	return item;
}

export function createCoreData(lastX, lastY, x, y)
{
	const isStart = !isNum(lastX);

	if (isStart)
	{
		return {
			deltaX: 0, deltaY: 0,
			lastX: x, lastY: y,
			x: x, y: y
		};
	}
	else
	{
		return {
			deltaX: x - lastX, deltaY: y - lastY,
			lastX: lastX, lastY: lastY,
			x: x, y: y
		};
	}
}

export function getAllCollisions(layout, layoutItem)
{
	return layout.filter((l) => collides(l, layoutItem));
}

export function getControlPosition(evt)
{
	return offsetXYFromParentOf(evt);
}

export function getFirstCollision(layout, layoutItem)
{
	for (let i = 0, len = layout.length; i < len; i++)
		if (collides(layout[i], layoutItem))
			return layout[i];
}

export function getLayoutItem(layout, id)
{
	for (let i = 0, len = layout.length; i < len; i++)
		if (layout[i].i === id)
			return layout[i];
}

export function getStatics(layout)
{
	return layout.filter((l) => l.static);
}

export function isNum(num)
{
	return typeof num === "number" && !isNaN(num);
}

export function moveElement(layout, item, x, y, isUserAction)
{
	if (item.static)
		return layout;

	if (item.y === y && item.x === x) return layout;

	const movingUp = y && item.y > y;

	if (typeof x === "number")
		item.x = x;

	if (typeof y === "number")
		item.y = y;

	item.moved = true;

	let sorted = sortLayoutItemsByRowCol(layout);

	if (movingUp)
		sorted = sorted.reverse();

	const collisions = getAllCollisions(sorted, item);

	for (let i = 0, len = collisions.length; i < len; i++)
	{
		const collision = collisions[i];

		if (collision.moved)
			continue;


		if (item.y > collision.y && item.y - collision.y > collision.height / 4)
			continue;

		if (collision.static)
			layout = moveElementAwayFromCollision(layout, collision, item, isUserAction);
		else
			layout = moveElementAwayFromCollision(layout, item, collision, isUserAction);
	}

	return layout;
}

export function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction)
{
	if (isUserAction)
	{
		const fakeItem = {
			x: itemToMove.x,
			y: itemToMove.y,
			width: itemToMove.width,
			height: itemToMove.height,
			id: "__fake__"
		};

		fakeItem.y = Math.max(collidesWith.y - itemToMove.height, 0);

		if (!getFirstCollision(layout, fakeItem))
			return moveElement(layout, itemToMove, undefined, fakeItem.y);
	}

	return moveElement(layout, itemToMove, undefined, itemToMove.y + 1);
}

export function offsetXYFromParentOf(evt)
{
	const offsetParent = evt.target.offsetParent || document.body;
	const offsetParentRect = evt.offsetParent === document.body ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

	const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
	const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

	return {x, y};
}

export function setTransform(top, left, width, height)
{
	const translate = `translate3d(${left}px,${top}px, 0)`;

	return {
		transform: translate,
		WebkitTransform: translate,
		MozTransform: translate,
		msTransform: translate,
		OTransform: translate,
		width: width + "px",
		height: height + "px",
		position: "absolute"
	};
}

export function sortLayoutItemsByRowCol(layout)
{
	return [].concat(layout).sort((a, b) => (a.y > b.y || (a.y === b.y && a.x > b.x)) ? 1 : -1);
}

export function validateLayout(layout, contextName = "Layout")
{
	const subProps = ["x", "y", "width", "height"];

	if (!Array.isArray(layout))
		throw new Error(`${contextName} must be an array!`);

	for (let i = 0, len = layout.length; i < len; i++)
	{
		const item = layout[i];

		for (let j = 0; j < subProps.length; j++)
			if (typeof item[subProps[j]] !== "number")
				throw new Error(`[LatteUI] ${contextName}[${i}].${subProps[j]} must be a number!`);

		if (item.i && typeof item.i !== "string")
			throw new Error(`[LatteUI] ${contextName}[${i}].i must be a string!`);

		if (item.static !== undefined && typeof item.static !== "boolean")
			throw new Error(`[LatteUI] ${contextName}[${i}].static must be a boolean!`);
	}
}
