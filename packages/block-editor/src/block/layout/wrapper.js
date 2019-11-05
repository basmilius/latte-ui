import { Block } from "../../core/block/block";
import { renderChildren } from "../../core/block/api";
import { either } from "../../util/vue";
import { inserterNag } from "../../ui/render/inserter";
import { description, fragment, settings, sidebar } from "../../ui/render/settings";
import { additionalClasses, advancedOptions, blockActions } from "../../ui/render/block";
import { translate } from "../../core/i18n";

import BlockView from "../../component/BlockView";

export class WrapperBlock extends Block
{

	get canHaveChildren()
	{
		return true;
	}

	get defaultOptions()
	{
		return {
			class: ""
		};
	}

	get description()
	{
		return translate("Wraps blocks into a wrapper.");
	}

	get keywords()
	{
		return [translate("Container")];
	}

	get name()
	{
		return translate("Wrapper");
	}

	constructor()
	{
		super("wrapper", "layout", "border-none-variant");
	}

	render(h, instance)
	{
		return h("div", {class: `be-block-wrapper ${instance.options.class}`}, renderChildren(instance));
	}

	renderEditor(h, instance)
	{
		return either(
			instance.children.length > 0,
			() => h("div", {class: `be-block-wrapper ${instance.options.class}`}, instance.children.map(child => h(BlockView, {
				key: child.hash,
				props: {instance: child}
			}))),
			() => h("div", {class: `be-block-wrapper ${instance.options.class}`}, [
				inserterNag(h, instance)
			])
		);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				advancedOptions(h, [
					additionalClasses(h, instance)
				])
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
