/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { translate } from "../../core/i18n";

export function tab(h, label, options = {}, children = [])
{
	if (!options.props)
		options.props = {};

	options.props.label = translate(label);

	return h("latte-tab", options, children);
}

export function tabBar(h, options = {})
{
	return h("latte-tab-bar", options);
}

export function tabContainer(h, options = {}, children = [])
{
	if (typeof children === "function")
	{
		options.scopedSlots = {
			default: children
		};

		children = undefined;
	}

	return h("latte-tab-container", options, children);
}
