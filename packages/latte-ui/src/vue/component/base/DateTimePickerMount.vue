<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="input-group">

		<input readonly ref="input" :id="id" :name="name" :placeholder="placeholder" :type="type" class="form-control" :value="inputValue" @click.prevent="open"/>

		<component :is="componentType" class="datetimemount" :class="type" :associate-with="$refs.input" :name="uniqueId" ref="popup" :responsive="false" persistent>
			<slot v-bind="{current, setCurrent, setNow, isOverlay, cancel, close, open, select}"></slot>
		</component>

	</div>

</template>

<script>

	import { id } from "../../../js/core/api";
	import { on } from "../../../js/core/action";

	export default {

		props: {
			id: {default: "time", type: String},
			inputFormat: {required: true, type: String},
			name: {default: "time", type: String},
			placeholder: {default: "", type: String},
			type: {required: true, type: String},
			value: {default: () => new Date(), type: Date}
		},

		data()
		{
			return {
				sub: {
					tick: null
				},
				current: this.value,
				isOverlay: window.innerWidth <= 1199,
				uniqueId: id(),
				val: this.value
			};
		},

		destroyed()
		{
			this.sub.tick.unsubscribe();
		},

		mounted()
		{
			this.sub.tick = on("latte:tick", () => this.isOverlay = window.innerWidth <= 1199);
		},

		computed: {

			componentType()
			{
				return this.isOverlay ? "latte-overlay" : "latte-popup";
			},

			inputValue()
			{
				return this.moment(this.val).format(this.inputFormat);
			}

		},

		methods: {

			cancel()
			{
				this.current = this.val;
				this.close();
			},

			close()
			{
				this.$refs.popup.close();
			},

			open()
			{
				if (this.isOverlay)
					this.$refs.popup.open();
			},

			select()
			{
				this.$emit("input", this.val = this.current);
				this.close();
			},

			setCurrent(current)
			{
				this.current = current;
			},

			setNow()
			{
				let date = new Date(this.current.getTime());
				let now = new Date();

				if (this.type === "datetime-local")
				{
					date = new Date();
				}
				else if (this.type === "date")
				{
					date.setFullYear(now.getFullYear());
					date.setMonth(now.getMonth());
					date.setDate(now.getDate());
				}
				else if (this.type === "time")
				{
					date.setHours(now.getHours());
					date.setMinutes(now.getMinutes());
				}

				this.setCurrent(date);
			}

		},

		watch: {

			value()
			{
				this.current = this.val = this.value;
			}

		}

	}

</script>
