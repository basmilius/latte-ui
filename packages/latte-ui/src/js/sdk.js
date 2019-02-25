/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import Vue from "vue";

import actions from "./actions";
import api from "./api";
import clipboard from "./util/clipboard";
import cookie from "./util/cookies";
import core from "./core";
import dom from "./util/dom";
import i18n from "./i18n";
import json from "./util/json";
import math from "./math";
import messages from "./ui/messages";
import notices from "./ui/notices";
import operators from "./operators";
import overlays from "./ui/overlays";
import panels from "./ui/panels";
import string from "./util/string";

import pkg from "../../package.json";

export default {
	author: pkg.author,
	description: pkg.description,
	name: pkg.name,
	version: pkg.version,

	actions,
	api,
	clipboard,
	cookie,
	core,
	dom,
	i18n,
	json,
	math,
	messages,
	notices,
	operators,
	overlays,
	panels,
	string,
	vue: Vue
};
