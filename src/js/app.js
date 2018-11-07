"use strict";

import "./OutsideEvent";

import * as Components from "../vue/component";

import { initialize as initializeSDK } from "./sdk.js";
import { createRootComponent } from "./ui/root";
import { initializeForms } from "./ui/forms";
import { initializeNotices } from "./ui/notices";
import { initializePanels } from "./ui/panels";
import { initializeTooltips } from "./ui/tooltip";

import "../vue/mixin";
import "../vue/directive";

Object.values(Components).forEach(c => Vue.component(c.name, c));

import "../vue/view";
import "../vue/widget";

moment.locale(window["LatteMomentLocale"] || "en");

initializeSDK();

window.addEventListener("DOMContentLoaded", () =>
{
	createRootComponent();
	initializeForms();
	initializeNotices();
	initializePanels();
	initializeTooltips();
});
