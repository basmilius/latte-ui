export function replaceIndex(arr, index, obj)
{
	arr.splice(index, 1, obj);

	return arr;
}

export function setSelectionAfter(el, collapse = false, char = "\u00A0")
{
	if (char === " ")
		char = "\u00A0";

	const range = document.createRange();
	const selection = window.getSelection();
	let dummy = document.createTextNode(char);

	if (el.nextSibling && !(el.nextSibling instanceof HTMLBRElement) && el.nextSibling.wholeText !== "")
	{
		range.setStart(el.nextSibling, 1);
	}
	else
	{
		if (el.nextSibling)
			el.parentNode.insertBefore(dummy, el.nextSibling);
		else
			el.parentNode.appendChild(dummy);

		range.setStartAfter(dummy);
	}

	range.collapse(collapse);
	dummy.remove();
	selection.removeAllRanges();
	selection.addRange(range);
}
