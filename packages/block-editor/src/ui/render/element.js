import { row } from "./settings";
import { translate } from "../../core/i18n";
import { Latte } from "../../util/latte";

import Button from "../Button";
import Notice from "../Notice";

export function button(h, props, onClick)
{
	return h(Button, {
		props,
		on: {
			click: onClick
		}
	});
}

export function comboBox(h, title, options, get, set)
{
	return row(h, false, [
		h("h6", translate(title)),
		h("select", {class: "form-control", domProps: {value: get()}, on: {change: evt => set(evt.target.value)}}, options.map(option =>
			h("option", {domProps: {value: option.value}}, option.label)
		))
	]);
}

export function divider(h, isHorizontal)
{
	return h("div", {
		class: `divider divider-${isHorizontal ? "horizontal" : "vertical"}`
	});
}

export function notice(h, message, options = {})
{
	return h(Notice, {props: options}, [
		h("p", message)
	]);
}

export function optionButtons(h, title, buttons, get, set)
{
	const value = get();

	return row(h, true, [
		h("h6", translate(title)),
		h("div", {class: "d-flex my-n1 ml-auto"}, buttons.map(b => button(h, {
			...b,
			iconBefore: b.icon,
			class: "m-0",
			color: value === b.value ? "primary" : null,
			type: value === b.value ? "outline" : "text"
		}, () => set(b.value))))
	], "div");
}

export function rangeSlider(h, title, get, set, min = 1, max = 10, step = 1, tooltip = "@0")
{
	const value = get();

	return row(h, true, [
		h("h6", translate(title)),
		h("input", {
			class: "custom-range",
			domProps: {min, max, step, value, type: "range"},
			on: {
				"!mouseup": () => Latte.action.dispatch("latte:tooltip:hide"),
				input(evt)
				{
					const val = parseFloat(evt.target.value);
					const {top, left, width} = evt.target.getBoundingClientRect();
					const p = (val - min) / (max - min);

					Latte.action.dispatch("latte:tooltip", {
						x: left + (p * (width - 24)) + 12,
						y: top,
						classes: ["tooltip-top"],
						content: translate(tooltip, val),
						position: null
					});

					set(val);
				}
			}
		})
	]);
}

export function textField(h, title, get, set, placeholder = undefined)
{
	placeholder = placeholder || title;

	return row(h, false, [
		h("h6", translate(title)),
		h("input", {
			class: "form-control",
			domProps: {
				placeholder,
				type: "text",
				value: get()
			},
			on: {
				input: evt => set(evt.target.value)
			}
		})
	]);
}

export function toggleButton(h, title, get, set)
{
	return row(h, true, [
		h("h6", translate(title)),
		h("input", {
			class: "toggle-button toggle-button-primary ml-auto",
			domProps: {
				checked: get(),
				type: "checkbox"
			},
			on: {
				input: evt => set(evt.target.checked)
			}
		})
	]);
}
