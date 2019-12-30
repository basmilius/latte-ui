import Vue from "vue";
import Router from "vue-router";

import { Latte } from "../../latte-ui";

Vue.use(Router);

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	linkActiveClass: "is-not-really-active",
	linkExactActiveClass: "is-active",
	routes: [
		{
			path: "/",
			component: () => import("./views/Skeleton.vue"),
			children: [
				{
					path: "/",
					component: () => import("./views/Home.vue")
				},
				{
					path: "/getting-started",
					component: () => import("./views/NestedView.vue"),
					children: [
						{
							path: "/",
							component: () => import("./views/getting-started/Index.vue")
						}
					]
				},
				{
					path: "/components",
					component: () => import("./views/NestedView.vue"),
					children: [
						{
							path: "/",
							component: () => import("./views/components/Index.vue")
						},
						{
							path: "app-bar",
							component: () => import("./views/components/AppBar.vue")
						},
						{
							path: "avatar",
							component: () => import("./views/components/Avatar.vue")
						},
						{
							path: "badge",
							component: () => import("./views/components/Badge.vue")
						}
					]
				},
				{
					path: "*",
					component: () => import("./views/NotFound.vue")
				}
			]
		},
		{
			path: "*",
			component: () => import("./views/NotFound.vue")
		}
	]
});

router.beforeEach((to, from, next) =>
{
	Latte.action.dispatch("latte-docs:navigate", {to, from});
	window.scrollTo({top: 0});
	next();
});

router.afterEach((to, from) =>
{
	Latte.action.dispatch("latte-docs:navigated", {to, from});
});

export default router;
