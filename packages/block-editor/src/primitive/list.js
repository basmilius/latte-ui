import { getStyles, onBlur, onKeyDown as textOnKeyDown, removeEmptyElements } from "./text";
import { atEdge } from "../helper/selection";
import { first, last } from "../helper/array";

export function render(h, tag, entry)
{
	return h(tag, {
		domProps: {
			innerHTML: entry.options.text
		},
		style: getStyles(entry.options)
	});
}

export function renderEditor(h, tag, entry)
{
	return h(tag, {
		domProps: {
			contentEditable: "true",
			innerHTML: entry.options.text
		},
		on: {
			blur: evt => onBlur(evt, entry),
			input: () => entry.updateEditor(false),
			keydown: evt => onKeyDown(evt, entry)
		},
		style: getStyles(entry.options)
	});
}

function onKeyDown(evt, entry)
{
	const list = evt.target;
	const items = Array.from(list.getElementsByTagName("li"));

	const firstItem = first(items);
	const lastItem = last(items);

	if (evt.key === "Enter")
	{
		removeEmptyElements(evt);

		if (atEdge(list, true) && lastItem.innerHTML.trim() === "")
		{
			evt.preventDefault();
			lastItem.remove();
			entry.insertBlock("paragraph", entry.index + 1, {text: " "}, {placeAtEnd: false});
		}

		return;
	}

	if (evt.key === "Backspace")
	{
		removeEmptyElements(evt);

		if (atEdge(list) && items.length === 1 && firstItem.innerHTML.trim() === "")
		{
			evt.preventDefault();
			entry.remove();
		}

		return;
	}

	textOnKeyDown(evt, entry);
}
