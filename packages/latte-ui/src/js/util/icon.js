/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { deepMerge } from "./object";

export function materialIconFactory(icon, createElement = undefined, createElementOptions = {})
{
	if (icon !== "branding")
		icon = `mdi-${icon}`;

	if (!createElement)
		return `<i class="mdi ${icon}"></i>`;

	return createElement(
		"i",
		deepMerge(
			{},
			{
				attrs: {"aria-hidden": "true"},
				class: ["mdi", icon]
			},
			createElementOptions
		)
	);
}
