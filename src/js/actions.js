/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { live } from "./util/dom.js";
import { register } from "./sdk.js";
import { updateURLHash } from "./util/core.js";

const actions = {};

/**
 * Initializes the global action system.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initialize()
{
	live(document.body, "[data-action]", "click", (element, evt) => onAction(element, evt), {passive: true});

	register(latte => latte.actions = {dispatch, on});

	window.addEventListener("latte:hash-change", onHashChange, false);
}

/**
 * Fires an action.
 *
 * @param {String} action
 * @param {*} data
 * @param {HTMLElement|undefined} el
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
 * Registers an action.
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

/**
 * Invoked when an action is called.
 *
 * @param {HTMLElement} element
 * @param {Event} evt
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function onAction(element, evt)
{
	const action = element.dataset.action;
	const actionData = element.dataset;

	if (typeof actions[action] === "undefined")
		return;

	actions[action].forEach(callback => callback(actionData, element, evt));
}

/**
 * Invoked when the URL hash has changed.
 *
 * @param {CustomEvent} evt
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function onHashChange(evt)
{
	const parameters = evt.detail;
	const action = parameters.action;

	delete parameters.action;

	updateURLHash(parameters);

	if (action === undefined || action === null)
		return;

	dispatch(action.value, action.vars);
}
