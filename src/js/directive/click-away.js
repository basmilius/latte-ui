/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { timeout } from "../util/core.js";

const handler = "latte:clickaway-handler";

/**
 * Creates the v-click-away directive.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createDirective()
{
	Vue.directive("click-away", {

		bind,

		unbind,

		update

	});
}

/**
 * Invoked when our directive is bounded to a component.
 *
 * @param {HTMLElement} element
 * @param {*} binding
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function bind(element, binding)
{
	unbind(element);

	let callback = binding.value;
	let initialMactroTaskEnded = false;

	if (typeof callback !== "function")
		return;

	timeout(0, () => initialMactroTaskEnded = true);

	element[handler] = function (evt)
	{
		if (initialMactroTaskEnded && !element.contains(evt.target))
			return callback(evt);
	};

	document.documentElement.addEventListener("click", element[handler], {passive: true});
}

/**
 * Invoked when our directive is not bounded to a component anymore.
 *
 * @param {HTMLElement} element
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function unbind(element)
{
	document.documentElement.removeEventListener("click", element[handler]);

	delete element[handler];
}

/**
 * Invoked when the directive or assigned component is updated.
 *
 * @param {HTMLElement} element
 * @param {*} binding
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function update(element, binding)
{
	if (binding.value === binding.oldValue)
		return;

	bind(element, binding);
}
