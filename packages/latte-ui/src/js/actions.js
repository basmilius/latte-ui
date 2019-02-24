/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { live } from "./util/dom.js";
import { updateURLHash } from "./core.js";

const actions = {};

/**
 * Class ActionSubscription
 *
 * @author Bas Milius <bas@mili.us>
 * @version 1.0.0
 */
class ActionSubscription
{

	/**
	 * ActionSubscription Constructor.
	 *
	 * @param {String} action
	 * @param {Function} callback
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @version 1.0.0
	 */
	constructor(action, callback)
	{
		this.action = action;
		this.callback = callback;
		this.id = performance.now();
	}

	/**
	 * Calls the handler callback.
	 *
	 * @param {*} data
	 * @param {HTMLElement} el
	 * @param {Event} evt
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @version 1.0.0
	 */
	handle(data, el, evt)
	{
		this.callback(data, el, evt);
	}

	/**
	 * Unsubscribes the action callback.
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @version 1.0.0
	 */
	unsubscribe()
	{
		actions[this.action] = actions[this.action].filter(sub => sub.id !== this.id);
	}

}

/**
 * Dispatches an action.
 *
 * @param {String} action
 * @param {*|undefined} data
 * @param {Node|undefined} el
 * @param {Event|undefined} evt
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function dispatch(action, data = undefined, el = undefined, evt = undefined)
{
	if (typeof actions[action] === "undefined")
		return;

	actions[action].forEach(sub => sub.handle(data, el, evt));
}

/**
 * Registers an action listener.
 *
 * @param {String} action
 * @param {Function} callback
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function on(action, callback)
{
	if (typeof actions[action] === "undefined")
		actions[action] = [];

	const sub = new ActionSubscription(action, callback);

	actions[action].push(sub);

	return sub;
}

function onAction(element, evt)
{
	const action = element.dataset.action;
	const actionData = element.dataset;

	if (typeof actions[action] === "undefined")
		return;

	actions[action].forEach(sub => sub.handle(actionData, element, evt));
}

function onHashChange()
{
	const hash = location.hash.substr(1);

	if (!hash || hash.length === 0)
		return;

	const raw = hash.split("&");
	const parameters = {};

	for (let i in raw)
	{
		if (!raw.hasOwnProperty(i))
			continue;

		const item = raw[i];
		const kv = item.split("=", 2);
		let value = kv[1] || null;
		let vars = {};

		if (value.indexOf("/") > -1)
		{
			const ad = value.split("/");
			value = ad.shift();

			for (let j in ad)
			{
				if (!ad.hasOwnProperty(j))
					continue;

				const d = ad[j];
				const kv = d.split(":", 2);
				vars[kv[0]] = kv[1];
			}
		}

		parameters[kv[0]] = {value, vars};
	}

	dispatch("latte:hash-change", parameters);
}

window.addEventListener("hashchange", () => onHashChange(), false);
window.addEventListener("load", () => onHashChange(), false);

live(document.body, "[data-action]", "click", (element, evt) => onAction(element, evt), {passive: true});

on("latte:hash-change", parameters =>
{
	const action = parameters.action;

	delete parameters.action;

	updateURLHash(parameters);

	if (action === undefined || action === null)
		return;

	dispatch(action.value, action.vars);
});

export default {

	dispatch,

	on

}
