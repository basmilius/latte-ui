import { commandIconToggleButton, functionIconButton, functionIconToggleButton, divider } from "./element";
import { decodeEntities } from "../helper/html-entities";
import { atEdge, caretPosition, getRectFromRange, placeCaretAt, placeCaretAtEdge } from "../helper/selection";
import { optional } from "./settings";

const allowAppend = ["heading", "paragraph"];
const defaultFormattingOptions = {
	boldItalicUnderline: true,
	createLinks: true,
	textAlignment: true,
	textIdentation: true
};

let canUpdate = true;
let lastSelectionRange;

function executeAndFocus(api, fn)
{
	api.focus({select: false}, elm =>
	{
		elm.focus();

		api.editor.selection.setBaseAndExtent(
			lastSelectionRange.startContainer,
			lastSelectionRange.startOffset,
			lastSelectionRange.endContainer,
			lastSelectionRange.endOffset
		);

		fn();
		saveLastSelection();
	});
}

function saveLastSelection()
{
	canUpdate = false;

	const current = window.getSelection().getRangeAt(0);
	const range = document.createRange();

	range.setStart(current.startContainer instanceof Element ? current.startContainer.childNodes[0] : current.startContainer, current.startOffset);
	range.setEnd(current.endContainer instanceof Element ? current.endContainer.childNodes[0] : current.endContainer, current.endOffset);

	lastSelectionRange = range;
}

export function getStyles(options)
{
	return {
		marginLeft: options.indent ? `${options.indent}rem` : undefined,
		color: options.color ? options.color : undefined,
		fontSize: options.fontSize ? `${options.fontSize}rem` : undefined,
		textAlign: options.align || undefined
	};
}

export function onBlur(evt, api)
{
	if (!canUpdate)
		return;

	api.editor.inserterList.close();

	if (api.isRemoved)
		return;

	removeEmptyElements(evt);
	api.setOptions({text: evt.target.innerHTML});
}

export function onInput(evt, tag, api)
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

export function onKeyDown(evt, api)
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

export function onPaste(evt, api)
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

export function render(tag, h, {options})
{
	return h(tag, {
		domProps: {
			innerHTML: options.text
		},
		style: getStyles(options)
	});
}

export function renderEditor(tag, h, api)
{
	canUpdate = true;

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
			blur: evt => onBlur(evt, api),
			input: evt => onInput(evt, tag, api),
			keydown: evt => onKeyDown(evt, api),
			paste: evt => onPaste(evt, api)
		}
	});
}

export function renderTextFormatToolbar(h, api, formattingOptions = {})
{
	formattingOptions = Object.assign({}, defaultFormattingOptions, formattingOptions);

	return h("latte-portal", {props: {to: api.editor.toolbar.beforePortalId}}, [
		h("div", {class: "d-flex align-items-center", on: {mousedown: () => saveLastSelection()}}, [
			h("div", {class: "divider divider-vertical"}),

			...optional(formattingOptions.boldItalicUnderline, () => [
				commandIconToggleButton(h, executeAndFocus, api, "format-bold", "bold"),
				commandIconToggleButton(h, executeAndFocus, api, "format-italic", "italic"),
				commandIconToggleButton(h, executeAndFocus, api, "format-underline", "underline")
			], []),

			divider(h, true),

			...optional(formattingOptions.textAlignment, () => [
				functionIconToggleButton(h, executeAndFocus, api, "format-align-left", () => api.setOptions({align: "left"}), () => api.options.align === "left"),
				functionIconToggleButton(h, executeAndFocus, api, "format-align-center", () => api.setOptions({align: "center"}), () => api.options.align === "center"),
				functionIconToggleButton(h, executeAndFocus, api, "format-align-right", () => api.setOptions({align: "right"}), () => api.options.align === "right"),
				functionIconToggleButton(h, executeAndFocus, api, "format-align-justify", () => api.setOptions({align: "justify"}), () => api.options.align === "justify")
			], []),

			divider(h, true),

			...optional(formattingOptions.createLinks, () => [
				functionIconButton(h, executeAndFocus, api, "link", () =>
				{
				})
			], []),

			divider(h, true),

			...optional(formattingOptions.textIdentation, () => [
				functionIconButton(h, executeAndFocus, api, "format-indent-decrease", () => api.setOptions({indent: api.options.indent - 1}), api.options.indent === 0),
				functionIconButton(h, executeAndFocus, api, "format-indent-increase", () => api.setOptions({indent: api.options.indent + 1}), api.options.indent >= 10)
			], [])
		])
	])
}

export function removeEmptyElements(evt)
{
	Array.from(evt.target.querySelectorAll("br,b:empty,i:empty,p:empty"))
		.forEach(br => br.remove());
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
