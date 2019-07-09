import { atEdge, caretPosition, getRectFromRange, placeCaretAt, placeCaretAtEdge } from "../../helper/selection";
import { includes } from "../../helper/array";
import { decodeEntities } from "../../helper/html-entities";

const allowAppend = ["heading", "paragraph"];

function getStyles(options)
{
	return {
		color: options.color ? options.color : undefined,
		fontSize: options.fontSize ? `${options.fontSize}rem` : undefined,
		textAlign: options.align || undefined
	};
}

export function render(tag, h, {options})
{
	return h(tag, {
		domProps: {
			innerHTML: options.text
		},
		style: getStyles(options)
	});
}

export function renderEditor(tag, h, api, canUpdate = undefined)
{
	let {options} = api;

	return h(tag, {
		attrs: {
			"data-placeholder": "Start writing..."
		},
		domProps: {
			contentEditable: "true",
			innerHTML: options.text
		},
		style: getStyles(options),
		on: {
			blur: evt => canUpdate === undefined || canUpdate() === true ? onBlur(evt, api) : undefined,
			input: evt => onInput(evt, tag, api),
			keydown: evt => onKeyDown(evt, api),
			paste: evt => onPaste(evt, api)
		}
	});
}

function onBlur(evt, {editor, isRemoved, setOptions})
{
	editor.inserterList.close();

	if (isRemoved)
		return;

	removeEmptyElements(evt);
	setOptions({text: evt.target.innerHTML});
}

function onInput(evt, tag, {editor, index, insertBlock, remove})
{
	const text = evt.target.innerText;

	removeEmptyElements(evt);

	if (tag !== "p")
		return;

	const selection = editor.selection;

	if (!text.startsWith("/") || selection.focusOffset < text.length)
		return editor.inserterList.close();

	const searchTerm = text.substr(1).toLowerCase();
	const foundBlocks = editor.blocks
		.filter(block => block.keywords.find(keyword => keyword.startsWith(searchTerm)))
		.slice(0, 5)
		.sort((a, b) => a.name.localeCompare(b.name));

	editor.inserterList.open(getRectFromRange(selection.getRangeAt(0)), foundBlocks, blockId =>
	{
		remove();
		insertBlock(blockId, index);
	});
}

function onKeyDown(evt, api)
{
	const {editor} = api;
	const {anchorOffset, focusOffset} = editor.selection;
	const text = evt.target.innerHTML;

	if (editor.inserterList.isOpen)
		return editor.inserterList.handleKeyDown(evt);

	if (evt.key === "Enter" && !evt.shiftKey)
		return kdHandleEnterWhenNotShift(evt, text, api);

	if (evt.key === "ArrowDown" && atEdge(evt.target, true, true))
		return kdHandleArrowDownAtEnd(evt, api);

	if (evt.key === "ArrowUp" && atEdge(evt.target, false, true))
		return kdHandleArrowUpAtStart(evt, api);

	if (evt.key === "ArrowRight" && atEdge(evt.target, true))
		return kdHandleArrowDownAtEnd(evt, api);

	if (evt.key === "ArrowLeft" && atEdge(evt.target, false))
		return kdHandleArrowUpAtStart(evt, api);

	if (evt.key === "Backspace" && anchorOffset === 0 && focusOffset === 0)
		return kdHandleBackspaceWhenAtStart(evt, text, api);

	if (evt.key === "Backspace" && text.trim() === "")
		return kdHandleBackspaceWhenEmpty(evt, api);
}

function onPaste(evt, {index, insertBlock, remove})
{
	evt.preventDefault();

	const contents = evt.clipboardData
		.getData("Text")
		.split(/\r\n|\r|\n/g)
		.map(paragraph => paragraph.trim())
		.filter(paragrap => paragrap.length > 0);

	remove();
	contents.forEach((text, i) => insertBlock("paragraph", index + i, {text}, {placeAtEnd: true}));
}

function kdHandleArrowDownAtEnd(evt, {getRelative})
{
	evt.preventDefault();

	const sibbling = getRelative(1);
	if (!sibbling)
		return;

	sibbling.focus({select: false}, elm => placeCaretAtEdge(elm, false));
}

function kdHandleArrowUpAtStart(evt, {getRelative})
{
	evt.preventDefault();

	const sibbling = getRelative(-1);
	if (!sibbling)
		return;

	sibbling.focus({select: false}, elm => placeCaretAtEdge(elm, true));
}

function kdHandleBackspaceWhenAtStart(evt, text, {getRelative, nextTick, remove})
{
	evt.preventDefault();

	const sibbling = getRelative(-1);
	if (!sibbling || allowAppend.indexOf(sibbling.blockId) === -1)
		return;

	sibbling.focus({select: false}, elm =>
	{
		placeCaretAtEdge(elm, true);

		const {anchorOffset} = caretPosition(elm);
		const myText = text.trim();
		const sibblingText = sibbling.options.text.trim();
		const offsetAdjustment = myText !== "" && sibblingText !== "" ? 1 : 0;

		const offset = anchorOffset + offsetAdjustment;
		sibbling.setOptions({text: (sibblingText + (offsetAdjustment === 1 ? " " : "") + myText)});
		remove();

		nextTick(() => placeCaretAt(elm, offset));
	});
}

function kdHandleBackspaceWhenEmpty(evt, {remove, getRelative})
{
	evt.preventDefault();
	remove();

	const sibbling = getRelative(-1);
	if (sibbling)
		sibbling.focus({select: true, placeAtEnd: true});
}

function kdHandleEnterWhenNotShift(evt, text, {editor, raf, index, insertBlock, options, setOptions})
{
	editor.inserterList.close();

	if (atEdge(evt.target))
	{
		evt.preventDefault();
		setOptions({text: ""});
		insertBlock("paragraph", index + 1, {text}, {placeAtEnd: false});
	}
	else
	{
		raf(() =>
		{
			const childElements = Array.from(evt.target.getElementsByTagName("p"));
			const newElement = childElements[childElements.length - 1];

			if (!newElement)
				return;

			const html = decodeEntities(newElement.innerHTML);
			newElement.remove();

			insertBlock("paragraph", index + 1, {...options, text: html}, {placeAtEnd: false});
			setOptions({text: decodeEntities(evt.target.innerHTML)});
		});
	}
}

function removeEmptyElements(evt)
{
	Array.from(evt.target.querySelectorAll("br,b:empty,i:empty,p:empty"))
		.forEach(br => br.remove());
}
