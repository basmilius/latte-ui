/*
 * Copyright © 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import "./z";
import "./hid/OutsideEvent";
import "./hid/PointerEvents";

import * as Components from "../vue/component";
import * as Directives from "../vue/directive";
import * as RTEPlugins from "../vue/rich-text-editor";
import * as Widgets from "../vue/widget";

import { createRootComponent } from "./ui/root";
import { initializeForms } from "./ui/forms";
import { initializeNotices } from "./ui/notices";
import { initializePanels } from "./ui/panels";
import { initializeTooltips } from "./ui/tooltip";

window.LatteMomentLocale = window.LatteMomentLocale || "en";

import "./sdk";

Object.values(Directives).forEach(d => Vue.directive(d.name, d));
Object.values(Components).forEach(c => Vue.component(c.name, c));
Object.values(RTEPlugins).forEach(p => Vue.component(p.name, p));
Object.values(Widgets).forEach(w => Vue.component(w.name, w));

moment.locale(window.LatteMomentLocale);

window.addEventListener("DOMContentLoaded", () =>
{
	createRootComponent();
	initializeForms();
	initializeNotices();
	initializePanels();
	initializeTooltips();
});
