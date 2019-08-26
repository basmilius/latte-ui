/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
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

export function initializeNotices()
{
	let notices = Array.from(document.querySelectorAll("div.notice"));
	notices = notices.filter(notice => notice.querySelector("button.notice-dismiss") !== null);
	notices = notices.map(notice => notice.querySelector("button.notice-dismiss"));

	notices.forEach(dismissButton => dismissButton.addEventListener("click", () => dismissButton.parentNode.parentNode.removeChild(dismissButton.parentNode)));

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

export function create(message, type, dismissible = true)
{
	const noticeId = id();

	const notice = document.createElement("div");
	notice.classList.add("notice", `notice-${type}`);
	notice.setAttribute("id", noticeId);

	const p = document.createElement("p");
	p.innerHTML = message;

	notice.appendChild(p);

	if (dismissible)
	{
		const dismiss = document.createElement("button");
		dismiss.classList.add("btn", "btn-text", "btn-icon", "notice-dismiss");
		dismiss.innerHTML = icon("close");
		dismiss.addEventListener("click", () => remove(noticeId), {passive: true});

		notice.appendChild(dismiss);
	}

	const content = document.querySelector("main#app > div.content");

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
