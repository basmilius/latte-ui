import { row } from "./settings";
import { translate } from "../../core/i18n";
import { classColorPalette, defaultColorPalette } from "../../core/options";

export function classColorSelect(h, title, get, set)
{
	const value = get();

	return row(h, false, [
		h("h6", translate(title)),
		h("div", {class: "be-color-grid"}, classColorPalette.map(color => h("button", {
			attrs: {"aria-label": translate(color.name), "data-tooltip": translate(color.name)},
			class: `color ${color.id === value ? "is-active" : ""}`,
			style: {color: color.value},
			on: {
				click()
				{
					set(color.id === value ? undefined : color.id);
				}
			}
		})))
	], "div");
}

export function simpleColorSelect(h, title, get, set)
{
	const value = get();

	return row(h, false, [
		h("h6", translate(title)),
		h("div", {class: "be-color-grid"}, defaultColorPalette.map(color => h("button", {
			attrs: {"aria-label": translate(color.name), "data-tooltip": translate(color.name)},
			class: `color ${color.value === value ? "is-active" : ""}`,
			style: {color: color.value},
			on: {
				click()
				{
					set(color.value === value ? undefined : color.value);
				}
			}
		})))
	], "div");
}
