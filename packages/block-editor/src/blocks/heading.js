import BESettingsGroup from "../BESettingsGroup";
import BERearrange from "../BERearrange";
import { BlockBase } from "../block";

const headers = ["h1", "h2", "h3", "h4", "h5", "h6"];

export class HeadingBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			type: "h3",
			text: "Header"
		};
	}

	constructor()
	{
		super("heading", "text", "format-header-1", "Heading", "Header text from 1 through 6.");
	}

	render(h, options)
	{
		return super.render(h, options);
	}

	renderEditor(h, {options, setOptions})
	{
		return h(options.type, {
			domProps: {
				contentEditable: true,
				innerHTML: options.text
			},
			on: {
				blur: evt => setOptions({text: evt.target.innerHTML})
			}
		});
	}

	renderOptions(h, {index, indexMax, rearrange, options, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BERearrange, {props: {index, indexMax, rearrange}, slot: "header"}),
			headers.map(header => h("label", {class: "be-settings-row"}, [
				h("span", header.toUpperCase()),
				h("div", [
					h("input", {class: "radio-button radio-button-primary", domProps: {checked: options.type === header, type: "radio"}, on: {input: () => setOptions({type: header})}})
				])
			]))
		]);
	}

}
