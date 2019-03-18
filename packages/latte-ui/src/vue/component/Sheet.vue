<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="sheet-overlay" :class="overlayClasses" :style="overlayStyles">
		<div class="sheet-content" :class="contentClasses" :style="contentStyles">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	import { closest, getCoords } from "../../js/util/dom";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";
	import { popupClosed, popupOpened } from "../../js/core/popup";

	const TRIGGER_SIZE = 24;

	export default {

		name: "latte-sheet",

		props: {

			mode: {
				default: "default",
				required: false,
				type: String,
				validator: val => ["default", "push", "overlay"].indexOf(val) > -1
			},

			position: {
				default: "left",
				required: false,
				type: String,
				validator: val => ["top", "left", "right", "bottom"].includes(val)
			},

			touchEnabled: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		data()
		{
			return {
				isDragging: false,
				current: 0.0,
				previous: 0.0,
				content: null,
				overlay: null,
				currentPosition: {x: 0, y: 0},
				previousPosition: {x: 0, y: 0},
				startPosition: {x: 0, y: 0},
				timer: null
			};
		},

		mounted()
		{
			this.overlay = this.$el;
			this.content = this.$el.querySelector("div.sheet-content");

			window.addEventListener("resize", () => this.close());

			window.addEventListener("touchcancel", onlyTouch(this.onPointerCancel), {passive: false});
			window.addEventListener("touchstart", onlyTouch(this.onPointerDown), {passive: false});
			window.addEventListener("touchmove", onlyTouch(this.onPointerMove), {passive: false});
			window.addEventListener("touchend", onlyTouch(this.onPointerUp), {passive: false});

			window.addEventListener("mousewheel", onlyMouse(this.onMouseWheel), {passive: false});
			window.addEventListener("mousedown", onlyMouse(this.onPointerDown), {passive: false});
			window.addEventListener("mouseup", onlyMouse(this.onPointerUp), {passive: false});
		},

		computed: {

			isOpen()
			{
				return this.current > 0.0;
			},

			contentClasses()
			{
				const classes = [];

				classes.push(`sheet-${this.position}`);

				if (this.isDragging)
					classes.push("is-dragging");

				if (this.isOpen)
					classes.push("is-open");

				return classes;
			},

			overlayClasses()
			{
				const classes = [];

				if (this.isDragging)
					classes.push("is-dragging");

				if (this.isOpen)
					classes.push("is-open");

				return classes;
			},

			contentStyles()
			{
				let touchAction;
				let transform;

				switch (this.position)
				{
					case "top":
						touchAction = "pan-x";
						transform = `translate3d(0, ${(this.current - 1) * 100}%, 0)`;
						break;

					case "left":
						touchAction = "pan-y";
						transform = `translate3d(${(this.current - 1) * 100}%, 0, 0)`;
						break;

					case "right":
						touchAction = "pan-y";
						transform = `translate3d(${(this.current - 1) * -100}%, 0, 0)`;
						break;

					case "bottom":
						touchAction = "pan-x";
						transform = `translate3d(0, ${(this.current - 1) * -100}%, 0)`;
						break;

				}

				return {
					touchAction,
					transform
				};
			},

			overlayStyles()
			{
				return {
					background: `rgba(0, 0, 0, ${this.current * .85})`
				};
			}

		},

		methods: {

			close()
			{
				this.current = 0.0;
				this.previous = 1.0;
			},

			open()
			{
				this.current = 1.0;
				this.previous = 0.0;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			},

			calculateCurrent()
			{
				const rect = this.content.getBoundingClientRect();

				switch (this.position)
				{
					case "top":
						return (this.currentPosition.y - this.startPosition.y) / rect.height;

					case "left":
						return (this.currentPosition.x - this.startPosition.x) / rect.width;

					case "right":
						return (this.currentPosition.x - this.startPosition.x) / rect.width * -1;

					case "bottom":
						return (this.currentPosition.y - this.startPosition.y) / rect.height * -1;

				}
			},

			checkState()
			{
				this.current = Math.max(0, Math.min(1, this.calculateCurrent() + this.previous));

				if (!(this.current > 0 && this.current < 1 && !this.isDragging))
					return;

				this.current = this.getEnd();
			},

			getEnd()
			{
				switch (this.position)
				{
					case "top":
						if (this.currentPosition.y >= this.previousPosition.y)
							return 1;
						else
							return 0;

					case "left":
						if (this.currentPosition.x >= this.previousPosition.x)
							return 1;
						else
							return 0;

					case "right":
						if (this.currentPosition.x <= this.previousPosition.x)
							return 1;
						else
							return 0;

					case "bottom":
						if (this.currentPosition.y <= this.previousPosition.y)
							return 1;
						else
							return 0;
				}

				return -1;
			},

			isContentDragAvailable(position)
			{
				if (this.current < 1)
					return true;

				if (!this.isWithinElement(position, this.content))
					return true;

				if (this.position === "left" || this.position === "right")
					return Math.abs(position.x - this.currentPosition.x) > TRIGGER_SIZE;

				if (this.position === "top" || this.position === "bottom")
					return Math.abs(position.y - this.currentPosition.y) > TRIGGER_SIZE;

				return true;
			},

			isWithinElement(position, element)
			{
				return closest(document.elementFromPoint(position.x, position.y), element) !== null;
			},

			isWithinTriggerBounds(position)
			{
				const rect = this.$el.getBoundingClientRect();

				switch (this.position)
				{
					case "top":
						return position.y - rect.top < TRIGGER_SIZE;

					case "left":
						return position.x - rect.left < TRIGGER_SIZE;

					case "right":
						return position.x > rect.left + rect.width - TRIGGER_SIZE;

					case "bottom":
						return position.y > rect.top + rect.height - TRIGGER_SIZE;
				}
			},

			onMouseWheel(evt)
			{
				if (!this.isOpen)
					return;

				const {deltaX, deltaY} = evt;

				if (Math.abs(deltaX) > 20 && (this.position === "left" || this.position === "right"))
					this.close();

				if (Math.abs(deltaY) > 20 && (this.position === "top" || this.position === "bottom"))
					this.close();

				if (!this.isWithinElement(getCoords(evt), this.content))
					evt.preventDefault();
			},

			onPointerCancel(evt)
			{
				if (!this.touchEnabled)
					return;

				this.isDragging = false;
				this.currentPosition = getCoords(evt);

				this.checkState();
			},

			onPointerDown(evt)
			{
				if (!this.touchEnabled)
					return;

				const position = getCoords(evt);

				if (!this.isOpen && !this.isWithinTriggerBounds(position))
					return;

				this.isDragging = true;

				this.previous = this.current;
				this.currentPosition = position;
				this.previousPosition = position;
				this.startPosition = position;

				this.checkState();
			},

			onPointerMove(evt)
			{
				if (!this.touchEnabled)
					return;

				if (!this.isDragging)
					return;

				const position = getCoords(evt);

				if (!this.isContentDragAvailable(position))
					return;

				this.previousPosition = this.currentPosition;
				this.currentPosition = position;

				this.checkState();
			},

			onPointerUp(evt)
			{
				if (!this.touchEnabled)
					return;

				if (!this.isDragging)
					return;

				const isSameLocation = this.currentPosition.x === this.startPosition.x && this.currentPosition.y === this.startPosition.y;

				if (!isSameLocation && evt.cancelable)
					evt.preventDefault();

				this.currentPosition = getCoords(evt);
				this.isDragging = false;

				if (this.previous === 1 && isSameLocation && !this.isWithinElement(this.currentPosition, this.content))
					this.current = 0.0;
				else
					this.checkState();
			}

		},

		watch: {

			isOpen()
			{
				if (this.isOpen)
					popupOpened();
				else
					popupClosed();
			}

		}

	}

</script>
