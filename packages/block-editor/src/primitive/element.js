import { IconButton, IconToggleButton } from "./icon-button";
import { textField } from "./settings";
import { translate } from "../utils";

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

export function optionTextSize(h, entry, min = 1, max = 3, step = 0.05)
{
	return h("label", {class: "be-settings-row"}, [
		h("span", translate("Size")),
		h("div", [
			h("input", {
				class: "custom-range",
				domProps: {min, max, step, value: entry.options.fontSize, type: "range"},
				on: {input: evt => entry.setOptions({fontSize: parseFloat(evt.target.value)})}
			})
		])
	])
}
