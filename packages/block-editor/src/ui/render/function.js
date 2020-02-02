/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { button } from "./element";

export function functionButtonToggle(h, instance, icon, can, is, fn, ariaLabel)
{
	return button(h, {
		ariaLabel: ariaLabel,
		color: is ? "primary" : null,
		disabled: !can,
		iconBefore: icon,
		type: is ? "outline" : "text"
	}, () => instance.focusAndExecute(fn));
}
