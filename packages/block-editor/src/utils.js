import { Latte } from "@bybas/latte-ui";

export function editorInstance(component)
{
	while ((component = component.$parent) !== undefined)
		if (component.$options.name === "BEEditor")
			return component;

	return undefined;
}

export function getLatte()
{
	return Latte;
}

export function notNullOrUndefined(p)
{
	return p !== undefined && p !== null;
}

export function replaceIndex(arr, index, obj)
{
	arr.splice(index, 1, obj);

	return arr;
}

export function translate(text, ...params)
{
	return Latte.i18n.translate("block-editor", text, params);
}
