import { includes } from "./array";

export function isInputOrTextarea(elm)
{
	return includes(["INPUT", "TEXTAREA"], elm.tagName)
}
