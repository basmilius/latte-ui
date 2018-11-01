/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

export function createComponent()
{

	Vue.component("latte-password", {

		props: {

			autocomplete: {
				default: "",
				required: false,
				type: String
			},

			id: {
				default: "",
				required: false,
				type: String
			},

			name: {
				default: "",
				required: false,
				type: String
			},

			placeholder: {
				default: "",
				required: false,
				type: String
			},

			show: {
				default: false,
				required: false,
				type: Boolean
			},

			value: {
				default: "",
				required: false,
				type: String
			}

		},

		template: `	<div class="form-control">
						<input :type="fieldType" :autocomplete="autocomplete" class="form-control-plain" v-bind="bindings" v-model="password"/>
						<button class="btn btn-icon btn-dark form-control-suffix" @click="toggle" type="button"><i class="mdi" :class="iconClass"></i></button>
					</div>`,

		data()
		{
			return {
				fieldType: this.show ? "text" : "password",
				password: this.value
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
			},

			iconClass()
			{
				return this.fieldType === "password" ? "mdi-eye" : "mdi-eye-off";
			}

		},

		methods: {

			toggle()
			{
				this.show = !this.show;
			}

		},

		watch: {

			password()
			{
				this.$emit("input", this.password);
			},

			show()
			{
				this.fieldType = this.show ? "text" : "password";
			}

		}

	});

}
