import { IconButton, IconToggleButton } from "./icon-button";
import { optional, textField } from "./settings";
import { getLatte, translate } from "../utils";

export function commandIconToggleButton(h, executeAndFocus, entry, icon, command)
{
	return h(IconToggleButton, {
		props: {
			icon,
			can: () => document.queryCommandEnabled(command),
			press: () => executeAndFocus(entry, () => document.execCommand(command)),
			pressed: () => document.queryCommandState(command)
		}
	});
}

export function functionIconButton(h, executeAndFocus, entry, icon, onClick, disabled = false)
{
	return h(IconButton, {
		props: {
			icon,
			disabled: disabled,
			press: () => executeAndFocus(entry, onClick)
		}
	});
}

export function functionIconToggleButton(h, executeAndFocus, entry, icon, onClick, isPressed)
{
	return h(IconToggleButton, {
		props: {
			icon,
			can: () => true,
			press: () => executeAndFocus(entry, onClick),
			pressed: isPressed
		}
	});
}

export function button(h, options, fn)
{
	const classes = ["btn", `btn-${options.style || "contained"}`];

	if (options.icon && !options.label)
		classes.push("btn-icon");

	if (options.color)
		classes.push(`btn-${options.color}`);

	if (options.class)
		classes.push(options.class);

	let params = {
		attrs: {},
		class: classes,
		on: {click: fn}
	};

	if (options.tooltip)
		params.attrs["data-tooltip"] = options.tooltip;

	return h("button", params, [
		optional(options.icon, () => icon(h, options.icon)),
		optional(options.label, () => h("span", options.label))
	]);
}

export function divider(h, vertical = false)
{
	return h("div", {
		class: `divider divider-${vertical ? "vertical" : "horizontal"}`
	});
}

export function icon(h, icon)
{
	return h("i", {
		class: `mdi mdi-${icon}`
	});
}

export function optionAdditionalClasses(h, entry)
{
	return textField(h, translate("Additional classes"), () => entry.options.class, classes => entry.setOptions({class: classes}));
}

export function optionButtons(h, title, buttons, getValue, setValue)
{
	return h("div", {class: "be-settings-row"}, [
		h("span", title),
		h("div", {class: "d-flex my-n1"}, buttons.map(btn => button(h, {
			...btn,
			class: "m-0",
			color: getValue() === btn.value ? "primary" : "dark",
			style: getValue() === btn.value ? "contained" : "text"
		}, () => setValue(btn.value))))
	]);
}

export function optionTextColor(h, entry)
{
	return h("div", {class: "be-settings-row flex-column"}, [
		h("span", translate("Color")),
		h("div", {class: "be-settings-text-colors"}, entry.editor.colorPalette.map(color => h("button", {
			attrs: {"data-tooltip": translate(color.name)},
			class: `color ${color.value === entry.options.color ? "is-active" : ""}`,
			style: {color: color.value},
			on: {click: () => entry.setOptions({color: entry.options.color === color.value ? undefined : color.value})}
		})))
	])
}

export function optionTextSize(h, entry, min = 0.7, max = 3, step = 0.1)
{
	return h("label", {class: "be-settings-row"}, [
		h("span", translate("Size")),
		h("div", [
			h("input", {
				class: "custom-range",
				domProps: {min, max, step, value: entry.options.fontSize, type: "range"},
				on: {
					"!mouseup": () => getLatte().action.dispatch("latte:tooltip:hide"),
					input: evt =>
					{
						const fontSize = parseFloat(evt.target.value);
						const latte = getLatte();
						const {top, left, width} = evt.target.getBoundingClientRect();
						const p = (fontSize - min) / (max - min);

						latte.action.dispatch("latte:tooltip", {
							x: left + (p * (width - 24)) + 12,
							y: top,
							classes: ["tooltip-top"],
							content: `${fontSize}rem`,
							position: null
						});

						entry.setOptions({fontSize});
					}
				}
			})
		])
	])
}
