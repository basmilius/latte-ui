/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

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
					path: "/block-editor",
					component: () => import("./views/BlockEditor.vue")
				},
				{
					path: "/tests",
					component: () => import("./views/Tests.vue")
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
						},
						{
							path: "bottom-nav",
							component: () => import("./views/components/BottomNav.vue")
						},
						{
							path: "button",
							component: () => import("./views/components/Button.vue")
						},
						{
							path: "chat",
							component: () => import("./views/components/Chat.vue")
						},
						{
							path: "datatable",
							component: () => import("./views/components/Datatable.vue")
						},
						{
							path: "expandable",
							component: () => import("./views/components/Expandable.vue")
						},
						{
							path: "form-elements",
							component: () => import("./views/components/FormElements.vue")
						},
						{
							path: "list",
							component: () => import("./views/components/List.vue")
						},
						{
							path: "nav",
							component: () => import("./views/components/Nav.vue")
						},
						{
							path: "notice",
							component: () => import("./views/components/Notice.vue")
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
