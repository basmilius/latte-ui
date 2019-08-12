<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="timepicker">

		<input readonly ref="input" :id="id" :name="name" :placeholder="placeholder" type="time" class="form-control" :value="inputValue" @click.prevent="open"/>

		<component :is="isOverlay ? 'latte-overlay' : 'latte-popup'" :associate-with="$refs.input" :name="uniqueId" ref="popup" :responsive="false" @close="$refs.picker.setView('hours')" persistent>
			<latte-timepicker-clock ref="picker" v-model="current">
				<div class="panel-footer justify-content-end">
					<latte-ripple as="button" class="btn btn-text btn-dark" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></latte-ripple>
					<latte-ripple as="button" class="btn btn-contained btn-primary" @click="select"><i class="mdi mdi-check-circle"></i><span>{{ "Set" | i18n("latte-ui") }}</span></latte-ripple>
				</div>
			</latte-timepicker-clock>
		</component>

	</div>

</template>

<script>

	import { id } from "../../js/core/api";
	import { isCollapsed } from "../../js/util/dom";
	import { on } from "../../js/core/action";

	export default {

		name: "latte-timepicker",

		props: {
			id: {default: "time", type: String},
			name: {default: "time", type: String},
			placeholder: {default: "", type: String},
			value: {default: () => new Date(), type: Date}
		},

		data()
		{
			return {
				sub: {
					tick: null
				},
				current: this.value,
				isOverlay: isCollapsed(),
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
			this.sub.tick = on("latte:tick", () => this.isOverlay = isCollapsed());
		},

		computed: {

			inputValue()
			{
				return this.moment(this.val).format("HH:mm");
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
