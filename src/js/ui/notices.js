/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { on } from "../actions.js";
import { id } from "../api.js"
import { isIterable } from "../core.js";

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

	for (let entity of entities)
		if (!isEntityNotice(entity))
			return false;

	return true;
}

export function create(message, type, dismissible = true)
{
	const noticeId = id();

	const notice = document.createElement("div");
	notice.classList.add("notice", `notice-${type}`, "with-button");
	notice.setAttribute("id", noticeId);

	if (dismissible)
	{
		const dismiss = document.createElement("button");
		dismiss.classList.add("btn", "btn-text", "btn-icon", "btn-dark", "notice-dismiss");

		const icon = document.createElement("i");
		icon.classList.add("mdi", "mdi-close");

		dismiss.appendChild(icon);
		dismiss.addEventListener("click", () => remove(noticeId), {passive: true});

		notice.appendChild(dismiss);
	}

	const p = document.createElement("p");
	p.innerHTML = message;

	notice.appendChild(p);

	const content = document.querySelector("main#app > div.content");

	content.insertBefore(notice, content.querySelector(":scope > *:first-child"));

	return noticeId;
}

export function isEntityNotice(entity)
{
	return entity["@type"] === "Latte\\Framework\\Entity\\Notice";
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
