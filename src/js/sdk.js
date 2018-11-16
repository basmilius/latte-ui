"use strict";

import actions from "./actions";
import api from "./api";
import clipboard from "./util/clipboard";
import cookie from "./util/cookies";
import core from "./core";
import dom from "./util/dom";
import i18n from "./i18n";
import json from "./util/json";
import messages from "./ui/messages";
import notices from "./ui/notices";
import operators from "./operators";
import overlays from "./ui/overlays";
import panels from "./ui/panels";
import string from "./util/string";

Array.prototype.contains = function (needle)
{
	return this.indexOf(needle) > -1;
};

window.Latte = {
	actions,
	api,
	clipboard,
	cookie,
	core,
	dom,
	i18n,
	json,
	messages,
	notices,
	operators,
	overlays,
	panels,
	string,
	vue: Vue
};
