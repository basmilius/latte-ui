import { setSelection } from "../../utils";
import { atEdge, getRectFromRange, isForwardSelection, placeCaretAtEdge } from "../../helper/selection";
import { includes } from "../../helper/array";
import { formatText } from "../../helper/format";

const allowAppend = ["heading", "paragraph"];

export function render(tag, h, {options})
{
	return h(tag, {domProps: {innerHTML: options.format ? [formatText(h, options.text, options.format)] : options.text}});
}

export function renderEditor(tag, h, api, canUpdate = undefined)
{
	let {options, setOptions} = api;

	if (!options.formatted)
		setOptions({formatted: formatText(options.text, options.format)});

	return h("div", {class: "be-text-wrapper"}, [
		h(tag, {
			attrs: {
				"data-placeholder": "Enter some text..."
			},
			domProps: {
				contentEditable: "true",
				innerHTML: options.text
			},
			style: {
				color: options.color ? options.color : undefined,
				fontSize: options.fontSize ? `${options.fontSize}rem` : undefined
			},
			on: {
				blur: evt => canUpdate === undefined || canUpdate() === true ? onBlur(evt, api) : undefined,
				input: evt => onInput(evt, tag, api),
				keydown: evt => onKeyDown(evt, api),
				paste: evt => onPaste(evt, api)
			}
		}),
		h(tag, {
			domProps: {innerHTML: options.formatted || options.text},
			style: {
				color: options.color ? options.color : undefined,
				fontSize: options.fontSize ? `${options.fontSize}rem` : undefined
			}
		})
	]);
}

function onBlur(evt, {editor, isRemoved, setOptions})
{
	editor.inserterList.close();

	if (isRemoved)
		return;

	setOptions({text: evt.target.innerText, formatted: formatText(evt.target.innerText)});
}

function onInput(evt, tag, {editor, index, insertBlock, options, remove})
{
	const text = evt.target.innerText;

	options.formatted = formatText(text, options.format);

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

function onKeyDown(evt, {editor, index, getRelative, insertBlock, options, remove, setOptions})
{
	const selection = window.getSelection();
	const text = evt.target.innerText;

	if (editor.inserterList.isOpen)
		return editor.inserterList.handleKeyDown(evt);

	if (evt.key === "Enter" && !evt.shiftKey)
		return kdHandleEnterWhenNotShift(evt, editor, index, options, selection, text, insertBlock, setOptions);

	if (includes(["ArrowDown", "ArrowRight"], evt.key) && atEdge(evt.target, true))
		return kdHandleArrowDownAtEnd(evt, getRelative);

	if (includes(["ArrowLeft", "ArrowUp"], evt.key) && atEdge(evt.target, false))
		return kdHandleArrowUpAtStart(evt, getRelative);

	if (evt.key === "Backspace" && selection.anchorOffset === 0 && selection.focusOffset === 0)
		return kdHandleBackspaceWhenAtStart(evt, options, text, remove, getRelative);

	if (evt.key === "Backspace" && text.trim() === "")
		return kdHandleBackspaceWhenEmpty(evt, remove, getRelative);
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

function textOptions(options, currentOptions)
{
	return {
		...options,
		formatted: formatText(options.text, currentOptions.format || [])
	};
}

function kdHandleArrowDownAtEnd(evt, getRelative)
{
	evt.preventDefault();

	const sibbling = getRelative(1);
	if (!sibbling)
		return;

	sibbling.focus({select: false}, elm => placeCaretAtEdge(elm, false));
}

function kdHandleArrowUpAtStart(evt, getRelative)
{
	evt.preventDefault();

	const sibbling = getRelative(-1);
	if (!sibbling)
		return;

	sibbling.focus({select: false}, elm => placeCaretAtEdge(elm, true));
}

function kdHandleBackspaceWhenAtStart(evt, options, text, remove, getRelative)
{
	evt.preventDefault();

	const sibbling = getRelative(-1);
	if (!sibbling || allowAppend.indexOf(sibbling.blockId) === -1)
		return;

	const textLength = sibbling.options.text.trim().length;
	const appendTextLength = text.trim().length;
	const offset = textLength > 0 ? textLength + Math.min(appendTextLength, 1) : 0;

	sibbling.setOptions(textOptions({text: (sibbling.options.text + " " + text).trim()}, options));
	remove();
	sibbling.focus({select: false}, elm => setSelection(elm.childNodes[0], offset));
}

function kdHandleBackspaceWhenEmpty(evt, remove, getRelative)
{
	evt.preventDefault();
	remove();

	const sibbling = getRelative(-1);
	if (sibbling)
		sibbling.focus({select: true, placeAtEnd: true});
}

function kdHandleEnterWhenNotShift(evt, editor, index, options, selection, text, insertBlock, setOptions)
{
	evt.preventDefault();
	editor.inserterList.close();

	const isForward = isForwardSelection(selection);
	let {anchorOffset, focusOffset, type} = selection;

	if (!isForward)
	{
		let tmp = anchorOffset;
		anchorOffset = focusOffset;
		focusOffset = tmp;
	}

	const startRightFrom = type === "Caret" ? anchorOffset : focusOffset;

	const textLeft = text.substr(0, anchorOffset).trim();
	const textRight = text.substr(startRightFrom).trim();

	// TODO(Bas): Make sure that if any formatting is used, format should split and used in the new block.
	insertBlock("paragraph", index + 1, textOptions({text: textRight}, {}), {placeAtEnd: false});
	setOptions(textOptions({text: textLeft}, options));
}
