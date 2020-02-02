/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { docRoot } from "../core";

function registerCSSProperties()
{
	docRoot.classList.add("css-props-values");

	CSS.registerProperty({
		name: "--appBarAlpha",
		syntax: "<number>",
		inherits: true,
		initialValue: 1
	});
}

export function initializeHoudiniApis()
{
	if (typeof CSS !== "undefined" && CSS.registerProperty)
		registerCSSProperties();
}
