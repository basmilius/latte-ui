import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";
import { BlockBase } from "../block";
import { setSelection, setSelectionAfter, setSelectionBefore } from "../utils";

export class ParagraphBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			text: ""
		};
	}

	constructor()
	{
		super("paragraph", "text", "format-paragraph", "Paragraph", "Some text.");
	}

	render(h, api)
	{
		return render("p", h, api);
	}

	renderEditor(h, api)
	{
		return renderEditor("p", h, api);
	}

	renderOptions(h, {index, indexMax, rearrange, remove, options, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"})
		]);
	}

}

export function render(tag, h, {options})
{
	return h(tag, options.text);
}

export function renderEditor(tag, h, {index, getRelative, insertBlock, remove, options, setOptions})
{
	let canUpdate = true;

	return h(tag, {
		attrs: {
			"data-placeholder": "Enter some text..."
		},
		domProps: {
			contentEditable: "true",
			innerHTML: options.text
		},
		on: {
			blur: evt =>
			{
				if (!canUpdate)
					return;

				setOptions({text: evt.target.innerHTML});
			},
			keydown: evt =>
			{
				const selection = window.getSelection();
				const text = evt.target.innerText;

				if (evt.key === "Enter" && !evt.shiftKey)
				{
					evt.preventDefault();

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
							const textRight = text.substr(selection.focusOffset).trim();

							insertBlock("paragraph", index + 1, {text: textRight});
							setOptions({text: ""});
							return;
						}
					}
				}

				if (evt.key === "ArrowDown" && selection.anchorOffset === text.length)
				{
					evt.preventDefault();

					const sibbling = getRelative(1);

					if (!sibbling)
						return;

					sibbling.focus(false, elm => setSelectionBefore(elm.childNodes[0], true));
				}

				if (evt.key === "ArrowUp" && selection.anchorOffset === 0)
				{
					evt.preventDefault();

					const sibbling = getRelative(-1);

					if (!sibbling)
						return;

					sibbling.focus(false, elm => setSelectionAfter(elm.childNodes[0], true));
				}

				if (evt.key === "Backspace" && selection.anchorOffset === 0 && selection.focusOffset === 0)
				{
					evt.preventDefault();

					const allowAppend = ["heading", "paragraph"];
					const sibbling = getRelative(-1);

					if (!sibbling)
						return;

					if (allowAppend.indexOf(sibbling.blockId) === -1)
						return;

					const offset = sibbling.options.text.length + 1;

					sibbling.setOptions({text: sibbling.options.text + " " + text});
					remove();
					sibbling.focus(false, elm => setSelection(elm.childNodes[0], offset));

					return;
				}

				if (evt.key === "Backspace" && text.trim() === "")
				{
					evt.preventDefault();

					canUpdate = false;
					remove();

					const sibbling = getRelative(-1);
					if (sibbling)
						sibbling.focus(false);

					return;
				}

				return false; //console.log(evt.key);
			}
		}
	});
}
