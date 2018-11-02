<template>

	<div class="latte-datepicker-root" :class="{'is-open': isPickerOpened}">

		<input readonly @focus="open()" type="date" :name="name" :id="id" :value="currentDateString" :placeholder="placeholder" :title="placeholder" @keydown.esc="close()" class="form-control" />

		<div class="latte-datepicker-picker" v-click-away="close">
			<div class="picker-top">
				<button class="picker-top-nav picker-top-nav-previous" type="button" @click="previousMonth()"><i class="mdi mdi-chevron-left"></i></button>
				<span class="month" @click="toggleYear()">{{ currentMonthString }}</span>
				<span class="year" @click="toggleYears()">{{ currentYearString }}</span>
				<button class="picker-top-nav picker-top-nav-next" type="button" @click="nextMonth()"><i class="mdi mdi-chevron-right"></i></button>
			</div>

			<div class="picker-month-view" v-if="currentView === 'month'">
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

			<div class="picker-year-view" v-if="currentView === 'year'">
				<div class="picker-view-months">

					<div class="month" v-for="(month, index) in months" :class="{'is-selected': index === currentMonth - 1}" @click="selectMonth(index + 1)">{{ month }}</div>

				</div>
			</div>

			<div class="picker-years-view" v-if="currentView === 'years'">
				<div class="picker-view-years">

					<div class="year" v-for="year in years" :class="{'is-selected': year === currentYear}" @click="selectYear(year)">{{ year }}</div>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	export default {

		name: "latte-date-picker",

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

		data()
		{
			return {
				current: this.value,
				currentDate: 0,
				currentMonth: 0,
				currentYear: 0,
				currentView: 'month',
				isClosable: true,
				isPickerOpened: false,

				days: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
				months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
				years: []
			};
		},

		mounted()
		{
			this.currentDate = this.current.getDate();
			this.currentMonth = this.current.getMonth() + 1;
			this.currentYear = this.current.getFullYear();

			this.years = [];

			for (let year = 1970; year <= 2100; year++)
				this.years.push(year);
		},

		updated()
		{
			if (this.currentView === 'year')
			{
				let months = this.$el.querySelector('div.picker-view-months');
				let month = months.querySelector('.is-selected');

				if (typeof month["scrollIntoViewIfNeeded"] !== "undefined")
					month["scrollIntoViewIfNeeded"]();
			}

			if (this.currentView === 'years')
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

			currentDateString()
			{
				return moment(this.current).format('YYYY-MM-DD');
			},

			currentMonthString()
			{
				return this.months[this.currentMonth - 1];
			},

			currentYearString()
			{
				return this.currentYear;
			},

			dates()
			{
				let dateBegin = new Date(this.currentYear, this.currentMonth - 1, 1);
				let dateEnd = new Date(this.currentYear, this.currentMonth, 0);

				let dayBegin = this.getDayName(dateBegin.getDay());
				let dayEnd = this.getDayName(dateEnd.getDay());

				let dates = [];
				let monthDays = dateEnd.getDate();

				let beforeDates = Math.max(this.days.indexOf(dayBegin), 0);
				let afterDates = Math.max(this.days.length - this.days.indexOf(dayEnd) - 1, 0);

				for (let x = beforeDates - 1; x >= 0; x--)
					dates.push(new Date(Date.UTC(this.currentYear, this.currentMonth - 1, 0 - x, 0, 0, 0)));

				for (let x = 1; x <= monthDays; x++)
					dates.push(new Date(Date.UTC(this.currentYear, this.currentMonth - 1, x, 0, 0, 0)));

				for (let x = 1; x <= afterDates; x++)
					dates.push(new Date(Date.UTC(this.currentYear, this.currentMonth, x, 0, 0, 0)));

				return dates;
			}

		},

		methods: {

			getDayName(dayNum)
			{
				return this.days[(dayNum === 0 ? 7 : dayNum) - 1 % this.days.length];
			},

			isOtherMonth(date)
			{
				return (date.getMonth() + 1) !== this.currentMonth;
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
				return this.isSame(date, this.current);
			},

			isToday(date)
			{
				return this.isSame(date, new Date());
			},

			nextMonth()
			{
				this.currentMonth++;

				if (this.currentMonth > 12)
				{
					this.currentMonth = 1;
					this.currentYear++;
				}
			},

			previousMonth()
			{
				this.currentMonth--;

				if (this.currentMonth < 1)
				{
					this.currentMonth = 12;
					this.currentYear--;
				}
			},

			close()
			{
				if (!this.isClosable)
					return this.isClosable = true;

				this.isPickerOpened = false;
			},

			open()
			{
				this.isClosable = false;
				this.isPickerOpened = true;
			},

			select(date)
			{
				this.current = date;
				this.currentDate = this.current.getDate();
				this.currentMonth = this.current.getMonth() + 1;
				this.currentYear = this.current.getFullYear();

				this.$emit("input", this.current);

				this.close();
			},

			selectMonth(month)
			{
				this.currentMonth = month;
				this.currentView = 'month';
			},

			selectYear(year)
			{
				this.currentYear = year;
				this.currentView = 'month';
			},

			toggleYear()
			{
				this.currentView = this.currentView === 'year' ? 'month' : 'year';
			},

			toggleYears()
			{
				this.currentView = this.currentView === 'years' ? 'month' : 'years';
			}

		},

		watch: {

			value()
			{
				this.current = this.value;
				this.currentDate = this.current.getDate();
				this.currentMonth = this.current.getMonth() + 1;
				this.currentYear = this.current.getFullYear();
			}

		}

	}

</script>
