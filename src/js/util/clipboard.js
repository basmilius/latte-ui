"use strict";

export function copy(text)
{
	navigator.clipboard.writeText(text)
		.then(() => console.debug("[Clipboard] Text copied to clipboard!"))
		.catch(err => console.error(err));
}

export function paste()
{
	return navigator.clipboard.readText()
		.catch(err => console.error(err));
}

export default {

	copy,

	paste

}
