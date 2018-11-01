/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Creates the latte-datepicker component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{
	Vue.component("latte-datepicker", {

		props: {

			id: {
				type: String,
				required: true
			},

			name: {
				type: String,
				required: true
			},

			placeholder: {
				type: String,
				default: 'Selecteer datum&hellip;'
			},

			value: {
				type: Date,
				required: false,
				default()
				{
					return new Date()
				}
			}

		},

		template: ` <div class="latte-datepicker-root" :class="{'is-open': is_picker_opened}">

						<input readonly @focus="open()" type="date" :name="name" :id="id" :value="current_date_str" :placeholder="placeholder" :title="placeholder" @keydown.esc="close()" class="form-control" />
				
						<div class="latte-datepicker-picker" v-click-away="close">
							<div class="picker-top">
								<button class="picker-top-nav picker-top-nav-previous" type="button" @click="previousMonth()"><i class="mdi mdi-chevron-left"></i></button>
								<span class="month" @click="toggleYear()">{{ current_month_str }}</span>
								<span class="year" @click="toggleYears()">{{ current_year_str }}</span>
								<button class="picker-top-nav picker-top-nav-next" type="button" @click="nextMonth()"><i class="mdi mdi-chevron-right"></i></button>
							</div>
				
							<div class="picker-month-view" v-if="current_view === 'month'">
								<div class="picker-view-days">
									<div class="day">ma</div>
									<div class="day">di</div>
									<div class="day">wo</div>
									<div class="day">do</div>
									<div class="day">vr</div>
									<div class="day">za</div>
									<div class="day">zo</div>
								</div>
				
								<div class="picker-view-dates">
									<template v-for="date of dates">
										<div class="date" :class="{'is-other-month': isOtherMonth(date), 'is-selected': isSelected(date), 'is-today': isToday(date)}" @click="select(date)">{{ date.getDate() }}</div>
									</template>
								</div>
							</div>
				
							<div class="picker-year-view" v-if="current_view === 'year'">
								<div class="picker-view-months">
				
									<div class="month" v-for="(month, index) in months" :class="{'is-selected': index === current_month - 1}" @click="selectMonth(index + 1)">{{ month }}</div>
				
								</div>
							</div>
				
							<div class="picker-years-view" v-if="current_view === 'years'">
								<div class="picker-view-years">
				
									<div class="year" v-for="year in years" :class="{'is-selected': year === current_year}" @click="selectYear(year)">{{ year }}</div>
				
								</div>
							</div>
						</div>
				
					</div>`,

		/**
		 * Provides the initial data for Vue.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				current: this.value,
				current_date: 0,
				current_month: 0,
				current_year: 0,
				current_view: 'month',
				is_picker_opened: false,
				may_close: true,

				days: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
				months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
				years: []
			};
		},

		/**
		 * Invoked when our component is mounted by Vue.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			this.current_date = this.current.getDate();
			this.current_month = this.current.getMonth() + 1;
			this.current_year = this.current.getFullYear();

			this.years = [];

			for (let year = 1970; year <= 2100; year++)
				this.years.push(year);
		},

		/**
		 * Invoked when the DOM is updated by Vue.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		updated()
		{
			if (this.current_view === 'year')
			{
				let months = this.$el.querySelector('div.picker-view-months');
				let month = months.querySelector('.is-selected');

				if (typeof month["scrollIntoViewIfNeeded"] !== "undefined")
				{
					month["scrollIntoViewIfNeeded"]();
				}
			}

			if (this.current_view === 'years')
			{
				let years = this.$el.querySelector('div.picker-view-years');
				let year = years.querySelector('.is-selected');

				if (typeof year["scrollIntoViewIfNeeded"] !== "undefined")
				{
					year["scrollIntoViewIfNeeded"]();
				}
			}
		},

		computed: {

			/**
			 * Computes the current date string.
			 *
			 * @returns {*}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			current_date_str()
			{
				return moment(this.current).format('YYYY-MM-DD');
			},

			/**
			 * Computes the current month string.
			 *
			 * @returns {String}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			current_month_str()
			{
				return this.months[this.current_month - 1];
			},

			/**
			 * Computes the current year string.
			 *
			 * @returns {String}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			current_year_str()
			{
				return this.current_year;
			},

			/**
			 * Computes the available dates in month view.
			 *
			 * @returns {Array<Date>}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			dates()
			{
				let dateBegin = new Date(this.current_year, this.current_month - 1, 1);
				let dateEnd = new Date(this.current_year, this.current_month, 0);

				let dayBegin = this.getDayName(dateBegin.getDay());
				let dayEnd = this.getDayName(dateEnd.getDay());

				let dates = [];
				let monthDays = dateEnd.getDate();

				let beforeDates = Math.max(this.days.indexOf(dayBegin), 0);
				let afterDates = Math.max(this.days.length - this.days.indexOf(dayEnd) - 1, 0);

				for (let x = beforeDates - 1; x >= 0; x--)
					dates.push(new Date(Date.UTC(this.current_year, this.current_month - 1, 0 - x, 0, 0, 0)));

				for (let x = 1; x <= monthDays; x++)
					dates.push(new Date(Date.UTC(this.current_year, this.current_month - 1, x, 0, 0, 0)));

				for (let x = 1; x <= afterDates; x++)
					dates.push(new Date(Date.UTC(this.current_year, this.current_month, x, 0, 0, 0)));

				return dates;
			}

		},

		methods: {

			/**
			 * Gets the name for a day.
			 *
			 * @param {Number} dayNum
			 *
			 * @returns {String}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			getDayName(dayNum)
			{
				return this.days[(dayNum === 0 ? 7 : dayNum) - 1 % this.days.length];
			},

			/**
			 * Returns TRUE if {@see date} is inside another month.
			 *
			 * @param {Date} date
			 *
			 * @returns {Boolean}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			isOtherMonth(date)
			{
				return (date.getMonth() + 1) !== this.current_month;
			},

			/**
			 * Returns TRUE if {@see date} and {@see other} are the same.
			 *
			 * @param {Date} date
			 * @param {Date} other
			 *
			 * @returns {Boolean}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			isSame(date, other)
			{
				if (typeof date === 'undefined' || date === null)
					return false;

				if (typeof other === 'undefined' || other === null)
					return false;

				return date.getFullYear() === other.getFullYear() && date.getMonth() === other.getMonth() && date.getDate() === other.getDate();
			},

			/**
			 * Returns TRUE if {@see date} is selected.
			 *
			 * @param {Date} date
			 *
			 * @returns {Boolean}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			isSelected(date)
			{
				return this.isSame(date, this.current);
			},

			/**
			 * Returns TRUE if {@see date} is today.
			 *
			 * @param {Date} date
			 *
			 * @returns {Boolean}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			isToday(date)
			{
				return this.isSame(date, new Date());
			},

			/**
			 * Navigates to the next month.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			nextMonth()
			{
				this.current_month++;

				if (this.current_month > 12)
				{
					this.current_month = 1;
					this.current_year++;
				}
			},

			/**
			 * Navigates to the previous month.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			previousMonth()
			{
				this.current_month--;

				if (this.current_month < 1)
				{
					this.current_month = 12;
					this.current_year--;
				}
			},

			/**
			 * Closes the picker dialog.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			close()
			{
				if (!this.may_close)
					return this.may_close = true;

				this.is_picker_opened = false;
			},

			/**
			 * Opens the picker dialog.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			open()
			{
				this.may_close = false;
				this.is_picker_opened = true;
			},

			/**
			 * Selects a date.
			 *
			 * @param {Date} date
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			select(date)
			{
				this.current = date;
				this.current_date = this.current.getDate();
				this.current_month = this.current.getMonth() + 1;
				this.current_year = this.current.getFullYear();

				this.$emit("input", this.current);

				this.close();
			},

			/**
			 * Selects a month.
			 *
			 * @param {Number} month
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			selectMonth(month)
			{
				this.current_month = month;
				this.current_view = 'month';
			},

			/**
			 * Selects a year.
			 *
			 * @param {Number} year
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			selectYear(year)
			{
				this.current_year = year;
				this.current_view = 'month';
			},

			/**
			 * Toggles the months view.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			toggleYear()
			{
				this.current_view = this.current_view === 'year' ? 'month' : 'year';
			},

			/**
			 * Toggles the years view.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			toggleYears()
			{
				this.current_view = this.current_view === 'years' ? 'month' : 'years';
			}

		},

		watch: {

			value()
			{
				this.current = this.value;
				this.current_date = this.current.getDate();
				this.current_month = this.current.getMonth() + 1;
				this.current_year = this.current.getFullYear();
			}

		}

	});
}
