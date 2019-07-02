import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";
import { BlockBase } from "../block";
import { renderEditor } from "./paragraph";

const headers = [
	{tag: "h1", icon: "format-header-1", name: "Header 1"},
	{tag: "h2", icon: "format-header-2", name: "Header 2"},
	{tag: "h3", icon: "format-header-3", name: "Header 3"},
	{tag: "h4", icon: "format-header-4", name: "Header 4"},
	{tag: "h5", icon: "format-header-5", name: "Header 5"},
	{tag: "h6", icon: "format-header-6", name: "Header 6"}
];

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

	renderEditor(h, api)
	{
		return renderEditor(api.options.type, h, api);
	}

	renderOptions(h, {index, indexMax, rearrange, remove, options, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			h("div", {class: "d-flex"}, headers.map(header => h("button", {
				class: `btn btn-icon ${header.tag === options.type ? "btn-primary btn-contained" : "btn-dark btn-text"}`,
				on: {click: () => setOptions({type: header.tag})},
				style: {flex: "1 1 0"}
			}, [
				h("i", {class: `mdi mdi-${header.icon}`})
			])))
		]);
	}

}
