<template>

	<div class="datepicker">

		<input readonly ref="input" :id="id" :name="name" :placeholder="placeholder" type="date" class="form-control" :value="inputValue"/>

		<latte-popup :associate-with="$refs.input" ref="popup" style="width: 384px">
			<latte-datepicker-calendar v-model="current"></latte-datepicker-calendar>
		</latte-popup>

	</div>

</template>

<script>

	export default {

		name: "latte-datepicker",

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
				current: this.value
			};
		},

		computed: {

			inputValue()
			{
				return moment(this.current).format("YYYY-MM-DD");
			}

		},

		watch: {

			current()
			{
				this.$emit("input", this.current);
				this.$refs.popup.close();
			},

			value()
			{
				this.current = this.value;
			}

		}

	}

</script>
