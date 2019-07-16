import { IconButton, IconToggleButton } from "./icon-button";
import { textField } from "./settings";
import { translate } from "../utils";

export function commandIconToggleButton(h, executeAndFocus, api, icon, command)
{
	return h(IconToggleButton, {
		props: {
			icon,
			can: () => document.queryCommandEnabled(command),
			press: () => executeAndFocus(api, () => document.execCommand(command)),
			pressed: () => document.queryCommandState(command)
		}
	});
}

export function functionIconButton(h, executeAndFocus, api, icon, onClick, disabled = false)
{
	return h(IconButton, {
		props: {
			icon,
			disabled: disabled,
			press: () => executeAndFocus(api, onClick)
		}
	});
}

export function functionIconToggleButton(h, executeAndFocus, api, icon, onClick, isPressed)
{
	return h(IconToggleButton, {
		props: {
			icon,
			can: () => true,
			press: () => executeAndFocus(api, onClick),
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

export function optionAdditionalClasses(h, api)
{
	return textField(h, translate("Additional classes"), () => api.options.class, classes => api.setOptions({class: classes}));
}

export function optionTextColor(h, api)
{
	return h("div", {class: "be-settings-row flex-column"}, [
		h("span", translate("Color")),
		h("div", {class: "be-settings-text-colors"}, api.editor.colorPalette.map(color => h("button", {
			attrs: {"data-tooltip": translate(color.name)},
			class: `color ${color.value === api.options.color ? "is-active" : ""}`,
			style: {color: color.value},
			on: {click: () => api.setOptions({color: api.options.color === color.value ? undefined : color.value})}
		})))
	])
}

export function optionTextSize(h, api, min = 1, max = 3, step = 0.05)
{
	return h("label", {class: "be-settings-row"}, [
		h("span", translate("Size")),
		h("div", [
			h("input", {
				class: "custom-range",
				domProps: {min, max, step, value: api.options.fontSize, type: "range"},
				on: {input: evt => api.setOptions({fontSize: parseFloat(evt.target.value)})}
			})
		])
	])
}