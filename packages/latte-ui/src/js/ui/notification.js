/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

import { on } from "../core/action";
import { id } from "../core/api";
import { conditionalRender, createElement, eachRender, getLattePath, raf } from "../util/dom";
import { getMainElement, icon } from "../core";
import { applyZ } from "../core/z";

const defaultOptions = {
	duration: 3000,
	sound: "default"
};

const notifications = [];

let lastY = 0;

const Notification = Vue.extend({

	props: {

		options: {
			default: () => ({}),
			required: true,
			type: Object
		},

		resolve: {
			required: true,
			type: Function
		}

	},

	created()
	{
		notifications.push(this);
	},

	data()
	{
		return {
			closing: false,
			opening: true,
			timer: 0,
			y: 0,
			z: 0
		};
	},

	destroyed()
	{
		notifications.splice(notifications.indexOf(this), 1);
	},

	render(h)
	{
		return h("div", {class: this.notificationClasses, style: this.notificationStyles}, [
			conditionalRender(this.options.avatar && typeof this.options.avatar === "function", () => this.options.avatar(h)),
			conditionalRender(this.options.avatar && typeof this.options.avatar === "string", () => h("img", {attrs: {src: this.options.avatar}, class: ["avatar"]})),
			conditionalRender(this.options.icon, () => h("div", {class: ["notification-icon"]}, [
				icon(this.options.icon, h)
			])),
			h("div", {class: ["notification-content"]}, [
				h("div", {class: ["notification-body"]}, [
					conditionalRender(this.options.title, () => h("span", {class: ["notification-title"], domProps: {innerHTML: this.options.title}})),
					conditionalRender(this.options.message, () => h("span", {class: ["notification-text"], domProps: {innerHTML: this.options.message}}))
				]),
				conditionalRender(this.options.buttons && this.options.buttons.length > 0, () => h("div", {class: ["notification-actions"]}, [
					...eachRender(this.options.buttons, button => h("latte-ripple", {
						attrs: makeParams(button.params),
						props: {
							as: "button"
						},
						class: ["btn", "btn-text", `btn-${button.color || "dark"}`],
						on: {
							click: () => this.close.call(this, button.id)
						}
					}, [
						conditionalRender(button.icon, () => icon(button.icon, h)),
						h("span", {}, button.label)
					]))
				]))
			])
		])
	},

	computed: {

		notificationClasses()
		{
			const classes = ["notification", `notification-${this.options.color || "primary"}`, "is-app-notification"];

			if (this.closing)
				classes.push("is-closing");

			if (this.opening)
				classes.push("is-opening");

			return classes;
		},

		notificationStyles()
		{
			return {
				top: `calc(24px + ${this.y}px)`,
				zIndex: this.z
			};
		}

	},

	methods: {

		close(buttonId = undefined)
		{
			this.resolve(buttonId);

			if (this.timer !== 0)
				clearTimeout(this.timer);

			this.closing = true;
			this.timer = 0;
			updatePositions();

			raf(() => this.$emit("delete-me"), 420);
		},

		closeByTimer()
		{
			this.timer = 0;
			this.close();
		},

		open()
		{
			applyZ(z => this.z = z);
			updatePositions();

			raf(() => raf(() => this.opening = false));

			if (this.options.duration > 0)
				this.timer = setTimeout(() => this.closeByTimer(), this.options.duration);

			if (this.options.sound)
			{
				let audio = new Audio();
				audio.setAttribute("src", this.options.sound);
				audio.setAttribute("preload", "auto");
				audio.volume = 1;
				audio.currentTime = 0;
				audio.play().catch(err => console.error(err));
			}
		}

	}

});

export function create(options = {})
{
	options = Object.assign({}, defaultOptions, options);
	options.id = options.id || id();

	if (options.sound === "default")
	{
		let lattePath = getLattePath();

		if (lattePath === "/")
			lattePath = "";

		options.sound = (lattePath !== null ? `${lattePath}/sound/notification.ogg` : null);
	}

	return new Promise(resolve =>
	{
		const mount = createElement("div");
		const notification = new Notification({
			data: {
				y: lastY
			},
			propsData: {
				options,
				resolve
			}
		});

		getMainElement().appendChild(mount);
		notification.$mount(mount);

		notification.open();
		notification.$on("delete-me", () =>
		{
			notification.$destroy();
			getMainElement().removeChild(notification.$el);
		});
	});
}

export function initializeNotifications()
{
	on("latte:notification", data => create(data));
}

function makeParams(params)
{
	const result = {};

	for (let param in params)
		if (params.hasOwnProperty(param))
			result[`data-${param}`] = params[param];

	return result;
}

function updatePositions()
{
	raf(() =>
	{
		let y = 0;

		for (let i = 0; i < notifications.length; i++)
		{
			let notification = notifications[i];

			if (notification.closing)
				continue;

			notification.y = y;

			y += notification.$el.getBoundingClientRect().height + 24;
		}

		lastY = y;
	});
}

export default {
	create
};
