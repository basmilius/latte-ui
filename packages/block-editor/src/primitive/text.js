import { commandIconToggleButton, divider, functionIconButton, functionIconToggleButton } from "./element";
import { decodeEntities, removeEmptyDivs } from "../helper/html-entities";
import { atEdge, caretPosition, getRectFromRange, placeCaretAt, placeCaretAtEdge } from "../helper/selection";
import { optional } from "./settings";
import { translate } from "../utils";
import { handleComponentError } from "../helper/error";
import { BlockRegistry } from "../registry";

const allowAppend = ["heading", "paragraph"];
const defaultFormattingOptions = {
	boldItalicUnderline: true,
	createLinks: true,
	textAlignment: true,
	textIdentation: true
};

let canUpdate = true;
let lastSelectionRange;

function ensureTextNode(elm)
{
	if (elm instanceof Element)
	{
		if (elm.childNodes[0])
			return elm.childNodes[0];

		const dummy = document.createTextNode("");
		elm.appendChild(dummy);

		return dummy;
	}

	return elm;
}

function executeAndFocus(entry, fn)
{
	entry.focus({select: false}, elm =>
	{
		elm.focus();

		entry.editor.selection.setBaseAndExtent(
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

	try
	{
		range.setStart(ensureTextNode(current.startContainer), current.startOffset);
		range.setEnd(ensureTextNode(current.endContainer), current.endOffset);

		lastSelectionRange = range;
	}
	catch (err)
	{
		handleComponentError(err, "text/saveLastSelection", current);
	}
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

export function onBlur(evt, entry)
{
	if (!canUpdate)
		return;

	entry.editor.inserterList.close();

	if (entry.isRemoved)
		return;

	removeEmptyElements(evt);
	entry.setOptions({text: evt.target.innerHTML});
}

export function onInput(evt, tag, entry)
{
	const text = evt.target.innerText;

	entry.updateEditor(false, true);

	if (tag !== "p")
		return;

	const selection = entry.editor.selection;

	if (!text.startsWith("/") || selection.focusOffset < text.length)
		return entry.editor.inserterList.close();

	const searchTerm = text.substr(1).toLowerCase();
	const foundBlocks = BlockRegistry.blocks
		.filter(entry => entry.keywords.map(keyword => translate(keyword)).find(keyword => keyword.startsWith(searchTerm)))
		.slice(0, 5)
		.sort((a, b) => a.name.localeCompare(b.name));

	entry.editor.inserterList.open(getRectFromRange(selection.getRangeAt(0)), foundBlocks, blockId =>
	{
		entry.remove();
		entry.insertBlock(blockId, entry.index);
	});
}

export function onKeyDown(evt, entry)
{
	const {anchorOffset, focusOffset} = entry.editor.selection;
	const text = evt.target.innerHTML;

	if (entry.editor.inserterList.isOpen)
		return entry.editor.inserterList.handleKeyDown(evt);

	if (evt.key === "Enter" && !evt.shiftKey)
		return kdHandleEnterWhenNotShift(evt, text, entry);

	if (evt.key === "Backspace" && text.trim() === "")
		return kdHandleBackspaceWhenEmpty(evt, entry);

	if (evt.key === "Backspace" && anchorOffset === 0 && focusOffset === 0)
		return kdHandleBackspaceWhenAtStart(evt, text, entry);

	if (evt.key === "ArrowDown" && atEdge(evt.target, true, true))
		return kdHandleArrowDownAtEnd(evt, entry);

	if (evt.key === "ArrowUp" && atEdge(evt.target, false, true))
		return kdHandleArrowUpAtStart(evt, entry);

	if (evt.key === "ArrowRight" && atEdge(evt.target, true))
		return kdHandleArrowDownAtEnd(evt, entry);

	if (evt.key === "ArrowLeft" && atEdge(evt.target, false))
		return kdHandleArrowUpAtStart(evt, entry);
}

export function onPaste(evt, entry)
{
	const textData = evt.clipboardData.getData("Text");

	if (!textData.match(/\r\n|\r|\n/))
		return;

	evt.preventDefault();

	const contents = textData
		.split(/\r\n|\r|\n/g)
		.map(paragraph => paragraph.trim())
		.filter(paragrap => paragrap.length > 0);

	const parent = entry.parent;

	parent.transaction(() =>
	{
		const blocks = contents.map(text => ({id: "paragraph", options: {text}}));
		parent.insertBlocks(blocks, entry.index, {placeAtEnd: true}, true, parent);
		entry.remove();
	});
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

export function renderEditor(tag, h, entry, placeholder = "Start writing...")
{
	canUpdate = true;

	return h(tag, {
		attrs: {
			"data-placeholder": translate(placeholder)
		},
		domProps: {
			contentEditable: "true",
			innerHTML: removeEmptyDivs(entry.options.text)
		},
		style: getStyles(entry.options),
		on: {
			blur: evt => onBlur(evt, entry),
			input: evt => onInput(evt, tag, entry),
			keydown: evt => onKeyDown(evt, entry),
			paste: evt => onPaste(evt, entry)
		}
	});
}

export function renderTextFormatToolbar(h, entry, formattingOptions = {})
{
	if (entry.isRemoving)
		return undefined;

	formattingOptions = Object.assign({}, defaultFormattingOptions, formattingOptions);

	return h("latte-portal", {props: {to: entry.editor.toolbar.beforePortalId}}, [
		h("div", {class: "d-flex align-items-center", on: {mousedown: () => saveLastSelection()}}, [
			h("div", {class: "divider divider-vertical"}),

			...optional(formattingOptions.boldItalicUnderline, () => [
				commandIconToggleButton(h, executeAndFocus, entry, "format-bold", "bold"),
				commandIconToggleButton(h, executeAndFocus, entry, "format-italic", "italic"),
				commandIconToggleButton(h, executeAndFocus, entry, "format-underline", "underline")
			], []),

			divider(h, true),

			...optional(formattingOptions.textAlignment, () => [
				functionIconToggleButton(h, executeAndFocus, entry, "format-align-left", () => entry.setOptions({align: "left"}), () => entry.options.align === "left"),
				functionIconToggleButton(h, executeAndFocus, entry, "format-align-center", () => entry.setOptions({align: "center"}), () => entry.options.align === "center"),
				functionIconToggleButton(h, executeAndFocus, entry, "format-align-right", () => entry.setOptions({align: "right"}), () => entry.options.align === "right"),
				functionIconToggleButton(h, executeAndFocus, entry, "format-align-justify", () => entry.setOptions({align: "justify"}), () => entry.options.align === "justify")
			], []),

			divider(h, true),

			...optional(formattingOptions.createLinks, () => [
				functionIconButton(h, executeAndFocus, entry, "link", () =>
				{
				})
			], []),

			divider(h, true),

			...optional(formattingOptions.textIdentation, () => [
				functionIconButton(h, executeAndFocus, entry, "format-indent-decrease", () => entry.setOptions({indent: entry.options.indent - 1}), entry.options.indent === 0),
				functionIconButton(h, executeAndFocus, entry, "format-indent-increase", () => entry.setOptions({indent: entry.options.indent + 1}), entry.options.indent >= 10)
			], [])
		])
	])
}

export function removeEmptyElements(evt)
{
	Array.from(evt.target.querySelectorAll("br,b:empty,i:empty,p:empty"))
		.forEach(br => br.remove());
}

function kdHandleArrowDownAtEnd(evt, entry)
{
	if (!entry.nextSibbling)
		return;

	evt.preventDefault();

	entry.nextSibbling.focus({select: false}, elm => placeCaretAtEdge(elm, false));
}

function kdHandleArrowUpAtStart(evt, entry)
{
	if (!entry.previousSibbling)
		return;

	evt.preventDefault();

	entry.previousSibbling.focus({select: false}, elm => placeCaretAtEdge(elm, true));
}

function kdHandleBackspaceWhenAtStart(evt, text, entry)
{
	evt.preventDefault();

	const sibbling = entry.previousSibbling;

	if (!sibbling || allowAppend.indexOf(sibbling.block.id) === -1)
		return;

	placeCaretAtEdge(sibbling.element, true);

	const sibblingText = sibbling.options.text.trim();
	const {anchorOffset} = caretPosition(sibbling.element);
	const offsetAdjustment = (text !== "" && sibblingText !== "" && !sibblingText.endsWith("&nbsp;")) ? 1 : 0;
	const combinedText = decodeEntities(sibblingText + (offsetAdjustment === 1 ? " " : "") + text).trim();

	const offset = anchorOffset + offsetAdjustment;

	sibbling.setOptions({text: combinedText});
	sibbling.nextTick(() =>
	{
		entry.remove(false);
		sibbling.nextTick(() => sibbling.focus({}, () => placeCaretAt(sibbling.element, offset)));
	});
}

function kdHandleBackspaceWhenEmpty(evt, entry)
{
	evt.preventDefault();

	const sibbling = entry.previousSibbling;

	if (!sibbling)
		return;

	sibbling.focus({select: true, placeAtEnd: true});
	entry.remove(false);
}

function kdHandleEnterWhenNotShift(evt, text, entry)
{
	entry.editor.inserterList.close();

	if (atEdge(evt.target))
	{
		evt.preventDefault();
		entry.insertBlock("paragraph", entry.index, {}, null);
		entry.focus({placeAtEnd: false});
	}
	else if (atEdge(evt.target, true))
	{
		evt.preventDefault();
		entry.insertBlock("paragraph", entry.index + 1, {text: ""}, {});
	}
	else
	{
		entry.raf(() =>
		{
			const childElements = Array.from(evt.target.getElementsByTagName("div"));
			const newElement = childElements[childElements.length - 1];

			if (!newElement)
				return;

			const html = decodeEntities(newElement.innerHTML);
			newElement.remove();

			entry.setOptions({text: decodeEntities(evt.target.innerHTML)});
			entry.insertBlock("paragraph", entry.index + 1, {...entry.options, text: html}, {placeAtEnd: false});
		});
	}
}
