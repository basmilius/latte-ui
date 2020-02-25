/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { on } from "../core/action";
import { id } from "../core/api"
import { isIterable } from "../util/object";
import { icon } from "../core";
import { closest, createElement } from "../util/dom";
import { getMainElement } from "../options";

export function initializeNotices()
{
	let notices = Array.from(document.querySelectorAll("div.notice"));
	notices = notices.filter(notice => notice.querySelector("button.notice-dismiss") !== null);
	notices = notices.map(notice => notice.querySelector("button.notice-dismiss"));

	notices.forEach(dismissButton => dismissButton.addEventListener("click", () => closest(dismissButton, ".notice").remove()));

	on("latte:notice", data => create(decodeURIComponent(data.message), data.type || "info"));
}

export function areEntitiesNotices(entities)
{
	if (!isIterable(entities))
		return false;

	for (let i in entities)
		if (entities.hasOwnProperty(i))
			if (!isEntityNotice(entities[i]))
				return false;

	return true;
}

export function create(message, type, isDismissible = true)
{
	const noticeId = id();

	const notice = createElement("div", div =>
	{
		div.classList.add("notice", `notice-${type}`, "is-fluid");
		div.setAttribute("id", noticeId);
		div.appendChild(createElement("div", c =>
		{
			c.classList.add("container");
			c.appendChild(createElement("div", b =>
			{
				b.classList.add("notice-body");
				b.appendChild(createElement("p", p => p.innerHTML = message));

				if (!isDismissible)
					return;

				b.appendChild(createElement("button", button =>
				{
					button.classList.add("btn", "btn-text", "btn-icon", "notice-dismiss");
					button.innerHTML = icon("close");
					button.addEventListener("click", () => remove(noticeId), {once: true, passive: true});
				}));
			}));
		}));
	});

	const content = getMainElement().querySelector("div.content");

	content.insertBefore(notice, content.querySelector(":scope > *:first-child"));

	return noticeId;
}

// This method is used in Latte Framework.
export function isEntityNotice(entity)
{
	return entity["@type"] === "Latte\\Data\\Model\\Notice";
}

export function remove(noticeId)
{
	const notice = document.querySelector(`div.notice#${noticeId}`);
	notice.parentNode.removeChild(notice);
}

export default {
	areEntitiesNotices,
	create,
	isEntityNotice,
	remove
}
