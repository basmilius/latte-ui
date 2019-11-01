import { Block } from "../../core/block/block";
import { Latte } from "../../util/latte";
import { description, fragment, settings, sidebar, toolbar } from "../../ui/render/settings";
import { blockActions } from "../../ui/render/block";
import { tab, tabContainer } from "../../ui/render/tabs";
import { simpleRender } from "../../ui/render/vue";
import { portal, target } from "../../ui/render/portal";
import { button } from "../../ui/render/element";
import { either } from "../../util/vue";
import { inserterNagAbstract } from "../../ui/render/inserter";

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
		const dom = Latte.util.dom.toDOM(instance.options.code);

		return tabContainer(h, {style: {minHeight: "24px", zIndex: "0"}}, ({current, tabs, setCurrent}) => [
			portal(h, `${instance.hash}-toolbar`, tabs.map((tab, index) => button(h, {
				classes: index === 0 ? [""] : ["ml-2"],
				label: tab.label,
				color: current === index ? "primary" : undefined,
				type: current === index ? "outline" : "text"
			}, () => setCurrent(index)))),
			tab(h, "Visual", undefined, [
				either(
					dom.children.length === 0,
					() => inserterNagAbstract(h, instance, "code-tags", "Edit HTML", () => setCurrent(1)),
					() => simpleRender(h, (instance.options.code.trim() !== "" ? instance.options.code : "<div></div>")
						.replace(/href=/g, "data-be-href=")
						.replace(/data-action=/g, "data-be-action="))
				)
			]),
			tab(h, "Code", undefined, [
				h("textarea", {
					class: "form-control text-monospace",
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
			]),
			toolbar(h, instance, [
				target(h, `${instance.hash}-toolbar`)
			])
		]);
	}

}
