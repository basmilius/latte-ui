<template>

	<div class="colorpicker" :style="styles">
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

	import { hexToRGB, hslToRGB, hsvToRGB, rgbToHex, rgbToHSL, rgbToHSV } from "../../js/util/color";

	import Slider from "./base/Slider";
	import XYPos from "./base/XYPos";

	function smartColor(data)
	{
		let rgb;

		if (data.r && data.g && data.b)
			rgb = data;
		else if (data.h && data.s && data.l)
			rgb = hslToRGB(data);
		else if (data.h && data.s && data.v)
			rgb = hsvToRGB(data);
		else
			rgb = hexToRGB(data);

		const hex = rgbToHex(rgb);
		const hsl = rgbToHSL(rgb);
		const hsv = rgbToHSV(rgb);

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
				color: smartColor("#a8122c"),
				saturation: {x: 0, y: 0},
				isChanging: false
			};
		},

		computed: {

			styles()
			{
				const {r, g, b} = hsvToRGB({h: this.color.hsv.h, s: 1, v: 1});

				return {
					"--hex": this.color.hex,
					"--hue-hex": `rgb(${r}, ${g}, ${b})`,
				};
			}

		},

		watch: {

			color: {
				immediate: true, handler()
				{
					this.isChanging = true;

					this.hue = this.color.hsl.h;
					this.saturation = {
						x: .5,
						y: .5
					};

					this.$nextTick(() => this.isChanging = false);
				}
			},

			hue()
			{
				if (this.isChanging)
					return;

				let h = this.hue;

				if (h === 0)
					h = 360;

				this.color = smartColor({h: h / 360, s: this.color.hsv.s, v: this.color.hsv.v});
			},

			saturation()
			{
				if (this.isChanging)
					return;

				this.color = smartColor({h: this.color.hsv.h, s: this.saturation.y, v: this.saturation.x});
			}

		}

	}

</script>
