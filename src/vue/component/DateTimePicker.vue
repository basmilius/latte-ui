<template>

	<div class="datepicker">

		<input readonly ref="input" type="datetime-local" class="form-control" :value="inputValue"/>

		<latte-popup :associate-with="$refs.input" ref="popup" style="width: 384px">

			<latte-datepicker-calendar body-class="pb-0" v-model="currentDate"></latte-datepicker-calendar>

			<latte-timepicker-clock class="mt-0" v-model="currentTime">

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

			value: {
				default: () => new Date(),
				required: false,
				type: Date
			}

		},

		data()
		{
			return {
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
