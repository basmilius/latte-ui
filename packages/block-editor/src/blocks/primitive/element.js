import { IconToggleButton } from "./icon-button";

export { IconToggleButton } from "./icon-button";

export function commandIconToggleButton(h, executeAndFocus, focus, icon, command)
{
	return h(IconToggleButton, {
		props: {
			icon,
			can: () => document.queryCommandEnabled(command),
			press: () => executeAndFocus(focus, () => document.execCommand(command)),
			pressed: () => document.queryCommandState(command)
		}
	});
}

export function functionIconToggleButton(h, executeAndFocus, focus, icon, onClick, isPressed)
{
	return h(IconToggleButton, {
		props: {
			icon,
			can: () => true,
			press: () => executeAndFocus(focus, onClick),
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

export function optionTextColor(h, {editor, options, setOptions})
{
	return h("div", {class: "be-settings-row flex-column"}, [
		h("span", "Color"),
		h("div", {class: "be-settings-text-colors"}, editor.colorPalette.map(color => h("button", {
			attrs: {"data-tooltip": color.name},
			class: `color ${color.value === options.color ? "is-active" : ""}`,
			style: {color: color.value},
			on: {click: () => setOptions({color: options.color === color.value ? undefined : color.value})}
		})))
	])
}

export function optionTextSize(h, {options, setOptions}, min = 1, max = 3, step = 0.05)
{
	return h("label", {class: "be-settings-row"}, [
		h("span", "Size"),
		h("div", [
			h("input", {
				class: "custom-range",
				domProps: {min, max, step, value: options.fontSize, type: "range"},
				on: {input: evt => setOptions({fontSize: parseFloat(evt.target.value)})}
			})
		])
	])
}

