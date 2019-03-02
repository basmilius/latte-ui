/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getMainElement } from "./index";

let counter = 0;

export function isPopupOpened()
{
	return counter > 0;
}

export function popupClosed()
{
	counter--;
	update();
}

export function popupOpened()
{
	counter++;
	update();
}

function update()
{
	if (counter > 0)
		getMainElement().classList.add("is-popup-opened");
	else
		getMainElement().classList.remove("is-popup-opened");
}

export default {
	isPopupOpened,
	popupClosed,
	popupOpened
}
