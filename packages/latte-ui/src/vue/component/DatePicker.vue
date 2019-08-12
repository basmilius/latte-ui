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

		<input readonly ref="input" :id="id" :name="name" :placeholder="placeholder" type="date" class="form-control" :value="inputValue"/>

		<latte-popup :associate-with="$refs.input" ref="popup">
			<latte-datepicker-calendar v-model="current"></latte-datepicker-calendar>
		</latte-popup>

	</div>

</template>

<script>

	export default {

		name: "latte-datepicker",

		props: {
			id: {default: "date", type: String},
			name: {default: "date", type: String},
			placeholder: {default: "", type: String},
			value: {default: () => new Date(), type: Date}
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
				return this.moment(this.current).format("YYYY-MM-DD");
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
