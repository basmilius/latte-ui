/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { raf } from "../../js/util/dom";
import { getMainElement } from "../../js/options";

export const MoveToMainDirective = {

	inserted(el)
	{
		const mainElement = getMainElement();
		mainElement.appendChild(el);

		el.addEventListener("animationstart", () => el.isAnimating = true);
		el.addEventListener("animationend", () => el.isAnimating = false);

		el.addEventListener("transitionstart", () => el.isAnimating = true);
		el.addEventListener("transitionend", () => el.isAnimating = false);
	},

	unbind(el)
	{
		raf(() =>
		{
			if (el.isAnimating)
			{
				el.addEventListener("animationend", () => el.remove());
				el.addEventListener("transitionend", () => el.remove());

				return;
			}

			el.remove();
		}, 16);
	}

};
