/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { id as generateUniqueId } from "./util/api.js"
import { register } from "./sdk.js";
import { querySelectorAll } from "./util/dom.js";
import { on } from "./actions.js";
import { isIterable } from "./util/core.js";

/**
 * Initializes the notice system.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initialize()
{
	let notices = querySelectorAll("div.notice");
	notices = notices.filter(notice => notice.querySelector("button.notice-dismiss") !== null);
	notices = notices.map(notice => notice.querySelector("button.notice-dismiss"));

	notices.forEach(dismissButton => dismissButton.addEventListener("click", () => dismissButton.parentNode.parentNode.removeChild(dismissButton.parentNode)));

	register(latte => latte.notices = {areEntitiesNotices, create, isEntityNotice, remove});

	on("latte:notice", data => create(decodeURIComponent(data.message), data.type || "info"));
}

/**
 * Returns TRUE if all entities are notices.
 *
 * @param {*} entities
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function areEntitiesNotices(entities)
{
	if (!isIterable(entities))
		return false;

	for (let entity of entities)
		if (!isEntityNotice(entity))
			return false;

	return true;
}

/**
 * Creates a new notice.
 *
 * @param {String} message
 * @param {String} type
 * @param {Boolean} dismissible
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function create(message, type, dismissible = true)
{
	const id = generateUniqueId();

	const notice = document.createElement("div");
	notice.classList.add("notice", `notice-${type}`, "with-button");
	notice.setAttribute("id", id);

	if (dismissible)
	{
		const dismiss = document.createElement("button");
		dismiss.classList.add("btn", "btn-icon", "btn-dark", "notice-dismiss");

		const icon = document.createElement("i");
		icon.classList.add("mdi", "mdi-close");

		dismiss.appendChild(icon);
		dismiss.addEventListener("click", () => remove(id), {passive: true});

		notice.appendChild(dismiss);
	}

	const p = document.createElement("p");
	p.innerHTML = message;

	notice.appendChild(p);

	const content = document.querySelector("main#app > div.content");

	content.insertBefore(notice, content.querySelector(":scope > *:first-child"));

	return id;
}

/**
 * Returns TRUE if an entity is a notice.
 *
 * @param {*} entity
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function isEntityNotice(entity)
{
	return entity["@type"] && entity["@type"] === "Latte\\Framework\\Entity\\Notice";
}

/**
 * Removes a notice by id.
 *
 * @param {String} id
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function remove(id)
{
	const notice = document.querySelector(`div.notice#${id}`);
	notice.parentNode.removeChild(notice);
}
