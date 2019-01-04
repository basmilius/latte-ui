<!--
  - Copyright © 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="datepicker">

		<input readonly ref="input" :id="id" :name="name" :placeholder="placeholder" type="datetime-local" class="form-control" :value="inputValue"/>

		<latte-popup :associate-with="$refs.input" :persistent="true" ref="popup" style="width: 384px">

			<latte-datepicker-calendar body-class="pb-0" @view="calendarView = $event" v-model="currentDate"></latte-datepicker-calendar>

			<latte-timepicker-clock class="mt-0" v-if="calendarView === 'dates'" v-model="currentTime">

				<button slot="after" class="btn btn-icon btn-text btn-primary ml-3" @click="select"><i class="mdi mdi-check"></i></button>
				<button slot="after" class="btn btn-icon btn-text btn-dark" @click="close"><i class="mdi mdi-close"></i></button>

			</latte-timepicker-clock>

		</latte-popup>

	</div>

</template>

<script>

	export default {

		name: "latte-datetime-picker",

		props: {

			id: {
				default: "date",
				required: false,
				type: String
			},

			name: {
				default: "date",
				required: false,
				type: String
			},

			palceholder: {
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
				calendarView: "dates",
				currentDate: new Date(),
				currentTime: new Date()
			};
		},

		computed: {

			current()
			{
				const dt = new Date(this.currentDate);
				dt.setHours(this.currentTime.getHours());
				dt.setMinutes(this.currentTime.getMinutes());

				return dt;
			},

			inputValue()
			{
				return moment(this.current).format("YYYY-MM-DD[T]HH:mm");
			}

		},

		methods: {

			close()
			{
				this.currentDate = new Date(this.value.getTime());
				this.currentTime = new Date(this.value.getTime());
				this.$refs.popup.close();
			},

			select()
			{
				this.$emit("input", this.current);
				this.$refs.popup.close();
			}

		},

		watch: {

			value: {
				immediate: true,
				handler()
				{
					this.currentDate = new Date(this.value.getTime());
					this.currentTime = new Date(this.value.getTime());
				}
			}

		}

	}

</script>
