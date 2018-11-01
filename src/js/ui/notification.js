/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { on } from "../actions.js";

export function initialize()
{
	Vue.component("latte-notifications", {

		template: `	<div id="notification-center">

						<div v-for="notification in notifications" class="notification" :ref="'notification_' + notification.id" :class="getNotificationClasses(notification)" :style="{'top': notification.top + 'px'}">
							<img class="avatar" :src="notification.avatar" v-if="notification.avatar"/>
							<div class="notification-icon" v-if="notification.type"><i class="mdi"></i></div>
							<div class="notification-content">
								<div class="notification-body">
									<span class="notification-title" v-if="notification.title">{{ notification.title }}</span>
									<span class="notification-text" v-if="notification.message">{{ notification.message }}</span>
								</div>
								<div class="notification-actions" v-if="notification.actions">
									<button v-for="a in notification.actions" @click="remove(notification.id)" :data-action="a.action" v-bind="makeParams(a.params || {})" class="btn btn-text" :class="'btn-' + (a.type || 'primary')"><span>{{ a.label }}</span></button>
								</div>
							</div>
						</div>

					</div>`,

		data()
		{
			return {
				notifications: []
			};
		},

		mounted()
		{
			on("latte:notification", data => this.createNotification(data));
		},

		methods: {

			createNotification(data)
			{
				data.id = (this.notifications.map(n => n.id).sort((a, b) => b - a)[0]) + 1;

				if (isNaN(data.id))
					data.id = 0;

				data.delay = data.delay || 3000;
				data.shown = false;
				data.top = 0;

				this.notifications.unshift(data);
				setTimeout(() => this.show(data.id), 50);

				if (data.delay > -1)
					setTimeout(() => this.remove(data.id), data.delay + 50);

				let audio = new Audio();
				audio.setAttribute("src", data.sound || "/resource/sound/notification/pipes.ogg");
				audio.setAttribute("preload", "auto");
				audio.volume = 1;
				audio.currentTime = 0;
				audio.play().then();
			},

			getNotificationClasses(notification)
			{
				const classes = [];

				if (!notification.shown)
					classes.push("is-hidden");

				if (notification.type)
					classes.push(`notification-${notification.type}`);

				return classes;
			},

			makeParams(params)
			{
				const result = {};

				for (let param in params)
					if (params.hasOwnProperty(param))
						result[`data-${param}`] = params[param];

				return result;
			},

			remove(id)
			{
				let n = this.notifications.find(n => n.id === id);

				if (!n)
					return;

				n.shown = false;

				setTimeout(() => this.notifications = this.notifications.filter(n => n.id !== id), 360);
			},

			show(id)
			{
				let n = this.notifications.find(n => n.id === id);
				n.shown = true;

				this.updatePositions();
			},

			updatePositions()
			{
				let notifications = this.notifications.filter(n => n.shown);
				let top = 84;

				for (let i = notifications.length - 1; i >= 0; i--)
				{
					let notification = notifications[i];

					notification.top = top;

					top += this.$refs[`notification_${notification.id}`][0].getBoundingClientRect().height + 24;
				}
			}

		},

		watch: {

			notifications()
			{
				this.$nextTick(() => this.updatePositions());
			}

		}

	});
}
