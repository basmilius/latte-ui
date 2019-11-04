import { row } from "./settings";
import { translate } from "../../core/i18n";
import { defaultColorPalette } from "../../core/options";

export function simpleColorSelect(h, title, get, set)
{
	const value = get();

	return row(h, false, [
		h("h6", translate(title)),
		h("div", {class: "be-color-grid"}, defaultColorPalette.map(color => h("button", {
			attrs: {"data-tooltip": translate(color.name)},
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
