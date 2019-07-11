import { getStyles, onBlur, onKeyDown as textOnKeyDown, removeEmptyElements } from "./text";
import { atEdge } from "../helper/selection";
import { first, last } from "../helper/array";

export function render(h, tag, api)
{
	return h(tag, {
		domProps: {
			innerHTML: api.options.text
		},
		style: getStyles(api.options)
	});
}

export function renderEditor(h, tag, api)
{
	return h(tag, {
		domProps: {
			contentEditable: "true",
			innerHTML: api.options.text
		},
		on: {
			blur: evt => onBlur(evt, api),
			input: () => api.group.updateSelection(),
			keydown: evt => onKeyDown(evt, api)
		},
		style: getStyles((api.options))
	});
}

function onKeyDown(evt, api)
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
			api.insertBlock("paragraph", api.index + 1, {text: " "}, {placeAtEnd: false});
		}

		return;
	}

	if (evt.key === "Backspace")
	{
		removeEmptyElements(evt);

		if (atEdge(list) && items.length === 1 && firstItem.innerHTML.trim() === "")
		{
			evt.preventDefault();
			api.remove();
		}

		return;
	}

	textOnKeyDown(evt, api);
}
