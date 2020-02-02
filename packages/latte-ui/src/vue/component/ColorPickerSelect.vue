<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel colorpicker" draggable="false" :style="styles">
		<div class="panel-body colorpicker-controls">
			<XYPos class="colorpicker-saturation" v-model="saturation">
				<div class="saturation-overlay white"></div>
				<div class="saturation-overlay black"></div>
			</XYPos>
			<Slider class="hue" direction="vertical" :min="0" :max="360" v-model="hue"/>
			<Slider class="alpha" direction="vertical" :min="100" :max="0" v-model="alpha"/>
		</div>
		<div class="panel-body border-0 colorpicker-preview">
			<div class="colorpicker-preview-color" :style="{backgroundColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${alpha / 100})`}"></div>
			<label class="preview-value hex">
				<input class="form-control" type="text" maxlength="7" v-model="hex" pattern="[a-fA-F0-9]+" @blur="onHueSaturationChanged" @keydown="onHexKeyDown" @input="onHexChange" ref="hex"/>
				<span>HEX</span>
			</label>
			<label class="preview-value rgb">
				<input class="form-control" type="number" :min="0" :max="255" :step="1" v-model="r" @blur="onHueSaturationChanged" @input="onRgbChange" ref="r"/>
				<span>R</span>
			</label>
			<label class="preview-value rgb">
				<input class="form-control" type="number" :min="0" :max="255" :step="1" v-model="g" @blur="onHueSaturationChanged" @input="onRgbChange" ref="g"/>
				<span>G</span>
			</label>
			<label class="preview-value rgb">
				<input class="form-control" type="number" :min="0" :max="255" :step="1" v-model="b" @blur="onHueSaturationChanged" @input="onRgbChange" ref="b"/>
				<span>B</span>
			</label>
			<label class="preview-value alpha">
				<input class="form-control" type="number" min="0" max="1" step="0.01" readonly :value="(alpha / 100).toFixed(2)"/>
				<span>A</span>
			</label>
		</div>
		<slot></slot>
	</div>

</template>

<script>

	import { clamp, roundStep } from "../../js/math";
	import { hsvToRGB, smartColor } from "../../js/util/color";
	import { terminateEvent } from "../../js/util/dom";

	import Slider from "./base/Slider";
	import XYPos from "./base/XYPos";

	export default {

		components: {XYPos, Slider},

		name: "latte-colorpicker-select",

		props: {
			value: {default: "#4752ba"}
		},

		refs: ["hex"],

		data()
		{
			const color = smartColor(this.value);

			return {
				alpha: (color.alpha || 1) * 100,
				hex: color.hex,
				r: color.rgb.r,
				g: color.rgb.g,
				b: color.rgb.b,
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

			onHexChange()
			{
				let {value} = this.$refs.hex;

				if (value.substring(0, 1) !== "#")
					value = "#" + value;

				if (value.length !== 4 && value.length !== 7)
					return;

				this.color = smartColor(value);
			},

			onRgbChange()
			{
				this.color = smartColor({
					r: clamp(this.r, 0, 255),
					g: clamp(this.g, 0, 255),
					b: clamp(this.b, 0, 255)
				}, this.oldHue, this.alpha / 100);
			},

			onHexKeyDown(evt)
			{
				if (evt.key.match(/[0-9a-f]+/))
					return;

				terminateEvent(evt);
			},

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
					this.hex = this.$refs.hex === document.activeElement ? this.hex : this.color.hex;
					this.r = this.$refs.r === document.activeElement ? this.r : this.color.rgb.r;
					this.g = this.$refs.g === document.activeElement ? this.g : this.color.rgb.g;
					this.b = this.$refs.b === document.activeElement ? this.b : this.color.rgb.b;
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
