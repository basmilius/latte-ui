import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";
import { BlockBase } from "../block";
import { commandIconToggleButton, divider, functionIconToggleButton, optionTextColor, optionTextSize } from "./primitive/element";
import { render, renderEditor } from "./primitive/text";

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
			align: "left",
			color: undefined,
			fontSize: 1,
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
		canUpdate = true;

		return h(BESettingsGroup, {props: {title: this.name}}, [
			h("latte-portal", {props: {to: editor.toolbar.beforePortalId}}, [
				h("div", {class: "d-flex align-items-center", on: {mousedown: () => makeLastRange()}}, [
					h("div", {class: "divider divider-vertical"}),
					commandIconToggleButton(h, executeAndFocus, focus, "format-bold", "bold"),
					commandIconToggleButton(h, executeAndFocus, focus, "format-italic", "italic"),
					commandIconToggleButton(h, executeAndFocus, focus, "format-underline", "underline"),
					divider(h, true),
					functionIconToggleButton(h, executeAndFocus, focus, "format-align-left", () => setOptions({align: "left"}), () => options.align === "left"),
					functionIconToggleButton(h, executeAndFocus, focus, "format-align-center", () => setOptions({align: "center"}), () => options.align === "center"),
					functionIconToggleButton(h, executeAndFocus, focus, "format-align-right", () => setOptions({align: "right"}), () => options.align === "right"),
					functionIconToggleButton(h, executeAndFocus, focus, "format-align-justify", () => setOptions({align: "justify"}), () => options.align === "justify")
				])
			]),
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			optionTextColor(h, {editor, options, setOptions}),
			optionTextSize(h, {options, setOptions})
		]);
	}

}
