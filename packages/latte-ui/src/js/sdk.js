/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

import action from "./core/action";
import api from "./core/api";
import core from "./core";
import i18n from "./i18n";
import math from "./math";
import operators from "./operators";
import ui from "./ui";
import util from "./util"

import { author, description, name, version } from "../../package.json";

export default {
	author: author,
	description: description,
	name: name,
	version: version,

	action,
	api,
	core,
	i18n,
	math,
	operators,
	ui,
	util,

	vue: Vue
};
