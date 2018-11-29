"use strict";

import "./z";
import "./hid/OutsideEvent";
import "./hid/PointerEvents";

import * as Components from "../vue/component";
import * as Directives from "../vue/directive";
import * as Views from "../vue/view";
import * as Widgets from "../vue/widget";

import { createRootComponent } from "./ui/root";
import { initializeForms } from "./ui/forms";
import { initializeNotices } from "./ui/notices";
import { initializePanels } from "./ui/panels";
import { initializeTooltips } from "./ui/tooltip";

import "./sdk";
import "../vue/mixin";

Object.values(Directives).forEach(d => Vue.directive(d.name, d));
Object.values(Components).forEach(c => Vue.component(c.name, c));
Object.values(Views).forEach(v => Vue.component(v.name, v));
Object.values(Widgets).forEach(w => Vue.component(w.name, w));

moment.locale(window["LatteMomentLocale"] || "en");

window.addEventListener("DOMContentLoaded", () =>
{
	createRootComponent();
	initializeForms();
	initializeNotices();
	initializePanels();
	initializeTooltips();
});
