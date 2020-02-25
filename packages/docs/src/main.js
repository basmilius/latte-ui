/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import moment from "moment";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import LatteUI from "../../latte-ui";

import "highlight.js/styles/github-gist.css";
import "@mdi/font/css/materialdesignicons.css";

import "./scss/app.scss";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(LatteUI);

moment.locale("nl");

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
