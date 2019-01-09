/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getLattePath } from "./util/dom";

function registerCSSPaintWorklets()
{
	CSS.paintWorklet.addModule(getLattePath() + "worklet/paint/btn-contained-background.js");
}

function registerCSSProperties()
{
	CSS.registerProperty({
		name: "--btn-contained-hover-state",
		syntax: "<number>",
		inherits: false,
		initialValue: 0
	})
}

// From here we need to check if each Houdini API is available.

if (CSS && CSS.paintWorklet)
	registerCSSPaintWorklets();

if (CSS && CSS.registerProperty)
	registerCSSProperties();
