/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { translate } from "../../core/i18n";
import { atEdge, caretPosition, getRectFromRange, placeCaretAt, placeCaretAtEdge } from "../../util/selection";
import { decodeEntities, removeEmptyDivs } from "../../util/html-entities";
import { BlockRegistry } from "../../core/block/registry";

const allowAppend = ["heading", "paragraph"];

let canUpdate = true;

export function getStyles(options)
{
	return {
		marginLeft: options.indent ? `${options.indent}rem` : undefined,
		color: options.color ? options.color : undefined,
		fontSize: options.fontSize ? `${options.fontSize}rem` : undefined,
		textAlign: options.align || undefined
	};
}

export function onBlur(evt, instance)
{
	if (!canUpdate)
		return;

	instance.editor.inserterQuick.close();

	if (instance.isRemoving)
		return;

	removeEmptyElements(evt);
	instance.setOptions({text: evt.target.innerHTML});
}

export function onInput(evt, tag, instance)
{
	const text = evt.target.innerText;

	instance.updateEditor(false, false);

	if (tag !== "p")
		return;

	const selection = instance.editor.selection;

	if (!text.startsWith("/") || selection.focusOffset < text.length)
		return instance.editor.inserterQuick.close();

	const searchTerm = text.substr(1).toLowerCase();
	const foundBlocks = BlockRegistry.blocks
		.filter(b => b.name.toLowerCase().startsWith(searchTerm) || b.keywords.find(k => k.toLowerCase().startsWith(searchTerm)))
		.slice(0, 5)
		.sort((a, b) => a.name.localeCompare(b.name));

	instance.editor.inserterQuick.open(getRectFromRange(selection.getRangeAt(0)), foundBlocks, block =>
	{
		instance.remove();
		instance.insertBlock(block.id, instance.index);
	});
}

export function onKeyDown(evt, instance)
{
	const {anchorOffset, focusOffset} = instance.editor.selection;
	const text = evt.target.innerHTML;

	instance.context.$forceUpdate();

	if (instance.editor.inserterQuick.isOpen)
		return instance.editor.inserterQuick.handleKeyDown(evt);

	if (evt.key === "Enter" && !evt.shiftKey)
		return kdHandleEnterWhenNotShift(evt, text, instance);

	if (evt.key === "Backspace" && text.trim() === "")
		return kdHandleBackspaceWhenEmpty(evt, instance);

	if (evt.key === "Backspace" && anchorOffset === 0 && focusOffset === 0)
		return kdHandleBackspaceWhenAtStart(evt, text, instance);

	if (evt.key === "ArrowDown" && atEdge(evt.target, true, true))
		return kdHandleArrowDownAtEnd(evt, instance);

	if (evt.key === "ArrowUp" && atEdge(evt.target, false, true))
		return kdHandleArrowUpAtStart(evt, instance);

	if (evt.key === "ArrowRight" && atEdge(evt.target, true))
		return kdHandleArrowDownAtEnd(evt, instance);

	if (evt.key === "ArrowLeft" && atEdge(evt.target, false))
		return kdHandleArrowUpAtStart(evt, instance);
}

export function onPaste(evt, instance)
{
	const textData = evt.clipboardData.getData("Text");

	if (!textData.match(/\r\n|\r|\n/))
		return;

	evt.preventDefault();

	const contents = textData
		.split(/\r\n|\r|\n/g)
		.map(paragraph => paragraph.trim())
		.filter(paragrap => paragrap.length > 0);

	const parent = instance.parent;

	parent.transaction(() =>
	{
		const blocks = contents.map(text => ({id: "paragraph", options: {text}}));
		parent.insertBlocks(blocks, instance.index, {placeAtEnd: true}, true, parent);
		instance.remove();
	});
}

export function render(tag, h, {options})
{
	return h(tag, {
		class: options.class,
		domProps: {
			innerHTML: options.text
		},
		style: getStyles(options)
	});
}

export function renderEditor(tag, h, instance, placeholder = "Start writing...")
{
	canUpdate = true;

	return h(tag, {
		attrs: {
			"data-placeholder": translate(placeholder)
		},
		class: instance.options.class,
		domProps: {
			contentEditable: "true",
			innerHTML: removeEmptyDivs(instance.options.text)
		},
		style: getStyles(instance.options),
		on: {
			blur: evt => onBlur(evt, instance),
			click: () => instance.context.$forceUpdate(),
			input: evt => onInput(evt, tag, instance),
			keydown: evt => onKeyDown(evt, instance),
			paste: evt => onPaste(evt, instance)
		}
	});
}

export function removeEmptyElements(evt)
{
	Array.from(evt.target.querySelectorAll("br,b:empty,i:empty,p:empty"))
		.forEach(br => br.remove());
}

function kdHandleArrowDownAtEnd(evt, instance)
{
	if (!instance.nextSibbling)
		return;

	evt.preventDefault();

	instance.nextSibbling.focus({select: false}, elm => placeCaretAtEdge(elm, false));
}

function kdHandleArrowUpAtStart(evt, instance)
{
	if (!instance.previousSibbling)
		return;

	evt.preventDefault();

	instance.previousSibbling.focus({select: false}, elm => placeCaretAtEdge(elm, true));
}

function kdHandleBackspaceWhenAtStart(evt, text, instance)
{
	evt.preventDefault();

	const sibbling = instance.previousSibbling;

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
		instance.remove(false);
		sibbling.nextTick(() => sibbling.focus({}, () => placeCaretAt(sibbling.element, offset)));
	});
}

function kdHandleBackspaceWhenEmpty(evt, instance)
{
	evt.preventDefault();

	const sibbling = instance.previousSibbling;

	if (!sibbling)
		return;

	sibbling.focus({select: true, placeAtEnd: true});
	instance.remove(false);
}

function kdHandleEnterWhenNotShift(evt, text, instance)
{
	instance.editor.inserterQuick.close();

	if (atEdge(evt.target))
	{
		evt.preventDefault();
		instance.insertBlock("paragraph", instance.index, {}, null);
		instance.focus({placeAtEnd: false});
	}
	else if (atEdge(evt.target, true))
	{
		evt.preventDefault();
		instance.insertBlock("paragraph", instance.index + 1, {text: ""}, {});
	}
	else
	{
		instance.raf(() =>
		{
			const childElements = Array.from(evt.target.getElementsByTagName("div"));
			const newElement = childElements[childElements.length - 1];

			if (!newElement)
				return;

			const html = decodeEntities(newElement.innerHTML);
			newElement.remove();

			instance.setOptions({text: decodeEntities(evt.target.innerHTML)});
			instance.insertBlock("paragraph", instance.index + 1, {...instance.options, text: html}, {placeAtEnd: false});
		});
	}
}
