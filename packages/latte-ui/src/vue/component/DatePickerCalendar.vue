<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel datepicker-calendar">

		<div class="panel-header datepicker-calendar-header" :class="[selectedView]">
			<LatteRipple as="button" class="btn btn-icon btn-text m-0" @click="navigate(-1)">
				<Icon name="chevron-left"/>
			</LatteRipple>

			<div class="btn-group mx-auto">
				<LatteRipple as="button" class="btn btn-text" @click="view('months')"><span>{{ moment(monthBeginDate).format("MMMM") }}</span></LatteRipple>
				<LatteRipple as="button" class="btn btn-text" @click="view('years')"><span>{{ moment(monthBeginDate).format("YYYY") }}</span></LatteRipple>
			</div>

			<LatteRipple as="button" class="btn btn-icon btn-text m-0" @click="navigate(1)">
				<Icon name="chevron-right"/>
			</LatteRipple>
		</div>

		<div class="panel-body border-0 datepicker-calendar-dates px-3 pb-3 px-lg-4 pt-0" :class="bodyClass" v-if="selectedView === 'dates'">
			<span class="day" v-for="day of days">{{ day }}</span>

			<template v-for="date of dates">
				<LatteRipple as="button" :key="date.getTime()" :class="getClassesForDate(date)" :disabled="isOtherMonth(date)" @click="select(date)">
					<span>{{ date.getDate() }}</span>
				</LatteRipple>
			</template>
		</div>

		<div class="panel-body border-0 datepicker-calendar-months" v-if="selectedView === 'months'">
			<template v-for="(month, index) in months">
				<LatteRipple as="button" :key="index" :class="getClassesForMonth(index + 1)" :data-month="index + 1" @click="selectMonth(index + 1)">
					{{ month }}
				</LatteRipple>
			</template>
		</div>

		<div class="panel-body border-0 datepicker-calendar-years" v-if="selectedView === 'years'">
			<template v-for="(year, index) in years">
				<LatteRipple as="button" :key="index" :class="getClassesForYear(year)" :data-year="year" @click="selectYear(year)">
					<span>{{ year }}</span>
				</LatteRipple>
			</template>
		</div>

		<slot v-bind="{selectedView}"></slot>

	</div>

</template>

<script>

	import moment from "moment";
	import Icon from "./Icon.vue";

	import { raf } from "../../js/util/dom";
	import LatteRipple from "./Ripple";

	export default {

		components: {LatteRipple, Icon},

		name: "latte-datepicker-calendar",

		inject: ["popup"],

		props: {
			bodyClass: {default: "", type: String},
			maxYear: {default: 2100, type: Number},
			minYear: {default: 1900, type: Number},
			value: {default: () => new Date(), type: Date}
		},

		beforeDestroy()
		{
			if (!this.popup)
				return;

			this.popup.$off("close", this.onPopupClosed);
		},

		data()
		{
			return {
				selectedMonth: 3,
				selectedView: "dates",
				selectedYear: 1996
			};
		},

		mounted()
		{
			if (!this.popup)
				return;

			this.popup.$on("close", this.onPopupClosed);
		},

		computed: {

			dates()
			{
				const value = new Date(this.value);
				value.setFullYear(this.selectedYear);
				value.setMonth(this.selectedMonth - 1);
				value.setDate(1);

				let dates = [];
				let monthDays = this.monthEndDate.date();
				let beforeDates = Math.max(0, this.monthBeginDate.weekday());

				for (let x = beforeDates - 1; x >= 0; x--)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, 0 - x, 0, 0, 0)));

				for (let x = 1; x <= monthDays; x++)
				{
					const date = new Date(value.getTime());
					date.setFullYear(this.selectedYear);
					date.setMonth(this.selectedMonth - 1);
					date.setDate(x);

					dates.push(date);
				}

				const rows = Math.ceil(dates.length / 7);
				const datesToShow = rows * 7;
				let x = 0;

				while (datesToShow > dates.length)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth, ++x, 0, 0, 0)));

				if (Math.ceil(dates.length / 7) < 6)
					for (let i = 0; i < 7; i++)
						dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth, ++x, 0, 0, 0)));

				return dates;
			},

			days()
			{
				return Array.from(Array(7).keys()).map(day => moment().weekday(day).format("dd"));
			},

			monthBeginDate()
			{
				return moment(new Date(this.selectedYear, this.selectedMonth - 1, 1));
			},

			monthEndDate()
			{
				return moment(new Date(this.selectedYear, this.selectedMonth, 0));
			},

			months()
			{
				return Array.from(Array(12).keys()).map(month => moment().month(month).format("MMMM"));
			},

			years()
			{
				const years = [];

				for (let year = this.minYear; year <= this.maxYear; year++)
					years.push(year);

				return years;
			}

		},

		methods: {

			getClassesForDate(date)
			{
				const classes = ["btn"];

				if (this.isToday(date))
					classes.push("font-italic", "font-weight-bold");

				if (this.isSelected(date))
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text");

				return classes;
			},

			getClassesForMonth(month)
			{
				const classes = ["btn", "m-0", "text-capitalize", "w-100"];

				if (parseInt(month) === this.selectedMonth)
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text");

				return classes;
			},

			getClassesForYear(year)
			{
				const classes = ["btn", "m-0", "w-100"];

				if (parseInt(year) === this.selectedYear)
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text");

				return classes;
			},

			isOtherMonth(date)
			{
				return (date.getMonth() + 1) !== this.selectedMonth;
			},

			isSame(date, other)
			{
				if (typeof date === "undefined" || date === null)
					return false;

				if (typeof other === "undefined" || other === null)
					return false;

				return date.getFullYear() === other.getFullYear() && date.getMonth() === other.getMonth() && date.getDate() === other.getDate();
			},

			isSelected(date)
			{
				return this.isSame(date, this.value);
			},

			isToday(date)
			{
				return this.isSame(date, new Date());
			},

			navigate(dir)
			{
				this.selectedMonth += dir;

				if (this.selectedMonth === 13)
				{
					this.selectedMonth = 1;
					this.selectedYear++;
				}

				if (this.selectedMonth === 0)
				{
					this.selectedMonth = 12;
					this.selectedYear--;
				}
			},

			onPopupClosed()
			{
				this.view("dates");
			},

			select(date)
			{
				this.$emit("input", date);
			},

			selectMonth(month)
			{
				this.selectedMonth = parseInt(month);
				this.selectedView = "dates";
			},

			selectYear(year)
			{
				this.selectedYear = parseInt(year);
				this.selectedView = "dates";
			},

			view(view)
			{
				if (this.selectedView === view)
					return this.selectedView = "dates";

				this.selectedView = view;
			}

		},

		watch: {

			selectedView()
			{
				this.$emit("view", this.selectedView);

				raf(() =>
				{
					if (this.selectedView === "months")
						this.$el.querySelector(`[data-month="${this.selectedMonth}"]`).scrollIntoViewIfNeeded();

					if (this.selectedView === "years")
						this.$el.querySelector(`[data-year="${this.selectedYear}"]`).scrollIntoViewIfNeeded();
				});
			},

			value: {
				immediate: true,
				handler()
				{
					this.selectedMonth = this.value.getMonth() + 1;
					this.selectedYear = this.value.getFullYear();
				}
			}

		}

	}

</script>
