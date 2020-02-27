/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { Latte } from "../util/latte";

export function generateEditorI18n()
{
	return translate;
}

export function translate(key, ...params)
{
	return Latte.i18n.translate("block_editor", key, params);
}
