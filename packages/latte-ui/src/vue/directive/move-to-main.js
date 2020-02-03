/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { getMainElement } from "../../js/core";

export const MoveToMainDirective = {

	inserted(el)
	{
		const mainElement = getMainElement();

		mainElement.appendChild(el);
	},

	unbind(el)
	{
		// if (el.parentNode)
		// 	el.parentNode.removeChild(el);
	}

};
