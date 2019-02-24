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
import LatteUI from "../index";

Vue.use(LatteUI);

window.addEventListener("DOMContentLoaded", () => new Vue({el: "main#app"}));
