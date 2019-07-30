<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
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

	import { popupClosed, popupOpened } from "../../js/core/popup";
	import { closest, getCoords, terminateEvent } from "../../js/util/dom";
	import { onlyMouse, onlyTouch } from "../../js/util/touch";
	import { oneOf } from "../../js/helper/array";
	import { isSomethingScrolling } from "../../js/ui/scrollbar";

	const TRIGGER_SIZE = 18;

	export default {

		name: "latte-sheet",

		props: {
			position: {default: "left", type: String, validator: oneOf(["top", "left", "right", "bottom"])},
			peekEnabled: {default: true, type: Boolean},
			touchEnabled: {default: true, type: Boolean}
		},

		data()
		{
			return {
				events: [0, 0, 0, 0, 0, 0],
				isDragging: false,
				isPeeking: false,
				current: 0.0,
				previous: 0.0,
				content: null,
				overlay: null,
				currentPosition: {x: 0, y: 0},
				previousPosition: {x: 0, y: 0},
				startPosition: {x: 0, y: 0}
			};
		},

		destroyed()
		{
			if (this.isOpen)
				popupClosed();

			window.removeEventListener("resize", this.close);

			window.removeEventListener("touchcancel", this.events[0]);
			window.removeEventListener("touchstart", this.events[1]);
			window.removeEventListener("touchmove", this.events[2]);
			window.removeEventListener("touchend", this.events[3]);

			window.removeEventListener("mousedown", this.events[4]);
			window.removeEventListener("mouseup", this.events[5]);
		},

		mounted()
		{
			this.overlay = this.$el;
			this.content = this.$el.querySelector("div.sheet-content");

			window.addEventListener("resize", this.close);

			window.addEventListener("touchcancel", this.events[0] = onlyTouch(this.onPointerCancel), {passive: false});
			window.addEventListener("touchstart", this.events[1] = onlyTouch(this.onPointerDown), {passive: false});
			window.addEventListener("touchmove", this.events[2] = onlyTouch(this.onPointerMove), {passive: false});
			window.addEventListener("touchend", this.events[3] = onlyTouch(this.onPointerUp), {passive: false});

			window.addEventListener("mousedown", this.events[4] = onlyMouse(this.onPointerDown), {passive: false});
			window.addEventListener("mouseup", this.events[5] = onlyMouse(this.onPointerUp), {passive: false});
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
					background: `rgba(var(--overlay-background), calc(${this.current} * var(--overlay-opacity)))`
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

			peek()
			{
				if (!this.peekEnabled)
					return false;

				const {height, width} = this.content.getBoundingClientRect();

				this.current = TRIGGER_SIZE / (this.position === "left" || this.position === "right" ? width : height);
				this.isPeeking = true;

				return true;
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
				const {height, width} = this.content.getBoundingClientRect();

				if (!this.currentPosition || !this.startPosition)
					return this.current;

				switch (this.position)
				{
					case "top":
						return (this.currentPosition.y - this.startPosition.y) / height;

					case "left":
						return (this.currentPosition.x - this.startPosition.x) / width;

					case "right":
						return (this.currentPosition.x - this.startPosition.x) / width * -1;

					case "bottom":
						return (this.currentPosition.y - this.startPosition.y) / height * -1;
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
				if (!position)
					return false;

				return closest(document.elementFromPoint(position.x, position.y), element) !== null;
			},

			isWithinTriggerBounds(position)
			{
				if (position === undefined)
					return false;

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

			onPointerCancel(evt)
			{
				if (!this.touchEnabled || !this.isDragging)
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

				if (this.isOpen && closest(evt.target, ".sheet-content") === null)
					terminateEvent(evt);

				this.currentPosition = position;
				this.previousPosition = position;
				this.startPosition = position;

				if (!this.isOpen && this.peek())
				{
					terminateEvent(evt);

					this.previous = this.current;
					this.previousPosition.x += this.position === "left" ? 1 : -1;
					this.previousPosition.y += this.position === "top" ? 1 : -1;
				}
				else
				{
					this.previous = this.current;
					this.isDragging = true;

					this.checkState();
				}
			},

			onPointerMove(evt)
			{
				if (this.isPeeking)
					this.isPeeking = !(this.isDragging = true);

				if (!this.touchEnabled || !this.isDragging || isSomethingScrolling)
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
				if (this.isPeeking)
					this.isPeeking = !(this.isDragging = true);

				if (!this.touchEnabled || !this.isDragging || this.currentPosition === undefined || this.startPosition === undefined)
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
