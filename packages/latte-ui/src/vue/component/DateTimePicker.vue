<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="datepicker">

		<input readonly ref="input" :id="id" :name="name" :placeholder="placeholder" type="datetime-local" class="form-control" :value="inputValue"/>

		<latte-popup :associate-with="$refs.input" @close="onClose" @open="onOpen" ref="popup" style="width: 384px">
			<div class="panel panel-blank">
				<latte-datepicker-calendar body-class="pb-0" @view="calendarView = $event" v-model="currentDate"></latte-datepicker-calendar>

				<latte-timepicker-clock class="mx-4 my-3" style="min-height: unset" v-if="calendarView === 'dates'" v-model="currentTime"></latte-timepicker-clock>

				<div class="btn-group" v-if="calendarView === 'dates'">
					<latte-ripple as="button" class="btn btn-contained btn-pill btn-primary" @click="select"><i class="mdi mdi-check"></i></latte-ripple>
				</div>
			</div>
		</latte-popup>

	</div>

</template>

<script>

	export default {

		name: "latte-datetimepicker",

		props: {
			id: {default: "date", type: String},
			name: {default: "date", type: String},
			placeholder: {default: "", type: String},
			value: {default: () => new Date(), type: Date}
		},

		data()
		{
			return {
				canReset: true,
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
				return this.moment(this.current).format("YYYY-MM-DD[T]HH:mm");
			}

		},

		methods: {

			close()
			{
				this.$refs.popup.close();
			},

			select()
			{
				this.$emit("input", this.current);
				this.canReset = false;
				this.close();
			},

			onClose()
			{
				if (!this.canReset)
					return;

				this.currentDate = new Date(this.value.getTime());
				this.currentTime = new Date(this.value.getTime());
			},

			onOpen()
			{
				this.canReset = true;
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
