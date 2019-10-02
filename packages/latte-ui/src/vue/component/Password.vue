<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="input-group is-within">
		<input :type="fieldType" :autocomplete="autocomplete" class="form-control" v-bind="bindings" v-model="password"/>
		<button class="btn btn-text btn-icon btn-dark" @click="toggle" type="button">
			<Icon :name="fieldType === 'password' ? 'eye' : 'eye-off'"/>
		</button>
	</div>

</template>

<script>

	import Icon from "./base/Icon.vue";

	export default {

		components: {Icon},

		name: "latte-password",

		props: {
			autocomplete: {default: "", type: String},
			id: {default: "", type: String},
			name: {default: "", type: String},
			placeholder: {default: "", type: String},
			show: {default: false, type: Boolean},
			value: {default: "", type: String}
		},

		data()
		{
			return {
				fieldType: this.show ? "text" : "password",
				password: this.value,
				shouldShow: this.show
			};
		},

		computed: {

			bindings()
			{
				const bindings = {};

				if (this.id !== "")
					bindings.id = this.id;

				if (this.name !== "")
					bindings.name = this.name;

				if (this.placeholder !== "")
					bindings.placeholder = this.placeholder;

				return bindings;
			}

		},

		methods: {

			toggle()
			{
				this.shouldShow = !this.shouldShow;
			}

		},

		watch: {

			password()
			{
				this.$emit("input", this.password);
			},

			shouldShow()
			{
				this.fieldType = this.shouldShow ? "text" : "password";

				this.$emit("visible", this.shouldShow);
			},

			show()
			{
				this.shouldShow = this.show;
			},

			value()
			{
				this.password = this.value;
			}

		}

	}

</script>
