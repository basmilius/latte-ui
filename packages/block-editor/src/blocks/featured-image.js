import { BlockBase } from "../block";
import BESettingsGroup from "../BESettingsGroup";
import BEBlockActions from "../BEBlockActions";

export class FeaturedImageBlock extends BlockBase
{

	get defaultOptions()
	{
		return {
			imageUrl: "",
			shouldFade: false,
			title: ""
		};
	}

	constructor()
	{
		super("featured-image", "layout", "image-area", "Featured Image", "An image that is featured.");
	}

	render(h, {options})
	{
		return h("div", {class: `featured-image ${options.shouldFade === true ? "should-fade" : "should-not-fade"}`}, [
			h("div", {class: "featured-image-image", style: {backgroundImage: `url(${options.imageUrl})`}}),
			h("div", {class: "featured-image-title"}, options.title)
		]);
	}

	renderEditor(h, {options, setOptions})
	{
		return h("div", {class: `featured-image ${options.shouldFade === true ? "should-fade" : "should-not-fade"}`}, [
			h("div", {class: "featured-image-image", style: {backgroundImage: `url(${options.imageUrl})`}}),
			h("div", {
				attrs: {
					"data-placeholder": "Enter a caption..."
				},
				class: "featured-image-title",
				domProps: {
					contentEditable: "plaintext-only",
					innerHTML: options.title
				},
				on: {
					blur: evt => setOptions({title: evt.target.innerText})
				},
				style: {
					minWidth: "100%"
				}
			})
		]);
	}

	renderOptions(h, {index, indexMax, rearrange, remove, options, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			h("label", {class: "be-settings-row"}, [
				h("span", "Fade"),
				h("div", [
					h("input", {class: "toggle-button toggle-button-primary", domProps: {checked: options.shouldFade, type: "checkbox"}, on: {input: evt => setOptions({shouldFade: evt.target.checked})}})
				])
			]),
			h("label", {class: "be-settings-row flex-column"}, [
				h("span", "Image URL"),
				h("input", {class: "form-control", domProps: {value: options.imageUrl, type: "text"}, on: {input: evt => setOptions({imageUrl: evt.target.value})}})
			])
		]);
	}

}
