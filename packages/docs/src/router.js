import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	linkActiveClass: "is-not-really-active",
	linkExactActiveClass: "is-active",
	routes: [
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
							path: "dropdown-button",
							component: () => import("./views/docs/components/DropdownButton.vue")
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
							path: "offscreen-container",
							component: () => import("./views/docs/components/OffscreenContainer.vue")
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
							path: "ripple",
							component: () => import("./views/docs/components/Ripple.vue")
						},
						{
							path: "spinner",
							component: () => import("./views/docs/components/Spinner.vue")
						},
						{
							path: "tabs",
							component: () => import("./views/docs/components/Tabs.vue")
						}
					]
				},
				{
					path: "layout",
					component: () => import("./components/NestedRouterView.vue"),
					children: [
						{
							path: "grid-system",
							component: () => import("./views/docs/layout/GridSystem.vue")
						},
						{
							path: "typography",
							component: () => import("./views/docs/layout/Typography.vue")
						},
						{
							path: "utilities",
							component: () => import("./views/docs/layout/Utilities.vue")
						},
						{
							path: "variables",
							component: () => import("./views/docs/layout/Variables.vue")
						}
					]
				}
			]
		},
		{
			path: "/examples",
			component: () => import("./components/NestedRouterView.vue"),
			children: [
				{
					path: "",
					redirect: "/examples/app-contacts"
				},
				{
					path: "app-contacts",
					component: () => import("./views/examples/AppContacts.vue")
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
	Latte.actions.dispatch("latte-docs:navigate", {to, from});
	window.scrollTo({top: 0});
	next();
});

router.afterEach((to, from) =>
{
	Latte.actions.dispatch("latte-docs:navigated", {to, from});
});

export default router;
