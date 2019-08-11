<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel panel-blank timepicker-clock" :class="{'is-pointer-down': isPointerDown, 'is-switching-views': isSwitchingViews}">
		<div class="panel-header timepicker-header">
			<div class="timepicker-selected">
				<button class="btn btn-text btn-dark timepicker-segment hours" @click="setView('hours')">{{ currentHour.toString().padStart(2, "0") }}</button>
				<span class="timepicker-segment colon">:</span>
				<button class="btn btn-text btn-dark timepicker-segment minutes" @click="setView('minutes')">{{ currentMinute.toString().padStart(2, "0") }}</button>
			</div>
		</div>
		<div class="panel-body timepicker-clock">

			<div class="timepicker-clock-mount" :style="{'--clock-size': `${Math.round(clockRadius * 2.4)}px`}" @mousedown="onPointerDown" @mousemove="onPointerMove" @mouseup="onPointerUp" @mouseleave="onPointerCancel">
				<div class="timepicker-clock-pointer" :class="{'is-alternative': pointerAlternative}" :style="{height: `${pointerHeight}px`, transform: `rotate(${pointerDegrees}deg)`}"></div>
				<button class="timepicker-clock-item hour" :class="{'is-selected': item.isSelected}" :style="item.style" v-if="item.show" v-for="item of items">{{ item.label }}</button>
			</div>

		</div>
	</div>

</template>

<script>

	import { closest, raf, relativeCoordsTo } from "../../js/util/dom";
	import { pythagorean } from "../../js/math";

	const innerRingOffset = -39;

	function calculateDegrees(a, b)
	{
		return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
	}

	function calculateOffsetWithDegrees(degrees, offset)
	{
		let angle = degreesToRadians(degrees);

		return {
			x: Math.round(Math.cos(angle) * offset),
			y: Math.round(Math.sin(angle) * offset)
		};
	}

	function degreesToRadians(degrees)
	{
		return (degrees - 90) * Math.PI / 180;
	}

	export default {

		name: "latte-timepicker-clock",

		props: {
			clockRadius: {default: 110, type: Number},
			value: {default: () => new Date(), type: Date}
		},

		data()
		{
			return {
				current: new Date(this.value.getTime()),
				currentHour: 0,
				currentMinute: 0,
				isPointerDown: false,
				isSwitchingViews: false,
				pointerAlternative: false,
				pointerDegrees: 0,
				pointerHeight: this.clockRadius,
				view: "hours"
			};
		},

		mounted()
		{
			this.reset();
		},

		computed: {

			isAMPM()
			{
				return this.moment().localeData().longDateFormat("LT").endsWith("A");
			},

			items()
			{
				if (this.view === "hours")
					return this.generateHours();
				else if (this.view === "minutes")
					return this.generateMinutes();
				else
					return [];
			}

		},

		methods: {

			generateHours()
			{
				return Array.from(Array(this.isAMPM ? 12 : 24).keys()).map(hour =>
				{
					const degrees = (hour % 12) * (360 / 12);
					const isInnerRing = hour >= 12;
					const itemRadius = this.clockRadius + (isInnerRing ? innerRingOffset : 0);
					const pos = calculateOffsetWithDegrees(degrees, itemRadius);

					return {
						degrees,
						itemRadius,
						label: this.isAMPM && hour === 0 ? 12 : hour,
						isSelected: (this.pointerDegrees + 180) % 360 === degrees && itemRadius === this.pointerHeight,
						show: true,
						style: {
							transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
						},
						value: hour
					};
				});
			},

			generateMinutes()
			{
				return Array.from(Array(60).keys()).map(minute =>
				{
					const degrees = minute * (360 / 60);
					const pos = calculateOffsetWithDegrees(degrees, this.clockRadius);

					return {
						degrees,
						itemRadius: this.clockRadius,
						label: this.isAMPM && minute === 0 ? 12 : minute,
						isSelected: (this.pointerDegrees + 180) % 360 === degrees,
						show: minute % 5 === 0,
						style: {
							transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
						},
						value: minute
					};
				});
			},

			reset()
			{
				this.pointerDegrees = 0;
				this.pointerHeight = this.clockRadius;
			},

			setView(view)
			{
				this.isSwitchingViews = true;

				raf(() =>
				{
					this.view = view;
					this.isSwitchingViews = false;
				}, 150)
			},

			onPointerCancel()
			{
				this.isPointerDown = false;
			},

			onPointerDown(evt)
			{
				this.isPointerDown = true;

				this.onPointerMove(evt);
			},

			onPointerMove(evt)
			{
				if (!this.isPointerDown)
					return;

				const clock = closest(evt.target, ".timepicker-clock-mount");
				const coords = relativeCoordsTo(clock, evt);
				const rect = clock.getBoundingClientRect();

				const cx = rect.width / 2;
				const cy = rect.height / 2;

				let alternative = false;
				let degrees = Math.round(calculateDegrees({x: cx, y: cy}, coords) + 180);
				let height = this.clockRadius;

				if (this.view === "hours")
				{
					let segmentDegrees = (360 / 12);
					degrees = Math.round(degrees / segmentDegrees) * segmentDegrees;

					if (!this.isAMPM)
					{
						let distance = pythagorean(cx - coords.x, cy - coords.y);
						height = distance <= this.clockRadius + innerRingOffset / 2 ? this.clockRadius + innerRingOffset : this.clockRadius;
					}
				}

				if (this.view === "minutes")
				{
					let segmentDegrees = (360 / 60);
					degrees = Math.round(degrees / segmentDegrees) * segmentDegrees;
					alternative = degrees % (360 / 12) !== 0;
				}

				this.pointerAlternative = alternative;
				this.pointerDegrees = degrees + 90;
				this.pointerHeight = height;

				this.$nextTick(() => this.updateCurrent());
			},

			onPointerUp()
			{
				if (!this.isPointerDown)
					return;

				this.isPointerDown = false;

				if (this.view === "hours")
					this.view = "minutes";
			},

			updateCurrent()
			{
				let item = this.items.find(i => i.isSelected);

				if (!item)
					return;

				let date = new Date(this.current.getTime());

				if (this.view === "hours")
					date.setHours(item.value);
				else if (this.view === "minutes")
					date.setMinutes(item.value);

				this.current = date;
			},

			updatePointer()
			{
				if (this.view === "hours")
				{
					let item = this.items.find(i => i.value === this.current.getHours());
					this.pointerAlternative = false;
					this.pointerDegrees = (item.degrees + 180) % 360;
					this.pointerHeight = item.itemRadius;
				}
				else if (this.view === "minutes")
				{
					let item = this.items.find(i => i.value === this.current.getMinutes());
					this.pointerAlternative = item.degrees % (360 / 12) !== 0;
					this.pointerDegrees = (item.degrees + 180) % 360;
					this.pointerHeight = item.itemRadius;
				}
			}

		},

		watch: {

			current: {
				immediate: true,
				handler()
				{
					this.currentHour = this.current.getHours();
					this.currentMinute = this.current.getMinutes();

					this.$nextTick(() => this.updatePointer());
					this.$emit("input", this.current);
				}
			},

			value()
			{
				this.current = new Date(this.value.getTime());
				this.updatePointer();
			},

			view()
			{
				this.updatePointer();
			}

		}

	}

</script>
