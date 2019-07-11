import { atEdge, caretPosition, getRectFromRange, placeCaretAt, placeCaretAtEdge } from "../../helper/selection";
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
	return h(tag, {
		attrs: {
			"data-placeholder": "Start writing..."
		},
		domProps: {
			contentEditable: "true",
			innerHTML: api.options.text
		},
		style: getStyles(api.options),
		on: {
			blur: evt => canUpdate === undefined || canUpdate() === true ? onBlur(evt, api) : undefined,
			input: evt => onInput(evt, tag, api),
			keydown: evt => onKeyDown(evt, api),
			paste: evt => onPaste(evt, api)
		}
	});
}

function onBlur(evt, api)
{
	api.editor.inserterList.close();

	if (api.isRemoved)
		return;

	removeEmptyElements(evt);
	api.setOptions({text: evt.target.innerHTML});
}

function onInput(evt, tag, api)
{
	const text = evt.target.innerText;

	api.group.updateSelection();
	removeEmptyElements(evt);

	if (tag !== "p")
		return;

	const selection = api.editor.selection;

	if (!text.startsWith("/") || selection.focusOffset < text.length)
		return api.editor.inserterList.close();

	const searchTerm = text.substr(1).toLowerCase();
	const foundBlocks = api.editor.blocks
		.filter(api => api.keywords.find(keyword => keyword.startsWith(searchTerm)))
		.slice(0, 5)
		.sort((a, b) => a.name.localeCompare(b.name));

	api.editor.inserterList.open(getRectFromRange(selection.getRangeAt(0)), foundBlocks, blockId =>
	{
		api.remove();
		api.insertBlock(blockId, api.index);
	});
}

function onKeyDown(evt, api)
{
	const {anchorOffset, focusOffset} = api.editor.selection;
	const text = evt.target.innerHTML;

	if (api.editor.inserterList.isOpen)
		return api.editor.inserterList.handleKeyDown(evt);

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

	if (evt.key === "Backspace" && text.trim() === "")
		return kdHandleBackspaceWhenEmpty(evt, api);

	if (evt.key === "Backspace" && anchorOffset === 0 && focusOffset === 0)
		return kdHandleBackspaceWhenAtStart(evt, text, api);
}

function onPaste(evt, api)
{
	const textData = evt.clipboardData.getData("Text");

	if (!textData.match(/\r\n|\r|\n/))
		return;

	evt.preventDefault();

	const contents = textData
		.split(/\r\n|\r|\n/g)
		.map(paragraph => paragraph.trim())
		.filter(paragrap => paragrap.length > 0);

	api.remove();
	contents.forEach((text, i) => api.insertBlock("paragraph", api.index + i, {text}, {placeAtEnd: true}));
}

function kdHandleArrowDownAtEnd(evt, api)
{
	if (!api.nextSibbling)
		return;

	evt.preventDefault();

	api.nextSibbling.focus({select: false}, elm => placeCaretAtEdge(elm, false));
}

function kdHandleArrowUpAtStart(evt, api)
{
	if (!api.previousSibbling)
		return;

	evt.preventDefault();

	api.previousSibbling.focus({select: false}, elm => placeCaretAtEdge(elm, true));
}

function kdHandleBackspaceWhenAtStart(evt, text, api)
{
	evt.preventDefault();

	const sibbling = api.previousSibbling;

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
		api.remove();
		api.nextTick(() => placeCaretAt(elm, offset));
	});
}

function kdHandleBackspaceWhenEmpty(evt, api)
{
	evt.preventDefault();
	api.remove();

	if (api.previousSibbling)
		api.previousSibbling.focus({select: true, placeAtEnd: true});
}

function kdHandleEnterWhenNotShift(evt, text, api)
{
	api.editor.inserterList.close();

	if (atEdge(evt.target))
	{
		evt.preventDefault();
		api.setOptions({text: ""});
		api.insertBlock("paragraph", api.index + 1, {text}, {placeAtEnd: false});
	}
	else if (atEdge(evt.target, true))
	{
		evt.preventDefault();
		api.insertBlock("paragraph", api.index + 1, {text: ""}, {placeAtEnd: false});
	}
	else
	{
		api.raf(() =>
		{
			const childElements = Array.from(evt.target.getElementsByTagName("div"));
			const newElement = childElements[childElements.length - 1];

			if (!newElement)
				return;

			const html = decodeEntities(newElement.innerHTML);
			newElement.remove();

			api.insertBlock("paragraph", api.index + 1, {...api.options, text: html}, {placeAtEnd: false});
			api.setOptions({text: decodeEntities(evt.target.innerHTML)});
		});
	}
}

function removeEmptyElements(evt)
{
	Array.from(evt.target.querySelectorAll("br,b:empty,i:empty,p:empty"))
		.forEach(br => br.remove());
}
