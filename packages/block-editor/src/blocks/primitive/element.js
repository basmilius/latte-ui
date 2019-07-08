export function iconButton(h, icon, onClick, isPressed = undefined)
{
	return h("button", {
		class: `btn btn-icon ${isPressed === undefined || isPressed() === false ? "btn-text btn-dark" : "btn-contained btn-primary"}`,
		on: {click: onClick || (() => undefined)}
	}, [
		h("i", {class: `mdi mdi-${icon}`})
	]);
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

