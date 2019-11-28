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
		button(h, {ariaLabel: "Move up", disabled: instance.isFirst, iconBefore: "arrow-up", type: "text"}, () => instance.rearrange(-1)),
		button(h, {ariaLabel: "Move down", disabled: instance.isLast, iconBefore: "arrow-down", type: "text"}, () => instance.rearrange(1)),
		divider(h, true),
		button(h, {ariaLabel: "Remove block", iconBefore: "delete", type: "text"}, () => instance.remove())
	]);
}
