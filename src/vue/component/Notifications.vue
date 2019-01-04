<!--
  - Copyright © 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div id="notification-center">

		<template v-for="notification in notifications">

			<div class="notification" :key="notification.id" :class="getNotificationClasses(notification)" :style="getNotificationStyles(notification)" ref="notification">
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

		</template>

	</div>

</template>

<script>

	import { on } from "../../js/actions";
	import { timeout } from "../../js/core";
	import { getLattePath, raf } from "../../js/util/dom";
	import { needsZIndex } from "../../js/z";

	export default {

		name: "latte-notifications",

		data()
		{
			return {
				lastTop: 84,
				notifications: []
			};
		},

		mounted()
		{
			on("latte:notification", data =>
			{
				if (data.title)
					data.title = decodeURIComponent(data.title);

				if (data.message)
					data.message = decodeURIComponent(data.message);

				this.createNotification(data);
			});
		},

		methods: {

			createNotification(data)
			{
				data.id = (this.notifications.map(n => n.id).sort((a, b) => b - a)[0]) + 1;

				if (isNaN(data.id))
					data.id = 0;

				data.delay = data.delay || 3000;
				data.closing = false;
				data.opening = true;
				data.top = this.lastTop;

				needsZIndex(z => data.z = z);

				this.notifications.push(data);
				this.show(data.id);

				if (data.delay > -1)
					timeout(data.delay, () => this.remove(data.id));

				const lattePath = getLattePath();
				const soundUri = data.sound || (lattePath !== null ? `${lattePath}/sound/notification/pipes.ogg` : null);

				if (soundUri === null)
					return;

				let audio = new Audio();
				audio.setAttribute("src", soundUri);
				audio.setAttribute("preload", "auto");
				audio.volume = 1;
				audio.currentTime = 0;
				audio.play().catch(() =>
				{
				});
			},

			getNotificationClasses(notification)
			{
				const classes = [];

				if (notification.closing)
					classes.push("is-closing");

				if (notification.opening)
					classes.push("is-opening");

				if (notification.type)
					classes.push(`notification-${notification.type}`);

				return classes;
			},

			getNotificationStyles(notification)
			{
				return {
					top: `${notification.top}px`,
					zIndex: notification.z
				};
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

				n.closing = true;

				this.updatePositions();
				timeout(420, () => this.notifications = this.notifications.filter(n => n.id !== id));
			},

			show(id)
			{
				let n = this.notifications.find(n => n.id === id);

				this.updatePositions();
				raf(() => n.opening = false);
			},

			updatePositions()
			{
				raf(() =>
				{
					let top = 84;

					for (let i = 0; i < this.notifications.length; i++)
					{
						let notification = this.notifications[i];

						if (notification.closing)
							continue;

						notification.top = top;

						top += this.$refs.notification[0].getBoundingClientRect().height + 24;
					}

					this.lastTop = top;
				});
			}

		},

		watch: {

			notifications()
			{
				this.updatePositions();
			}

		}

	}

</script>
