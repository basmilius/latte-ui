<template>

	<div class="colorpicker" draggable="false" :style="styles">
		<div class="colorpicker-controls">
			<XYPos class="colorpicker-saturation" v-model="saturation">
				<div class="saturation-overlay white"></div>
				<div class="saturation-overlay black"></div>
			</XYPos>
			<Slider class="hue" direction="vertical" :min="0" :max="360" v-model="hue"/>
			<Slider class="alpha" direction="vertical" :min="100" :max="0" v-model="alpha"/>
		</div>
		<div class="divider divider-horizontal"></div>
		<div class="colorpicker-debug px-3" style="font-size: .9rem; font-family: var(--fontMonospace)">
			<div>Hue: {{ hue }}</div>
			<div>Saturation: {{ saturation }}</div>
			<div>Alpha: {{ alpha }}</div>
			<div>HEX: {{ color.hex }}</div>
			<div>RGB: {{ color.rgb }}</div>
			<div>HSL: {{ color.hsl }}</div>
			<div>HSV: {{ color.hsv }}</div>
		</div>
		<div class="divider divider-horizontal"></div>
		<div class="colorpicker-debug d-flex px-3">
			<div class="mdi m-1" :style="{'background-color': color.hex}"></div>
			<div class="mdi m-1" :style="{'background-color': `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}"></div>
			<div class="mdi m-1" :style="{'background-color': `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}"></div>
		</div>
	</div>

</template>

<script>

	import { hexToRGB, hsvToRGB, rgbToHex, rgbToHSL, rgbToHSV } from "../../js/util/color";
	import { clamp, roundStep } from "../../js/math";

	import Slider from "./base/Slider";
	import XYPos from "./base/XYPos";

	function smartColor(data, oldHue)
	{
		let hsv;

		if (data.h && data.s && data.v)
			hsv = data;
		else if (data.h && data.s && data.l)
			hsv = {h: data.h / 360, s: data.s / 100, v: data.l / 100};
		else if (data.r && data.g && data.b)
			hsv = rgbToHSV(data);
		else
			hsv = rgbToHSV(hexToRGB(data));

		if (hsv.s === 0)
			hsv.h = hsv.h || oldHue || 0;

		const rgb = hsvToRGB(hsv);
		const hsl = rgbToHSL(rgb);
		const hex = rgbToHex(rgb);

		return {
			hex,
			rgb,
			hsl,
			hsv
		};
	}

	export default {

		components: {XYPos, Slider},

		name: "latte-colorpicker-select",

		data()
		{
			return {
				alpha: 100,
				hue: 0,
				color: smartColor("#3388d5"),
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
					h: clamp(this.hue === 0 ? 1 : this.hue / 360, 0, 1),
					s: clamp(this.saturation.x, 0, 1),
					v: clamp(1 - this.saturation.y, 0, 1)
				}, this.oldHue);
			}

		},

		watch: {

			color: {
				immediate: true, handler()
				{
					this.isChanging = true;

					this.hue = roundStep(this.color.hsv.h * 360, 1);
					this.saturation = {
						x: this.color.hsv.s,
						y: 1 - this.color.hsv.v
					};

					this.$nextTick(() => this.isChanging = false);
				}
			},

			hue()
			{
				this.onHueSaturationChanged();
			},

			saturation()
			{
				this.onHueSaturationChanged();
			}

		}

	}

</script>
