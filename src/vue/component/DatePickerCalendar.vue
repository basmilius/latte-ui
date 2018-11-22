<template>

	<div class="panel panel-blank datepicker-calendar">

		<div class="panel-header datepicker-calendar-header">
			<button class="btn btn-icon btn-text btn-dark" @click="navigate(-1)"><i class="mdi mdi-chevron-left"></i></button>

			<div class="btn-group mx-auto">
				<button class="btn btn-text btn-dark" @click="view('months')"><span>{{ moment(monthBeginDate).format("MMMM") }}</span></button>
				<button class="btn btn-text btn-dark" @click="view('years')"><span>{{ moment(monthBeginDate).format("YYYY") }}</span></button>
			</div>

			<button class="btn btn-icon btn-text btn-dark" @click="navigate(1)"><i class="mdi mdi-chevron-right"></i></button>
		</div>

		<div class="panel-body datepicker-calendar-dates pt-0" :class="bodyClass" v-if="selectedView === 'dates'">
			<span class="day">{{ moment().isoWeekday(1).format("dd") }}</span>
			<span class="day">{{ moment().isoWeekday(2).format("dd") }}</span>
			<span class="day">{{ moment().isoWeekday(3).format("dd") }}</span>
			<span class="day">{{ moment().isoWeekday(4).format("dd") }}</span>
			<span class="day">{{ moment().isoWeekday(5).format("dd") }}</span>
			<span class="day">{{ moment().isoWeekday(6).format("dd") }}</span>
			<span class="day">{{ moment().isoWeekday(7).format("dd") }}</span>

			<button :class="getClassesForDate(date)" :disabled="isOtherMonth(date)" @click="select(date)" v-for="date of dates">
				<span>{{ date.getDate() }}</span>
			</button>
		</div>

		<div class="panel-body datepicker-calendar-months pt-0" :class="bodyClass" v-if="selectedView === 'months'">
			<button :class="getClassesForMonth(index)" :data-month="index" @click="selectMonth(index)" v-for="(month, index) in months">
				<span>{{ month }}</span>
			</button>
		</div>

		<div class="panel-body datepicker-calendar-years pt-0" :class="bodyClass" v-if="selectedView === 'years'">
			<button :class="getClassesForYear(year)" :data-year="year" @click="selectYear(year)" v-for="year in years">
				<span>{{ year }}</span>
			</button>
		</div>

	</div>

</template>

<script>

	export default {

		name: "latte-datepicker-calendar",

		props: {

			bodyClass: {
				default: "",
				required: false,
				type: String
			},

			value: {
				default: () => new Date(),
				required: false,
				type: Date
			}

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
				return {
					1: moment().month(0).format("MMMM"),
					2: moment().month(1).format("MMMM"),
					3: moment().month(2).format("MMMM"),
					4: moment().month(3).format("MMMM"),
					5: moment().month(4).format("MMMM"),
					6: moment().month(5).format("MMMM"),
					7: moment().month(6).format("MMMM"),
					8: moment().month(7).format("MMMM"),
					9: moment().month(8).format("MMMM"),
					10: moment().month(9).format("MMMM"),
					11: moment().month(10).format("MMMM"),
					12: moment().month(11).format("MMMM")
				};
			},

			years()
			{
				const years = [];

				for (let year = 1970; year <= 2100; year++)
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
				const classes = ["btn", "m-0", "w-100"];

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

			moment()
			{
				return moment(...arguments);
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
				this.$nextTick(() =>
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
