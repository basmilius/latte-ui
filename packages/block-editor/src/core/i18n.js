import { Latte } from "../util/latte";

import Vue from "vue";

export function initializeInternationalization()
{
	Vue.filter("beTranslate", (text, ...params) => translate(text, params));
}

export function translate(text, ...params)
{
	return Latte.i18n.translate("block-editor", text, params);
}
