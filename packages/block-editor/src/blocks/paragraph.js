import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";
import { BlockBase } from "../block";
import { iconButton, optionTextColor, optionTextSize } from "./primitive/element";
import { render, renderEditor } from "./primitive/text";
import { getLatte } from "../utils";

const L = getLatte();

let canUpdate = true;
let lastSelectionRange;

function executeAndFocus(focus, fn)
{
	focus(undefined, elm =>
	{
		elm.focus();

		const selection = window.getSelection();
		selection.setBaseAndExtent(lastSelectionRange.startContainer, lastSelectionRange.startOffset, lastSelectionRange.endContainer, lastSelectionRange.endOffset);

		fn();
		makeLastRange();
	});
}

function makeLastRange()
{
	canUpdate = false;

	const current = window.getSelection().getRangeAt(0);
	const range = document.createRange();

	range.setStart(current.startContainer instanceof Element ? current.startContainer.childNodes[0] : current.startContainer, current.startOffset);
	range.setEnd(current.endContainer instanceof Element ? current.endContainer.childNodes[0] : current.endContainer, current.endOffset);

	lastSelectionRange = range;
}

export class ParagraphBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			color: undefined,
			fontSize: 1,
			format: undefined,
			text: ""
		};
	}

	get description()
	{
		return "Represents some text."
	}

	get keywords()
	{
		return ["paragraph", "text"];
	}

	get name()
	{
		return "Paragraph";
	}

	constructor()
	{
		super("paragraph", "text", "format-paragraph");
	}

	render(h, api)
	{
		return render("p", h, api);
	}

	renderEditor(h, api)
	{
		return renderEditor("p", h, api, () => canUpdate);
	}

	renderOptions(h, {editor, focus, index, indexMax, rearrange, remove, options, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h("latte-portal", {props: {to: editor.toolbar.beforePortalId}}, [
				h("div", {class: "d-flex align-items-center", on: {click: evt => evt.preventDefault(), mousedown: () => makeLastRange()}}, [
					h("div", {class: "divider divider-vertical"}),
					iconButton(h, "format-bold", () => executeAndFocus(focus, () => document.execCommand("bold")), () => document.queryCommandState("bold")),
					iconButton(h, "format-italic", () => executeAndFocus(focus, () => document.execCommand("italic")), () => document.queryCommandState("italic")),
					iconButton(h, "format-underline", () => executeAndFocus(focus, () => document.execCommand("underline")), () => document.queryCommandState("underline")),
					h("div", {class: "divider divider-vertical"}),
					iconButton(h, "link", () => L.ui.message.prompt("Url", "Enter a URL").then(r =>
					{
						if (r.button !== L.ui.message.Buttons.OK)
							return;

						executeAndFocus(focus, () => document.execCommand("createLink", false, r.input));
					}))
				])
			]),
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			optionTextColor(h, {editor, options, setOptions}),
			optionTextSize(h, {options, setOptions})
		]);
	}

}
