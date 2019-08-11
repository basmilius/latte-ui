/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getLattePath } from "../util/dom";
import { docRoot } from "../core";

function registerCSSPaintWorklets()
{
	let path = getLattePath();

	Promise
		.all([
			CSS.paintWorklet.addModule(`${path}worklet/paint/app-bar-cutout.js`),
			CSS.paintWorklet.addModule(`${path}worklet/paint/btn-background.js`)
		])
		.then(() => docRoot.classList.add("css-paint-api"))
		.catch(err => console.error(`[LatteUI] CSS Paint API not used because worklets could not load.`));
}

function registerCSSProperties()
{
	docRoot.classList.add("css-props-values");

	CSS.registerProperty({
		name: "--app-bar-alpha",
		syntax: "<number>",
		inherits: true,
		initialValue: 1
	});

	CSS.registerProperty({
		name: "--app-bar-cutout-offset",
		syntax: "<length-percentage>",
		inherits: true,
		initialValue: "50%"
	});

	CSS.registerProperty({
		name: "--btn-alpha",
		syntax: "<number>",
		inherits: false,
		initialValue: 1
	});

	CSS.registerProperty({
		name: "--btn-hover",
		syntax: "<number>",
		inherits: false,
		initialValue: 0
	});
}

export function initializeHoudiniApis()
{
	if (CSS && CSS.paintWorklet)
		registerCSSPaintWorklets();

	if (CSS && CSS.registerProperty)
		registerCSSProperties();
}
