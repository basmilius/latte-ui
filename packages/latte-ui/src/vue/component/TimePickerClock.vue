<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="timepicker-clock">

		<input type="number" class="form-control timepicker-control" :min="isAMPM ? 1 : 0" :max="isAMPM ? 12 : 23" required v-model="selectedHour"/>

		<input type="number" class="form-control timepicker-control" :min="0" :max="59" required v-model="selectedMinute"/>

		<select class="custom-select timepicker-control" v-if="isAMPM" v-model="selectedMeridiem">
			<option value="am">AM</option>
			<option value="pm">PM</option>
		</select>

		<slot name="after"></slot>

	</div>

</template>

<script>

	export default {

		name: "latte-timepicker-clock",

		props: {
			value: {default: () => new Date(), type: Date}
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

			isAMPM()
			{
				return this.moment().localeData().longDateFormat("LT").endsWith("A");
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
					this.selectedMeridiem = this.value.getHours() >= 12 ? "pm" : "am";
					this.selectedHour = this.isAMPM && this.value.getHours() > 12 ? this.value.getHours() - 12 : this.value.getHours();
					this.selectedMinute = this.value.getMinutes();
				}
			}

		}

	}

</script>
