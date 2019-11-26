<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel colorpicker" draggable="false" :style="styles">
		<div class="colorpicker-controls">
			<XYPos class="colorpicker-saturation" v-model="saturation">
				<div class="saturation-overlay white"></div>
				<div class="saturation-overlay black"></div>
			</XYPos>
			<Slider class="hue" direction="vertical" :min="0" :max="360" v-model="hue"/>
			<Slider class="alpha" direction="vertical" :min="100" :max="0" v-model="alpha"/>
		</div>
		<div class="colorpicker-preview">
			<div class="colorpicker-preview-color" :style="{backgroundColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${alpha / 100})`}"></div>
			<label class="preview-value hex">
				<input class="form-control" type="text" maxlength="7" :value="color.hex"/>
				<span>HEX</span>
			</label>
			<label class="preview-value rgb">
				<input class="form-control" type="number" min="0" max="255" :value="color.rgb.r"/>
				<span>R</span>
			</label>
			<label class="preview-value rgb">
				<input class="form-control" type="number" min="0" max="255" :value="color.rgb.g"/>
				<span>G</span>
			</label>
			<label class="preview-value rgb">
				<input class="form-control" type="number" min="0" max="255" :value="color.rgb.b"/>
				<span>B</span>
			</label>
			<label class="preview-value alpha">
				<input class="form-control" type="number" min="0" max="255" :value="(alpha / 100).toFixed(2)"/>
				<span>A</span>
			</label>
		</div>
		<slot></slot>
	</div>

</template>

<script>

	import { hsvToRGB, smartColor } from "../../js/util/color";
	import { clamp, roundStep } from "../../js/math";

	import Slider from "./base/Slider";
	import XYPos from "./base/XYPos";

	export default {

		components: {XYPos, Slider},

		name: "latte-colorpicker-select",

		props: {
			value: {default: "#4752ba"}
		},

		data()
		{
			const color = smartColor(this.value);

			return {
				alpha: (color.alpha || 1) * 100,
				hue: 0,
				color: color,
				saturation: {x: 0, y: 0},
				oldHue: null,
				isChanging: false
			};
		},

		computed: {

			styles()
			{
				const {r, g, b} = hsvToRGB({h: this.color.hsv.h, s: 1, v: 1});

				return {
					"--hex": this.color.hex,
					"--hue-hex": `rgb(${r}, ${g}, ${b})`
				};
			}

		},

		methods: {

			onHueSaturationChanged()
			{
				if (this.isChanging)
					return;

				this.oldHue = this.color.hsv.h;

				this.color = smartColor({
					h: clamp(this.hue / 360, 0, 1),
					s: clamp(this.saturation.x, 0, 1),
					v: clamp(1 - this.saturation.y, 0, 1)
				}, this.oldHue, this.alpha / 100);
			}

		},

		watch: {

			color: {
				immediate: true, handler()
				{
					this.isChanging = true;

					this.alpha = this.color.alpha * 100;
					this.hue = roundStep(this.color.hsv.h * 360, 1);
					this.saturation = {
						x: this.color.hsv.s,
						y: 1 - this.color.hsv.v
					};

					this.$emit("input", this.color);
					this.$nextTick(() => this.isChanging = false);
				}
			},

			alpha()
			{
				this.onHueSaturationChanged();
			},

			hue()
			{
				this.onHueSaturationChanged();
			},

			saturation()
			{
				this.onHueSaturationChanged();
			},

			value()
			{
				if (this.isChanging)
					return;

				this.color = smartColor(this.value, undefined, this.alpha / 100);
				this.alpha = (this.color.alpha || 1) * 100;
			}

		}

	}

</script>
