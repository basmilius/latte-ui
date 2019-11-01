import { Block } from "../../core/block/block";
import { translate } from "../../core/i18n";
import { Latte } from "../../util/latte";
import { description, fragment, settings, sidebar } from "../../ui/render/settings";
import { blockActions } from "../../ui/render/block";
import { tab, tabBar, tabContainer } from "../../ui/render/tabs";
import { simpleRender } from "../../ui/render/vue";

export class HtmlBlock extends Block
{

	get defaultOptions()
	{
		return {
			code: ""
		};
	}

	get description()
	{
		return "Allows you to add custom HTML code.";
	}

	get keywords()
	{
		return ["html", "custom", "code"];
	}

	get name()
	{
		return "Custom HTML";
	}

	constructor()
	{
		super("html", "other", "language-html5");
	}

	render(h, instance)
	{
		return Latte.util.dom.toDOM(instance.options.code.replace(/\t/g, "").replace(/\r?\n|\r/g, " "));
	}

	renderEditor(h, instance)
	{
		return tabContainer(h, {style: {zIndex: "0"}}, [
			h("div", {class: "position-relative d-flex align-items-center mb-1", style: {zIndex: "1"}}, [
				h("strong", translate(this.name)),
				tabBar(h, {class: "ml-auto"})
			]),
			tab(h, "Visual", undefined, [
				simpleRender(h, (instance.options.code.trim() !== "" ? instance.options.code : "<div></div>")
					.replace(/href=/g, "data-be-href=")
					.replace(/data-action=/g, "data-be-action="))
			]),
			tab(h, "Code", undefined, [
				h("textarea", {
					class: "form-control",
					domProps: {rows: 10, value: instance.options.code},
					on: {input: evt => instance.setOptions({code: evt.target.value})}
				})
			])
		]);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this)
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
