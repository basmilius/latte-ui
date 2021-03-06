<template>

	<div class="slider" :class="['slider-' + direction]" @mousedown="onMouseDown" @touchstart="onMouseDown">
		<div class="slider-track"></div>
		<div class="slider-thumb" :style="thumbStyle"></div>
	</div>

</template>

<script>

	import { oneOf } from "../../../js/helper/array";
	import { relativeCoordsTo, terminateEvent } from "../../../js/util/dom";
	import { clamp, roundStep } from "../../../js/math";
	import { addEventListener } from "../../../js/util/event";
	import { onlyMouse, onlyTouch } from "../../../js/util/touch";

	export default {

		props: {
			direction: {default: "horizontal", type: String, validator: oneOf(["horizontal", "vertical"])},
			min: {default: 0, type: Number},
			max: {default: 100, type: Number},
			step: {default: 1, type: Number},
			value: {default: 0, type: Number}
		},

		data()
		{
			return {
				events: [],
				isDragging: false,
				position: 0
			};
		},

		destroyed()
		{
			this.events.forEach(remove => remove());
		},

		mounted()
		{
			this.events.push(
				addEventListener(window, "mousemove", onlyMouse(this.onMouseMove)),
				addEventListener(window, "mouseup", onlyMouse(this.onMouseUp)),
				addEventListener(window, "touchmove", onlyTouch(this.onMouseMove), {passive: false}),
				addEventListener(window, "touchend", onlyTouch(this.onMouseUp), {passive: false})
			);
		},

		computed: {

			isHorizontal()
			{
				return this.direction === "horizontal";
			},

			isVertical()
			{
				return this.direction === "vertical";
			},

			thumbStyle()
			{
				return {
					"--position": `${this.position}%`
				};
			}

		},

		methods: {

			onMouseDown(evt)
			{
				this.isDragging = true;

				this.onMouseMove(evt);
			},

			onMouseMove(evt)
			{
				if (!this.isDragging)
					return;

				if (evt.type.substring(0, 5) === "touch")
					terminateEvent(evt);

				const {x, y} = relativeCoordsTo(this.$el, evt);
				const {width, height} = this.$el.getBoundingClientRect();
				let p = 0;

				if (this.isHorizontal)
					p = clamp(x, 0, width) / width;
				else
					p = clamp(y, 0, height) / height;

				const value = roundStep(p * (this.max - this.min), this.step) + this.min;

				this.position = (value - this.min) / (this.max - this.min) * 100;

				this.$emit("input", value);
			},

			onMouseUp()
			{
				this.isDragging = false;
			}

		},

		watch: {

			value: {
				immediate: true, handler()
				{
					if (this.isDragging)
						return;

					this.position = ((this.value - this.min) / (this.max - this.min)) * 100;
				}
			}

		}

	}

</script>
