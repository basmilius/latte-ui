import moment from "moment";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import LatteUI, { Latte } from "../../latte-ui";

import "highlight.js/styles/github-gist.css";
import "@mdi/font/css/materialdesignicons.css";

import "./scss/app.scss";
import "./scss/page.scss";

import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(LatteUI, {
	emojiPath: "/svg/@0.svg"
});
moment.locale("nl");

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");

console.log(`Using Latte UI ${Latte.version} by ${Latte.author.name} and Vue.js ${Vue.version}.`);
