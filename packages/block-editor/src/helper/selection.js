import { isInputOrTextarea } from "./element";

const {
	DOCUMENT_POSITION_FOLLOWING,
	DOCUMENT_POSITION_PRECEDING
} = window.Node;

export function atEdge(elm, atEnd = false, onlyLines = false)
{
	if (isInputOrTextarea(elm))
	{
		if (elm.selectionStart !== elm.selectionEnd)
			return false;

		if (atEnd)
			return elm.value.length === elm.selectionStart;

		return elm.selectionStart === 0;
	}

	const selection = window.getSelection();

	if (selection.rangeCount === 0)
		return false;

	const range = selection.getRangeAt(0).cloneRange();
	const isCollapsed = selection.isCollapsed;
	const isForward = isForwardSelection(selection);

	if (!isCollapsed)
		range.collapse(!isForward);

	const rangeRect = getRectFromRange(range);

	const computedStyle = window.getComputedStyle(elm);
	const lineHeight = parseInt(computedStyle.lineHeight, 10) || 0;

	if (!isCollapsed && rangeRect.height > lineHeight && isForward !== atEnd)
		return false;

	const padding = parseInt(computedStyle[`padding${atEnd ? "Bottom" : "Top"}`], 10) || 0;
	const buffer = 3 * lineHeight / 4;
	const elmRect = elm.getBoundingClientRect();
	const verticalEdge = atEnd ? elmRect.bottom - padding < rangeRect.bottom + buffer : elmRect.top + padding > rangeRect.top - buffer;

	if (!verticalEdge)
		return false;

	if (onlyLines)
		return true;

	const {direction} = computedStyle;
	const isReverseDirection = direction === "rtl" ? atEnd : !atEnd;

	const x = isReverseDirection ? elmRect.left + 1 : elmRect.right - 1;
	const y = atEnd ? elmRect.bottom - buffer : elmRect.top + buffer;
	const testRange = hiddenCaretRangeFromPoint(document, x, y, elm);

	if (!testRange)
		return false;

	const side = isReverseDirection ? "left" : "right";
	const testRect = getRectFromRange(testRange);

	return Math.round(testRect[side]) === Math.round(rangeRect[side]);
}

export function caretRangeFromPoint(doc, x, y)
{
	if (doc.caretRangeFromPoint)
		return doc.caretRangeFromPoint(x, y);

	if (!doc.caretPositionFromPoint)
		return null;

	const point = doc.caretPositionFromPoint(x, y);

	if (!point)
		return null;

	const range = doc.createRange();
	range.setStart(point.offsetNode, point.offset);
	range.collapse(true);

	return range;
}

export function getRectFromRange(range)
{
	if (!range.collapsed)
		return range.getBoundingClientRect();

	const {startContainer} = range;

	if (startContainer.nodeName === "BR")
	{
		const {parentNode} = startContainer;
		const index = Array.from(parentNode.childNodes).indexOf(startContainer);

		range = document.createRange();
		range.setStart(parentNode, index);
		range.setEnd(parentNode, index);
	}

	let rect = range.getClientRects()[0];

	if (!rect)
	{
		const padNode = document.createTextNode("\u200b");
		range = range.cloneRange();
		range.insertNode(padNode);
		rect = range.getClientRects()[0];
		padNode.remove();
	}

	return rect;
}

export function hiddenCaretRangeFromPoint(doc, x, y, elm)
{
	elm.style.zIndex = "10000";

	const range = caretRangeFromPoint(doc, x, y);

	elm.style.zIndex = null;

	return range;
}

export function isForwardSelection(selection)
{
	const {anchorNode, anchorOffset, focusNode, focusOffset} = selection;
	const position = anchorNode.compareDocumentPosition(focusNode);

	if (position & DOCUMENT_POSITION_PRECEDING)
		return false;

	if (position & DOCUMENT_POSITION_FOLLOWING)
		return true;

	if (position === 0)
		return anchorOffset <= focusOffset;

	return true;
}

export function placeCaretAtEdge(elm, atEnd = false)
{
	if (isInputOrTextarea(elm))
	{
		elm.focus();

		if (atEnd)
			elm.selectionStart = elm.selectionEnd = elm.value.length;
		else
			elm.selectionStart = elm.selectionEnd = 0;

		return;
	}

	if (!elm.isContentEditable)
		return;

	const target = elm[atEnd ? "lastChild" : "firstChild"];

	if (!target)
		return;

	const selection = window.getSelection();
	const range = document.createRange();

	range.selectNodeContents(target);
	range.collapse(!atEnd);

	selection.removeAllRanges();
	selection.addRange(range);
}
