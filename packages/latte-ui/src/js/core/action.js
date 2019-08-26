/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { live } from "../util/dom.js";

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
 * Initializes action stuff.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.7.0
 */
export function initializeActions()
{
	live(document.body, "[data-action]", "click", onAction, {passive: true});
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
	if (!actions[action])
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
	if (!actions[action])
		actions[action] = [];

	const sub = new ActionSubscription(action, callback);

	actions[action].push(sub);

	return sub;
}

/**
 * Removes saved= from the query string.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function removeSavedFromQueryString()
{
	let queryString = window.location.search.substr(1);

	if (queryString === "")
		return;

	if (queryString.substr(0, 6) === "saved=")
		history.replaceState(null, "", window.location.pathname || window.location.path);
}

function onAction(element, evt)
{
	const action = element.dataset.action;
	const actionData = element.dataset;

	if (!actions[action])
		return;

	actions[action].forEach(sub => sub.handle(actionData, element, evt));
}

export default {
	dispatch,
	on
}
