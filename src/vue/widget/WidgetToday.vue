<!--
  - Copyright © 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-widget class="widget-today" v-bind="$props" :custom-body="true" @remove="onRemove">
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
	</latte-widget>

</template>

<script>

	import { timeout } from "../../js/core";

	export default {

		name: "latte-widget-today",

		props: {

			widgetId: {
				required: true,
				type: Number
			}

		},

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

			onRemove(evt)
			{
				this.$emit("remove", evt);
			},

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

	}

</script>
