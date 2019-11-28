import { button } from "./element";

export function commandButtonToggle(h, instance, icon, command, ariaLabel = null)
{
	const can = document.queryCommandEnabled(command);
	const is = document.queryCommandState(command);

	return button(h, {
		color: is ? "primary" : null,
		ariaLabel: ariaLabel,
		disabled: !can,
		iconBefore: icon,
		type: is ? "outline" : "text"
	}, () => instance.focusAndExecute(() => document.execCommand(command)));
}
