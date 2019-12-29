<template>

	<div class="xy-pos" @mousedown="onMouseDown" @touchstart="onMouseDown">
		<slot></slot>

		<div class="xy-pos-thumb" :style="thumbStyle"></div>
	</div>

</template>

<script>

	import { relativeCoordsTo, terminateEvent } from "../../../js/util/dom";
	import { clamp } from "../../../js/math";
	import { addEventListener } from "../../../js/util/event";
	import { onlyMouse, onlyTouch } from "../../../js/util/touch";

	export default {

		props: {
			value: {default: () => ({x: 0, y: 0}), type: Object}
		},

		data()
		{
			return {
				events: [],
				isDragging: false,
				valueX: 0,
				valueY: 0,
				x: 0,
				y: 0
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

			this.onValueChanged();
		},

		computed: {

			thumbStyle()
			{
				return {
					top: `${this.y}px`,
					left: `${this.x}px`
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

				const coords = relativeCoordsTo(this.$el, evt);

				if (!coords)
					return;

				const {x, y} = coords;
				const {width, height} = this.$el.getBoundingClientRect();

				this.valueX = clamp(x, 0, width) / width;
				this.valueY = clamp(y, 0, height) / height;

				this.x = this.valueX * width;
				this.y = this.valueY * height;

				this.$emit("input", {x: this.valueX, y: this.valueY});
			},

			onMouseUp()
			{
				this.isDragging = false;
			},

			onValueChanged()
			{
				if (this.isDragging)
					return;

				const {width, height} = this.$el.getBoundingClientRect();

				this.x = this.value.x * width;
				this.y = this.value.y * height;
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
