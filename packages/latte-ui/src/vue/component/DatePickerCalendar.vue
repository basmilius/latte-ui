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

		<div class="panel-header border-0 datepicker-calendar-header" :class="[selectedView]">
			<latte-ripple as="button" class="btn btn-icon btn-text btn-dark m-0 ml-1" @click="navigate(-1)"><i class="mdi mdi-chevron-left"></i></latte-ripple>

			<div class="btn-group mx-auto">
				<latte-ripple as="button" class="btn btn-text btn-dark" @click="view('months')"><span>{{ moment(monthBeginDate).format("MMMM") }}</span></latte-ripple>
				<latte-ripple as="button" class="btn btn-text btn-dark" @click="view('years')"><span>{{ moment(monthBeginDate).format("YYYY") }}</span></latte-ripple>
			</div>

			<latte-ripple as="button" class="btn btn-icon btn-text btn-dark m-0 mr-1" @click="navigate(1)"><i class="mdi mdi-chevron-right"></i></latte-ripple>
		</div>

		<div class="panel-body datepicker-calendar-dates pt-0" :class="bodyClass" v-if="selectedView === 'dates'">
			<span class="day" v-for="day of days">{{ day }}</span>

			<template v-for="(date, index) of dates">
				<latte-ripple as="button" :key="index" :class="getClassesForDate(date)" :disabled="isOtherMonth(date)" @click="select(date)">
					<span>{{ date.getDate() }}</span>
				</latte-ripple>
			</template>
		</div>

		<div class="panel-body datepicker-calendar-months" v-if="selectedView === 'months'">
			<template v-for="(month, index) in months">
				<latte-ripple as="button" :key="index" :class="getClassesForMonth(index + 1)" :data-month="index + 1" @click="selectMonth(index + 1)">
					{{ month }}
				</latte-ripple>
			</template>
		</div>

		<div class="panel-body datepicker-calendar-years" v-if="selectedView === 'years'">
			<template v-for="(year, index) in years">
				<latte-ripple as="button" :key="index" :class="getClassesForYear(year)" :data-year="year" @click="selectYear(year)">
					<span>{{ year }}</span>
				</latte-ripple>
			</template>
		</div>

	</div>

</template>

<script>

	import { raf } from "../../js/util/dom";

	export default {

		name: "latte-datepicker-calendar",

		props: {
			bodyClass: {default: "", type: String},
			value: {default: () => new Date(), type: Date}
		},

		data()
		{
			return {
				selectedMonth: 3,
				selectedView: "dates",
				selectedYear: 1996
			};
		},

		computed: {

			dates()
			{
				let dates = [];
				let monthDays = this.monthEndDate.getDate();
				let beforeDates = Math.max(0, this.monthBeginDate.getDay() - 1);

				for (let x = beforeDates - 1; x >= 0; x--)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, 0 - x, 0, 0, 0)));

				for (let x = 1; x <= monthDays; x++)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, x, 0, 0, 0)));

				const rows = Math.ceil(dates.length / 7);
				const datesToShow = rows * 7;
				let x = 0;

				while (datesToShow > dates.length)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth, ++x, 0, 0, 0)));

				return dates;
			},

			days()
			{
				return Array.from(Array(7).keys()).map(day => this.moment().isoWeekday(day + 1).format("dd"));
			},

			monthBeginDate()
			{
				return new Date(this.selectedYear, this.selectedMonth - 1, 1);
			},

			monthEndDate()
			{
				return new Date(this.selectedYear, this.selectedMonth, 0);
			},

			months()
			{
				return Array.from(Array(12).keys()).map(month => this.moment().month(month).format("MMMM"));
			},

			years()
			{
				const years = [];

				for (let year = 1900; year <= 2100; year++)
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
					classes.push("btn-text", "btn-dark");

				return classes;
			},

			getClassesForMonth(month)
			{
				const classes = ["btn", "m-0", "text-capitalize", "w-100"];

				if (parseInt(month) === this.selectedMonth)
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text", "btn-dark");

				return classes;
			},

			getClassesForYear(year)
			{
				const classes = ["btn", "m-0", "w-100"];

				if (parseInt(year) === this.selectedYear)
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text", "btn-dark");

				return classes;
			},

			isOtherMonth(date)
			{
				return (date.getMonth() + 1) !== this.selectedMonth;
			},

			isSame(date, other)
			{
				if (typeof date === 'undefined' || date === null)
					return false;

				if (typeof other === 'undefined' || other === null)
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
