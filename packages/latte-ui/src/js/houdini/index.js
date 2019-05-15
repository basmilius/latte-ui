/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getLattePath } from "../util/dom";

function registerCSSPaintWorklets()
{
	document.body.classList.add("css-paint-api");

	let path = getLattePath();

	// noinspection JSIgnoredPromiseFromCall
	CSS.paintWorklet.addModule(`${path}worklet/paint/app-bar-cutout.js`);

	// noinspection JSIgnoredPromiseFromCall
	CSS.paintWorklet.addModule(`${path}worklet/paint/btn-background.js`);
}

function registerCSSProperties()
{
	document.body.classList.add("css-props-values");

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
		name: "--btn-hover-state",
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
