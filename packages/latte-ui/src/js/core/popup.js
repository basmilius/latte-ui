/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

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
	if (counter === 0)
		document.documentElement.style.setProperty("--scrollbar-width", `${window.innerWidth - document.body.clientWidth}px`);

	counter++;
	update();
}

function update()
{
	if (counter > 0)
		document.body.classList.add("is-popup-opened");
	else
		document.body.classList.remove("is-popup-opened");
}

export default {
	isPopupOpened,
	popupClosed,
	popupOpened
}
