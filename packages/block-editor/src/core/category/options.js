/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { translate } from "../i18n";

export const defaultCategories = [
	{id: "layout", icon: "layers", title: translate("category.layout"), description: ""},
	{id: "text", icon: "format-text", title: translate("category.text"), description: ""},
	{id: "embeds", icon: "code-tags", title: translate("category.embeds"), description: ""},
	{id: "other", icon: "package-variant", title: translate("category.other"), description: ""}
];
