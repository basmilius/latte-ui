/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { deepMerge } from "./util/object";
import { materialIconFactory } from "./util/icon";

export const overlayAnimationDuration = 315;
export const snackbarAnimationDuration = 210;

const defaultOptions = {
	core: {
		root: undefined,
		tick: 200
	},
	emoji: {
		baseUrl: "https://bmcdn.nl/assets/joypixels/v5.5",
		enabled: false,
		path: "/png/64/%s.png"
	},
	i18n: {
		locale: navigator.language ?? "en",
		strings: {}
	},
	icon: {
		factory: materialIconFactory,
		selector: ".mdi"
	},
	moment: {
		enabled: true,
		locale: navigator.language ?? "en"
	}
};

let currentOptions = defaultOptions;
let mainElement = undefined;

export function getOptions()
{
	return currentOptions;
}

export function setOptions(options)
{
	return currentOptions = normalizeOptions(options);
}

export function normalizeOptions(options)
{
	return deepMerge({}, defaultOptions, options);
}

export function getMainElement()
{
	return mainElement || document.body;
}

export function setMainElement(elm)
{
	mainElement = elm;
}
