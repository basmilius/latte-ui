<template>

	<div class="xy-pos" @mousedown="onMouseDown" @touchstart="onMouseDown">
		<slot></slot>

		<div class="xy-pos-thumb" :style="thumbStyle"></div>
	</div>

</template>

<script>

	import { relativeCoordsTo, terminateEvent } from "../../../js/util/dom";
	import { clamp } from "../../../js/math";

	export default {

		props: {
			value: {default: () => ({x: 0, y: 0}), type: Object}
		},

		data()
		{
			return {
				isDragging: false,
				valueX: 0,
				valueY: 0,
				x: 0,
				y: 0
			};
		},

		destroyed()
		{
			window.removeEventListener("mousemove", this.onMouseMove);
			window.removeEventListener("mouseup", this.onMouseUp);
			window.removeEventListener("touchmove", this.onMouseMove);
			window.removeEventListener("touchend", this.onMouseUp);
		},

		mounted()
		{
			window.addEventListener("mousemove", this.onMouseMove, {passive: true});
			window.addEventListener("mouseup", this.onMouseUp, {passive: true});
			window.addEventListener("touchmove", this.onMouseMove, {passive: false});
			window.addEventListener("touchend", this.onMouseUp, {passive: false});

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
