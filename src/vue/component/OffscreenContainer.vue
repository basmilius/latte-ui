<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="offscreen-overlay" :class="overlayClasses" :style="overlayStyles">
		<div class="offscreen-content" :class="contentClasses" :style="contentStyles">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	import { getMainElement } from "../../js/core";
	import { closest } from "../../js/util/dom";

	const TRIGGER_SIZE = 30;

	function getPosition(evt)
	{
		if (evt.changedTouches === undefined)
			return {x: evt.clientX, y: evt.clientY};

		return {
			x: evt.changedTouches[0].clientX,
			y: evt.changedTouches[0].clientY
		};
	}

	export default {

		name: "latte-offscreen-container",

		props: {

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
			this.content = this.$el.querySelector("div.offscreen-content");

			window.addEventListener("resize", () => this.close());

			window.addEventListener("mousewheel", evt => this.onMouseWheel(evt), {passive: false});

			window.addEventListener("touchcancel", evt => this.onPointerCancel(evt), {passive: false});
			window.addEventListener("touchstart", evt => this.onPointerDown(evt), {passive: false});
			window.addEventListener("touchmove", evt => this.onPointerMove(evt), {passive: false});
			window.addEventListener("touchend", evt => this.onPointerUp(evt), {passive: false});
		},

		computed: {

			isOpen()
			{
				return this.current > 0.0;
			},

			contentClasses()
			{
				const classes = [];

				classes.push(`offscreen-${this.position}`);

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

				if (this.position === "top")
				{
					if (this.currentPosition.y >= this.previousPosition.y)
						this.current = 1;
					else
						this.current = 0;
				}

				if (this.position === "left")
				{
					if (this.currentPosition.x >= this.previousPosition.x)
						this.current = 1;
					else
						this.current = 0;
				}

				if (this.position === "right")
				{
					if (this.currentPosition.x <= this.previousPosition.x)
						this.current = 1;
					else
						this.current = 0;
				}

				if (this.position === "bottom")
				{
					if (this.currentPosition.y <= this.previousPosition.y)
						this.current = 1;
					else
						this.current = 0;
				}
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

				if (!this.isWithinElement(getPosition(evt), this.content))
					evt.preventDefault();
			},

			onPointerCancel(evt)
			{
				if (!this.touchEnabled)
					return;

				this.isDragging = false;
				this.currentPosition = getPosition(evt);

				this.checkState();
			},

			onPointerDown(evt)
			{
				if (!this.touchEnabled)
					return;

				const position = getPosition(evt);

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

				const position = getPosition(evt);

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

				this.currentPosition = getPosition(evt);
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
					getMainElement().classList.add("is-popup-opened");
				else
					getMainElement().classList.remove("is-popup-opened");
			}

		}

	}

</script>
