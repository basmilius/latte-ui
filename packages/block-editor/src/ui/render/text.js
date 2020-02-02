/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { commandButtonToggle } from "./command";
import { functionButtonToggle } from "./function";

import Fragment from "../../component/Fragment";

export function alignments(h, instance)
{
	return h(Fragment, [
		functionButtonToggle(h, instance, "format-align-left", true, instance.options.align === "left", () => instance.setOptions({align: "left"}), "Align left"),
		functionButtonToggle(h, instance, "format-align-center", true, instance.options.align === "center", () => instance.setOptions({align: "center"}), "Align center"),
		functionButtonToggle(h, instance, "format-align-right", true, instance.options.align === "right", () => instance.setOptions({align: "right"}), "Align right"),
		functionButtonToggle(h, instance, "format-align-justify", true, instance.options.align === "justify", () => instance.setOptions({align: "justify"}), "Align justify")
	]);
}

export function boldItalicUnderline(h, instance)
{
	return h(Fragment, [
		commandButtonToggle(h, instance, "format-bold", "bold", "Bold"),
		commandButtonToggle(h, instance, "format-italic", "italic", "Italic"),
		commandButtonToggle(h, instance, "format-underline", "underline", "Underline")
	]);
}

export function indent(h, instance)
{
	return h(Fragment, [
		functionButtonToggle(h, instance, "format-indent-decrease", instance.options.indent > 0, false, () => instance.setOptions({indent: instance.options.indent - 1}), "Outdent"),
		functionButtonToggle(h, instance, "format-indent-increase", instance.options.indent <= 10, false, () => instance.setOptions({indent: instance.options.indent + 1}), "Indent")
	]);
}
