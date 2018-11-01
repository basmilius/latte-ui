/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { timeout } from "../util/core.js";

/**
 * Creates the latte-widget-today widget.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createWidget()
{

	Vue.component("latte-widget-today", {

		props: {

			widgetId: {
				required: true,
				type: Number
			}

		},

		template: ` <latte-widget class="widget-today" v-bind="$props" :custom-body="true" @remove="onRemove($event)">
						<div class="widget-today-datetime" slot="content">
							<div class="date">
								<span class="day text-capitalize">{{ currentDay }}</span>
								<span class="date">{{ currentDate }}</span>
								<span class="monthyear text-capitalize">{{ currentMonth }} {{ currentYear }} &mdash; Week {{ currentWeekNumber }}</span>
							</div>
							<div class="time">
								<span id="hours">{{ currentTimeHours }}</span><span class="dots">:</span><span id="minutes">{{ currentTimeMinutes }}</span><span id="seconds"><span class="dots">:</span>{{ currentTimeSeconds }}</span>
							</div>
						</div>
					</latte-widget>`,

		data()
		{
			return {
				currentDate: "",
				currentDay: "",
				currentMonth: "",
				currentYear: "",
				currentTimeHours: "",
				currentTimeMinutes: "",
				currentTimeSeconds: "",
				currentWeekNumber: ""
			}
		},

		mounted()
		{
			this.update();
		},

		methods: {

			update()
			{
				let now = moment();

				this.currentDate = now.format("D");
				this.currentDay = now.format("dddd");
				this.currentMonth = now.format("MMMM");
				this.currentYear = now.format("YYYY");
				this.currentTimeHours = now.format("HH");
				this.currentTimeMinutes = now.format("mm");
				this.currentTimeSeconds = now.format("ss");
				this.currentWeekNumber = now.week();

				timeout(250, () => this.update());
			}

		}

	});

}
