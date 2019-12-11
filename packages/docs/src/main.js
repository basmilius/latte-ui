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

Vue.use(LatteUI, {
	emojiEnabled: false,
	emojiPath: "/svg/@0.svg"
});

moment.locale("nl");

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
