<template>

	<div class="panel panel-blank timepicker-clock">
		<div class="panel-header">

			<select class="custom-select" v-model="selectedHour">
				<option :value="hour" v-for="hour in hours">{{ hour.toString().padStart(2, "0") }}</option>
			</select>

			<select class="custom-select" v-model="selectedMinute">
				<option :value="minute" v-for="minute in minutes">{{ minute.toString().padStart(2, "0") }}</option>
			</select>

			<select class="custom-select" v-if="isAMPM" v-model="selectedMeridiem">
				<option value="am">AM</option>
				<option value="pm">PM</option>
			</select>

			<slot name="after"></slot>

		</div>
	</div>

</template>

<script>

	export default {

		name: "latte-timepicker-clock",

		props: {

			value: {
				default: () => new Date(),
				required: false,
				type: Date
			}

		},

		data()
		{
			return {
				selectedHour: 1,
				selectedMinute: 0,
				selectedMeridiem: "am"
			};
		},

		computed: {

			hours()
			{
				const hours = [];

				for (let hour = (this.isAMPM ? 1 : 0); hour <= (this.isAMPM ? 12 : 23); hour++)
					hours.push(hour);

				return hours;
			},

			minutes()
			{
				const minutes = [];

				for (let minute = 0; minute <= 59; minute++)
					minutes.push(minute);

				return minutes;
			},

			isAMPM()
			{
				return moment().localeData().longDateFormat("LT").endsWith("A");
			}

		},

		methods: {

			updateTime()
			{
				const date = new Date(this.value.getTime());
				date.setHours((this.isAMPM && this.selectedMeridiem === "pm" && this.selectedHour < 12 ? this.selectedHour + 12 : (this.isAMPM && this.selectedMeridiem === "am" && this.selectedHour === 12 ? 0 : this.selectedHour)) % 24);
				date.setMinutes(this.selectedMinute);

				this.$emit("input", date);
			}

		},

		watch: {

			selectedHour()
			{
				this.updateTime();
			},

			selectedMinute()
			{
				this.updateTime();
			},

			selectedMeridiem()
			{
				this.updateTime();
			},

			value: {
				immediate: true,
				handler()
				{
					this.selectedHour = this.value.getHours();
					this.selectedMinute = this.value.getMinutes();
					this.selectedMeridiem = this.value.getHours() >= 12 ? "pm" : "am";
				}
			}

		}

	}

</script>
