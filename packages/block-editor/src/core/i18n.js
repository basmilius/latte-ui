/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { Latte } from "../util/latte";

import Vue from "vue";

export function initializeInternationalization()
{
	Vue.filter("beTranslate", (text, ...params) => text ? translate(text, params) : text);
}

export function translate(text, ...params)
{
	return Latte.i18n.translate("block-editor", text, params);
}
