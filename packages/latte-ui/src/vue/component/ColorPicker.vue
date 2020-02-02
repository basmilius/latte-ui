<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="input-group" ref="control">
		<input type="text" class="form-control" readonly v-bind="$attrs" :value="stringValue" @click.prevent="open"/>
		<div class="input-group-addon bg-transparent">
			<div class="colorpicker-preview-color" :style="{background: hslaValue}"></div>
		</div>

		<component :is="componentType" class="colorpickermount" :associate-with="$refs.control" :name="uniqueId" ref="popup" :responsive="false" @close="cancel" @open="isOpen = true">
			<LatteColorpickerSelect v-model="color" v-if="isOpen">
				<div class="panel-footer justify-content-end">
					<LatteRipple as="button" class="btn btn-text" @click="cancel" v-if="isOverlay"><span>{{ "Cancel" | i18n("latte-ui") }}</span></LatteRipple>
					<LatteRipple as="button" class="btn btn-contained btn-primary" @click="select">
						<Icon name="check-circle"/>
						<span>{{ "Set" | i18n("latte-ui") }}</span></LatteRipple>
				</div>
			</LatteColorpickerSelect>
		</component>
	</div>

</template>

<script>

	import { id } from "../../js/core/api";
	import { on } from "../../js/core/action";
	import { oneOf } from "../../js/helper/array";
	import { colorToString, smartColor } from "../../js/util/color";

	import Icon from "./Icon.vue";
	import LatteColorpickerSelect from "./ColorPickerSelect";
	import LatteRipple from "./Ripple";
	import { raf } from "../../js/util/dom";

	export default {

		inheritAttrs: false,

		components: {LatteRipple, LatteColorpickerSelect, Icon},

		name: "latte-colorpicker",

		props: {
			format: {default: "rgba", type: String, validator: oneOf(["hex", "hsl", "hsla", "rgb", "rgba"])},
			value: {default: () => ({r: 71, g: 82, b: 186, a: .5})}
		},

		refs: ["control", "popup"],

		data()
		{
			const value = smartColor(this.value);

			return {
				subscriptions: [],
				isOpen: false,
				isOverlay: window.innerWidth <= 1199,
				uniqueId: id(),
				color: value,
				current: value
			};
		},

		destroyed()
		{
			this.subscriptions.forEach(sub => sub.unsubscribe());
		},

		mounted()
		{
			this.subscriptions.push(
				on("latte:tick", () => this.isOverlay = window.innerWidth <= 1199)
			);
		},

		computed: {

			componentType()
			{
				return this.isOverlay ? "latte-overlay" : "latte-popup";
			},

			hslaValue()
			{
				return colorToString(this.current.hsla);
			},

			stringValue()
			{
				return colorToString(this.current[this.format]);
			}

		},

		methods: {

			cancel()
			{
				this.color = this.current;

				raf(() =>
				{
					if (this.$refs.popup.isOpen)
						this.close()
				});
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
				this.current = this.color;

				this.$emit("input", this.stringValue);
				this.$nextTick(() => this.close());
			},

			onValueChanged()
			{
				const value = smartColor(this.value);

				this.color = value;
				this.current = value;
			}

		},

		watch: {

			value()
			{
				this.onValueChanged();
			}

		}

	}

</script>
