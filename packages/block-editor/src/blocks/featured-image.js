import { BlockBase } from "../block";
import BESettingsGroup from "../BESettingsGroup";
import BERearrange from "../BERearrange";

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

	render(h, options)
	{
		return super.render(h, options);
	}

	renderEditor(h, {options, setOptions})
	{
		return h("div", {class: `featured-image ${options.shouldFade === true ? "should-fade" : "should-not-fade"}`}, [
			h("div", {class: "featured-image-image", style: {backgroundImage: `url(${options.imageUrl})`}}),
			h("div", {
				class: "featured-image-title",
				domProps: {
					contentEditable: true,
					innerHTML: options.title
				},
				on: {
					blur: evt => setOptions({title: evt.target.innerText})
				}
			})
		]);
	}

	renderOptions(h, {index, indexMax, rearrange, options, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BERearrange, {props: {index, indexMax, rearrange}, slot: "header"}),
			h("label", {class: "be-settings-row"}, [
				h("span", "Fade"),
				h("div", [
					h("input", {class: "toggle-button toggle-button-primary", domProps: {checked: options.shouldFade, type: "checkbox"}, on: {input: evt => setOptions({shouldFade: evt.target.checked})}})
				])
			]),
			h("label", {class: "be-settings-row"}, [
				h("span", "Image URL"),
				h("div", [
					h("input", {class: "form-control", domProps: {value: options.imageUrl, type: "text"}, on: {input: evt => setOptions({imageUrl: evt.target.value})}})
				])
			])
		]);
	}

}
