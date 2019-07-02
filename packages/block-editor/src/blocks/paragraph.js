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

	render(h, options)
	{
		return super.render(h, options);
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

export function renderEditor(tag, h, {index, getRelative, insertBlock, remove, options, setOptions})
{
	return h(tag, {
		domProps: {
			contentEditable: true,
			innerHTML: options.text
		},
		on: {
			blur: evt => setOptions({text: evt.target.innerHTML}),
			keydown: evt =>
			{
				if (evt.key === "Enter" && !evt.shiftKey)
				{
					evt.preventDefault();
					insertBlock("paragraph", index + 1);
					return;
				}

				if (evt.key === "Backspace" && evt.target.innerText.trim() === "")
				{
					evt.preventDefault();

					const sibbling = getRelative(-1);
					if (sibbling)
						sibbling.focus(false);

					remove();
					return;
				}

				console.log(evt.key);
			}
		}
	});
}
