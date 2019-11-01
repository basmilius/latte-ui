import { button } from "./element";

export function functionButtonToggle(h, instance, icon, can, is, fn)
{
	return button(h, {
		color: is ? "primary" : null,
		disabled: !can,
		iconBefore: icon,
		type: is ? "outline" : "text"
	}, () => instance.focusAndExecute(fn));
}
