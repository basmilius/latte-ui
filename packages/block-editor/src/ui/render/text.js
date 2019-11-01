import { commandButtonToggle } from "./command";
import { functionButtonToggle } from "./function";

import Fragment from "../../component/Fragment";

export function alignments(h, instance)
{
	return h(Fragment, [
		functionButtonToggle(h, instance, "format-align-left", true, instance.options.align === "left", () => instance.setOptions({align: "left"})),
		functionButtonToggle(h, instance, "format-align-center", true, instance.options.align === "center", () => instance.setOptions({align: "center"})),
		functionButtonToggle(h, instance, "format-align-right", true, instance.options.align === "right", () => instance.setOptions({align: "right"})),
		functionButtonToggle(h, instance, "format-align-justify", true, instance.options.align === "justify", () => instance.setOptions({align: "justify"}))
	]);
}

export function boldItalicUnderline(h, instance)
{
	return h(Fragment, [
		commandButtonToggle(h, instance, "format-bold", "bold"),
		commandButtonToggle(h, instance, "format-italic", "italic"),
		commandButtonToggle(h, instance, "format-underline", "underline")
	]);
}

export function indent(h, instance)
{
	return h(Fragment, [
		functionButtonToggle(h, instance, "format-indent-decrease", instance.options.indent > 0, false, () => instance.setOptions({indent: instance.options.indent - 1})),
		functionButtonToggle(h, instance, "format-indent-increase", instance.options.indent <= 10, false, () => instance.setOptions({indent: instance.options.indent + 1}))
	]);
}
