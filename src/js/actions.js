/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
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

	actions[action].forEach(callback => callback(data, el, evt));
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

	actions[action].push(callback);
}

function onAction(element, evt)
{
	const action = element.dataset.action;
	const actionData = element.dataset;

	if (typeof actions[action] === "undefined")
		return;

	actions[action].forEach(callback => callback(actionData, element, evt));
}

export default {

	dispatch,

	on

}

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
