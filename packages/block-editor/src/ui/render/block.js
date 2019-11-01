import { fragment, group } from "./settings";
import { button, divider, textField } from "./element";

export function additionalClasses(h, instance)
{
	return textField(h, "Additional classes", () => instance.options.class, classes => instance.setOptions({class: classes}));
}

export function advancedOptions(h, children)
{
	return group(h, "Advanced", true, children);
}

export function blockActions(h, instance)
{
	return fragment(h, [
		button(h, {disabled: instance.isFirst, iconBefore: "arrow-up", type: "text"}, () => instance.rearrange(-1)),
		button(h, {disabled: instance.isLast, iconBefore: "arrow-down", type: "text"}, () => instance.rearrange(1)),
		divider(h, true),
		button(h, {iconBefore: "delete", type: "text"}, () => instance.remove())
	]);
}
