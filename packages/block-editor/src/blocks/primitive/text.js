import { setSelection, setSelectionAfter, setSelectionBefore } from "../../utils";

const allowAppend = ["heading", "paragraph"];

export function render(tag, h, {options})
{
	return h(tag, options.text);
}

export function renderEditor(tag, h, api)
{
	return h(tag, {
		attrs: {
			"data-placeholder": "Enter some text..."
		},
		domProps: {
			contentEditable: "true",
			innerHTML: api.options.text
		},
		on: {
			blur: evt => onBlur(evt, api),
			input: evt => tag === "p" ? onInput(evt, api) : undefined,
			keydown: evt => onKeyDown(evt, api)
		}
	});
}

function onBlur(evt, {editor, isRemoved, setOptions})
{
	editor.inserterList.close();

	if (isRemoved)
		return;

	setOptions({text: evt.target.innerHTML});
}

function onInput(evt, {editor, index, insertBlock, remove})
{
	const selection = window.getSelection();
	const selectionRange = selection.getRangeAt(0);
	const selectionRect = selectionRange.getBoundingClientRect();
	const text = evt.target.innerText;

	if (!text.startsWith("/") || selection.focusOffset < text.length)
		return editor.inserterList.close();

	const searchTerm = text.substr(1).toLowerCase();
	const foundBlocks = editor.blocks
		.filter(block => block.keywords.find(keyword => keyword.startsWith(searchTerm)))
		.slice(0, 5)
		.sort((a, b) => a.name.localeCompare(b.name));

	editor.inserterList.open(selectionRect, foundBlocks, blockId =>
	{
		remove();
		insertBlock(blockId, index);
	});
}

function onKeyDown(evt, {editor, index, getRelative, insertBlock, remove, setOptions})
{
	const selection = window.getSelection();
	const text = evt.target.innerText;

	if (editor.inserterList.isOpen)
		return editor.inserterList.handleKeyDown(evt);

	if (evt.key === "Enter" && !evt.shiftKey)
		return kdHandleEnterWhenNotShift(evt, editor, index, selection, text, insertBlock, setOptions);

	if ((evt.key === "ArrowDown" || evt.key === "ArrowRight") && selection.focusOffset === text.length)
		return kdHandleArrowDownAtEnd(evt, getRelative);

	if ((evt.key === "ArrowUp" || evt.key === "ArrowLeft") && selection.focusOffset === 0)
		return kdHandleArrowUpAtStart(evt, getRelative);

	if (evt.key === "Backspace" && selection.anchorOffset === 0 && selection.focusOffset === 0)
		return kdHandleBackspaceWhenAtStart(evt, text, remove, getRelative);

	if (evt.key === "Backspace" && text.trim() === "")
		return kdHandleBackspaceWhenEmpty(evt, remove, getRelative);
}

function kdHandleArrowDownAtEnd(evt, getRelative)
{
	evt.preventDefault();

	const sibbling = getRelative(1);
	if (!sibbling)
		return;

	sibbling.focus(false, elm => setSelectionBefore(elm.childNodes[0], true));
}

function kdHandleArrowUpAtStart(evt, getRelative)
{
	evt.preventDefault();

	const sibbling = getRelative(-1);
	if (!sibbling)
		return;

	sibbling.focus(false, elm => setSelectionAfter(elm.childNodes[0], true));
}

function kdHandleBackspaceWhenAtStart(evt, text, remove, getRelative)
{
	evt.preventDefault();

	const sibbling = getRelative(-1);
	if (!sibbling || allowAppend.indexOf(sibbling.blockId) === -1)
		return;

	const textLength = sibbling.options.text.trim().length;
	const appendTextLength = text.trim().length;
	const offset = textLength > 0 ? textLength + Math.min(appendTextLength, 1) : 0;

	sibbling.setOptions({text: (sibbling.options.text + " " + text).trim()});
	remove();
	sibbling.focus(false, elm => setSelection(elm.childNodes[0], offset));
}

function kdHandleBackspaceWhenEmpty(evt, remove, getRelative)
{
	evt.preventDefault();
	remove();

	const sibbling = getRelative(-1);
	if (sibbling)
		sibbling.focus(false);
}

function kdHandleEnterWhenNotShift(evt, editor, index, selection, text, insertBlock, setOptions)
{
	evt.preventDefault();
	editor.inserterList.close();

	switch (selection.type)
	{
		case "Caret":
		{
			const textLeft = text.substr(0, selection.anchorOffset).trim();
			const textRight = text.substr(selection.anchorOffset).trim();

			insertBlock("paragraph", index + 1, {text: textRight});
			setOptions({text: textLeft});
			return;
		}

		case "Range":
		{
			const textLeft = text.substr(0, selection.anchorOffset).trim();
			const textRight = text.substr(selection.focusOffset).trim();

			insertBlock("paragraph", index + 1, {text: textRight});
			setOptions({text: textLeft});
			return;
		}
	}
}
