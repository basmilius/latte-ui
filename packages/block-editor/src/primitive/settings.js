import BEBlockActions from "../BEBlockActions";
import BESettingsGroup from "../BESettingsGroup";

export function blockActions(h, api)
{
	return h(BEBlockActions, {props: {api}, slot: "header"});
}

export function optional(condition, fn, defaultValue = undefined)
{
	if (!condition)
		return defaultValue;

	return fn();
}

export function rangeField(h, title, getValue, setValue, min = 0, max = 1, step = 0.1)
{
	return h("label", {class: "be-settings-row"}, [
		h("span", title),
		h("div", [
			h("input", {
				class: "custom-range",
				domProps: {
					min,
					max,
					step,
					value: getValue(),
					type: "range"
				},
				on: {
					input: evt => setValue(parseInt(evt.target.value))
				}
			})
		])
	]);
}

export function settingsGroup(h, title, children)
{
	return h(BESettingsGroup, {props: {title}}, children);
}

export function settingsGroupWithDepth(h, depth, title, children)
{
	return h(BESettingsGroup, {props: {title, depth}}, children);
}

export function textField(h, title, getValue, setValue)
{
	return h("label", {class: "be-settings-row flex-column"}, [
		h("span", title),
		h("input", {
			class: "form-control",
			domProps: {
				type: "text",
				value: getValue()
			},
			on: {
				input: evt => setValue(evt.target.value)
			}
		})
	]);
}

export function toggleButton(h, title, getValue, setValue)
{
	return h("label", {class: "be-settings-row"}, [
		h("span", title),
		h("input", {
			class: "toggle-button toggle-button-primary",
			domProps: {
				checked: getValue(),
				type: "checkbox"
			},
			on: {
				input: evt => setValue(evt.target.checked)
			}
		})
	]);
}