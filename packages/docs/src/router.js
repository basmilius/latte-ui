import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

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
					component: Home
				},
				{
					path: "/docs",
					component: () => import("./components/NestedRouterView.vue"),
					children: [
						{
							path: "",
							component: () => import("./views/docs/GettingStarted.vue")
						},
						{
							path: "color",
							component: () => import("./views/docs/Color.vue")
						},
						{
							path: "grid-system",
							component: () => import("./views/docs/GridSystem.vue")
						},
						{
							path: "icons",
							component: () => import("./views/docs/Icons.vue")
						},
						{
							path: "typography",
							component: () => import("./views/docs/Typography.vue")
						},
						{
							path: "utilities",
							component: () => import("./views/docs/Utilities.vue")
						},
						{
							path: "components",
							component: () => import("./components/NestedRouterView.vue"),
							children: [
								{
									path: "app-bar",
									component: () => import("./views/docs/components/AppBar.vue")
								},
								{
									path: "avatar",
									component: () => import("./views/docs/components/Avatar.vue")
								},
								{
									path: "badge",
									component: () => import("./views/docs/components/Badge.vue")
								},
								{
									path: "bottom-nav",
									component: () => import("./views/docs/components/BottomNav.vue")
								},
								{
									path: "button",
									component: () => import("./views/docs/components/Button.vue")
								},
								{
									path: "chat",
									component: () => import("./views/docs/components/Chat.vue")
								},
								{
									path: "datatable",
									component: () => import("./views/docs/components/Datatable.vue")
								},
								{
									path: "expandable",
									component: () => import("./views/docs/components/Expandable.vue")
								},
								{
									path: "form-elements",
									component: () => import("./views/docs/components/FormElements.vue")
								},
								{
									path: "list",
									component: () => import("./views/docs/components/List.vue")
								},
								{
									path: "message",
									component: () => import("./views/docs/components/Message.vue")
								},
								{
									path: "nav",
									component: () => import("./views/docs/components/Nav.vue")
								},
								{
									path: "notice",
									component: () => import("./views/docs/components/Notice.vue")
								},
								{
									path: "notification",
									component: () => import("./views/docs/components/Notification.vue")
								},
								{
									path: "overlay",
									component: () => import("./views/docs/components/Overlay.vue")
								},
								{
									path: "pagination",
									component: () => import("./views/docs/components/Pagination.vue")
								},
								{
									path: "panel",
									component: () => import("./views/docs/components/Panel.vue")
								},
								{
									path: "popup",
									component: () => import("./views/docs/components/Popup.vue")
								},
								{
									path: "portal",
									component: () => import("./views/docs/components/Portal.vue")
								},
								{
									path: "progress",
									component: () => import("./views/docs/components/Progress.vue")
								},
								{
									path: "question",
									component: () => import("./views/docs/components/Question.vue")
								},
								{
									path: "ripple",
									component: () => import("./views/docs/components/Ripple.vue")
								},
								{
									path: "sheet",
									component: () => import("./views/docs/components/Sheet.vue")
								},
								{
									path: "snackbar",
									component: () => import("./views/docs/components/Snackbar.vue")
								},
								{
									path: "spinner",
									component: () => import("./views/docs/components/Spinner.vue")
								},
								{
									path: "swiper",
									component: () => import("./views/docs/components/Swiper.vue")
								},
								{
									path: "tabs",
									component: () => import("./views/docs/components/Tabs.vue")
								},
								{
									path: "window",
									component: () => import("./views/docs/components/Window.vue")
								}
							]
						}
					]
				},
				{
					path: "/block-editor",
					component: () => import("./views/BlockEditor.vue")
				},
				{
					path: "/tests",
					component: () => import("./views/Tests.vue")
				}
			]
		},
		{
			path: "/examples",
			component: () => import("./components/NestedRouterView.vue"),
			children: [
				{
					path: "news",
					component: () => import("./views/examples/news/App.vue"),
					children: [
						{
							path: "",
							component: () => import("./views/examples/news/Frontpage.vue")
						}
					]
				},
				{
					path: "scaffolding",
					component: () => import("./views/examples/scaffolding/App.vue")
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
