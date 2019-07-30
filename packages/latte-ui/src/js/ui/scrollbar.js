/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { createElement, raf } from "../util/dom";
import { docRoot } from "../core";
import { isTouchDevice } from "../util/touch";

let scrollingTimeout = 0;

function onScroll()
{
	clearTimeout(scrollingTimeout);
	isSomethingScrolling = true;
	scrollingTimeout = setTimeout(() => isSomethingScrolling = false, 100);
}

export let isSomethingScrolling = false;

export function initializeScrollbar()
{
	window.addEventListener("scroll", onScroll, {capture: true, passive: true});

	if (isTouchDevice())
		return;

	createElement("div", div =>
	{
		const props = {
			height: "50px",
			width: "50px",
			overflow: "auto"
		};

		div.innerHTML = "".padStart(100, "<br/>");

		for (let prop in props)
			div.style.setProperty(prop, props[prop]);

		document.body.appendChild(div);

		if (div.clientWidth !== div.getBoundingClientRect().width)
			docRoot.classList.add("scrollbars");

		raf(() => div.remove());
		raf(() => docRoot.style.setProperty("--scrollbar-width", `${window.innerWidth - docRoot.clientWidth}px`), 100);
	});
}
