import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";
import { BlockBase } from "../block";

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
		domProps: {
			contentEditable: true,
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
				const text = evt.target.innerText;

				if (evt.key === "Enter" && !evt.shiftKey)
				{
					evt.preventDefault();

					const selection = window.getSelection();

					switch (selection.type)
					{
						case "Caret":
							const textLeft = text.substr(0, selection.anchorOffset).trim();
							const textRight = text.substr(selection.anchorOffset).trim();

							insertBlock("paragraph", index + 1, {text: textRight});
							setOptions({text: textLeft});
							return true;

						case "Range":
							console.log(selection);
							return true;
					}

					insertBlock("paragraph", index + 1);
					return;
				}

				if (evt.key === "Backspace" && text.trim() === "")
				{
					evt.preventDefault();

					const sibbling = getRelative(-1);
					if (sibbling)
						sibbling.focus(false);

					canUpdate = false;
					remove();
					return;
				}

				return true;
			}
		}
	});
}
