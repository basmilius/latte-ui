<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel timepicker-clock" :class="{'is-pointer-down': isPointerDown, 'is-switching-views': isSwitchingViews}">
		<div class="panel-header timepicker-header">
			<div class="timepicker-segments">
				<button class="timepicker-segment hours" :class="{'is-selection': view === 'hours'}" @click="setView('hours')">{{ currentHour.toString().padStart(2, "0") }}</button>
				<span class="colon">:</span>
				<button class="timepicker-segment minutes" :class="{'is-selection': view === 'minutes'}" @click="setView('minutes')">{{ currentMinute.toString().padStart(2, "0") }}</button>
			</div>
			<div class="timepicker-ampm" v-if="isAMPM">
				<span class="ampm" :class="{'is-selected': !isPM}" @click="setAM">AM</span>
				<span class="ampm" :class="{'is-selected': isPM}" @click="setPM">PM</span>
			</div>
		</div>
		<div class="panel-body timepicker-clock">
			<div class="timepicker-clock-mount" :style="{'--clockSize': `${Math.round(clockRadius * 2.4)}px`}">
				<div class="timepicker-clock-pointer" :class="{'is-alternative': pointerAlternative}" :style="{height: `${pointerHeight}px`, transform: `rotate(${pointerDegrees}deg)`}"></div>
				<button class="timepicker-clock-item hour" :class="{'is-selected': item.isSelected}" :style="item.style" v-if="item.show" v-for="item of items">{{ item.label }}</button>
			</div>
		</div>
		<slot></slot>
	</div>

</template>

<script>

	import { raf, relativeCoordsTo, terminateEvent } from "../../js/util/dom";
	import { pythagorean } from "../../js/math";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";
	import { addEventListener } from "../../js/util/event";

	const innerRingOffset = -33;

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

		inject: ["popup"],

		props: {
			clockRadius: {default: 103, type: Number},
			value: {default: () => new Date(), type: Date}
		},

		beforeDestroy()
		{
			this.events.forEach(remove => remove());

			if (!this.popup)
				return;

			this.popup.$off("close", this.onPopupClosed);
		},

		data()
		{
			return {
				current: new Date(this.value.getTime()),
				currentHour: 0,
				currentMinute: 0,
				events: [],
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

			const clockMount = this.$el.querySelector(".timepicker-clock-mount");

			this.events.push(
				addEventListener(clockMount, "mousedown", onlyMouse(this.onPointerDown), {passive: false}),
				addEventListener(window, "mousemove", onlyMouse(this.onPointerMove), {passive: false}),
				addEventListener(window, "mouseup", onlyMouse(this.onPointerUp), {passive: false}),

				addEventListener(clockMount, "touchstart", onlyTouch(this.onPointerDown), {passive: false}),
				addEventListener(window, "touchmove", onlyTouch(this.onPointerMove), {passive: false}),
				addEventListener(window, "touchend", onlyTouch(this.onPointerUp), {passive: false})
			);

			if (!this.popup)
				return;

			this.popup.$on("close", this.onPopupClosed);
		},

		computed: {

			isAMPM()
			{
				return this.moment().localeData().longDateFormat("LT").endsWith("A");
			},

			isPM()
			{
				return this.current.getHours() >= 12;
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

			addHours(h)
			{
				let date = new Date(this.current.getTime());
				date.setHours(date.getHours() + h);
				this.current = date;

				this.$emit("input", this.current);
			},

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
						label: minute,
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
				if (this.view === view)
					return;

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

				terminateEvent(evt);

				/** @var {HTMLElement} clock */
				const clock = this.$el.querySelector(".timepicker-clock-mount");
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

			onPopupClosed()
			{
				this.view = "hours";
			},

			setAM()
			{
				if (!this.isPM)
					return;

				this.addHours(-12);
			},

			setPM()
			{
				if (this.isPM)
					return;

				this.addHours(12);
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
				this.$emit("input", this.current);
			},

			updatePointer()
			{
				if (this.view === "hours")
				{
					let item = this.items.find(i => i.value === this.current.getHours() % (this.isAMPM ? 12 : 24));
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
					const h = this.current.getHours();

					this.currentHour = this.isAMPM ? (this.isPM ? (h === 12 ? 12 : h - 12) : (h === 0 ? 12 : h)) : h;
					this.currentMinute = this.current.getMinutes();

					this.$nextTick(() => this.updatePointer());
				}
			},

			currentHour()
			{
				navigator.vibrate(1);
			},

			currentMinute()
			{
				navigator.vibrate(1);
			},

			value()
			{
				this.current = new Date(this.value.getTime());
			},

			view()
			{
				this.updatePointer();
			}

		}

	}

</script>
