"use strict";

import { dispatch } from "./actions";

const isInFrame = window.top !== window;
let translations = null;

export function forObject(obj, domain = "root")
{
	for (let key in obj)
		if (obj.hasOwnProperty(key))
			obj[key] = translate(domain, obj[key]);

	return obj;
}

export function replace(string, params = [])
{
	for (let i = 0; i < params.length; i++)
		string = string.replace(new RegExp(`@${i}`, 'g'), params[i]);

	return string;
}

export function translate(domain, string, params = [])
{
	if (translations === null || typeof translations[domain] === "undefined" || typeof translations[domain][string] === "undefined")
		return replace(string, params);

	return replace(translations[domain][string], params);
}

function onTranslationsLoaded(response)
{
	if (typeof response !== "undefined")
		translations = response.data;

	dispatch("latte:i18n:translations-loaded", translations);
}

if (isInFrame)
	onTranslationsLoaded(undefined);
else
	onTranslationsLoaded({data: window["LatteI18n"] || {}});

Vue.filter("latteI18n", (value, domain = "root", ...params) => Latte.i18n.translate(domain, value, params));

export default {

	forObject,

	replace,

	translate

}
