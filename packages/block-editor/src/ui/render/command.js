/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { button } from "./element";

export function commandButtonToggle(h, instance, icon, command, ariaLabel = null)
{
	const can = document.queryCommandEnabled(command);
	const is = document.queryCommandState(command);

	return button(h, {
		color: is ? "primary" : null,
		ariaLabel: ariaLabel,
		disabled: !can,
		iconBefore: icon,
		type: is ? "outline" : "text"
	}, () => instance.focusAndExecute(() => document.execCommand(command)));
}
