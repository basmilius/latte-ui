<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div ref="grid" class="latte-grid" :class="{'is-dragging': is_dragging}" :style="styles" role="grid">
		<slot></slot>
		<latte-grid-item class="latte-grid-placeholder" v-show="isDragging" :x="placeholder.x" :y="placeholder.y" :height="placeholder.height" :width="placeholder.width" id="__placeholder__"></latte-grid-item>
	</div>

</template>

<script>

	import { bottom, compact, eventBus, getLayoutItem, moveElement, validateLayout } from "../../js/ui/grid";

	export default {

		name: "latte-grid",

		props: {
			autoSize: {default: true, type: Boolean},
			columns: {default: 12, type: Number},
			rowHeight: {default: 100, type: Number},
			maxRows: {default: Infinity, type: Number},
			margin: {default: () => [24, 24], type: Array},
			isDraggable: {default: true, type: Boolean},
			isResizable: {default: true, type: Boolean},
			verticalCompact: {default: true, type: Boolean},
			layout: {required: true, type: Array}
		},

		beforeDestroy()
		{
			eventBus.$off("dragEvent", this.dragEventHandler);
			eventBus.$off("resizeEvent", this.resizeEventHandler);

			window.removeEventListener("resize", this.onWindowResize);
		},

		created()
		{
			const $this = this;

			this.dragEventHandler = function (eventType, id, x, y, height, width)
			{
				$this.dragEvent(eventType, id, x, y, height, width);
			};

			this.resizeEventHandler = function (eventType, id, x, y, height, width)
			{
				$this.resizeEvent(eventType, id, x, y, height, width);
			};

			eventBus.$on("dragEvent", this.dragEventHandler);
			eventBus.$on("resizeEvent", this.resizeEventHandler);
		},

		data()
		{
			return {
				width: null,
				mergedStyle: {},
				lastLayoutLength: 0,
				isDragging: false,
				placeholder: {
					x: 0,
					y: 0,
					height: 0,
					width: 0
				}
			};
		},

		mounted()
		{
			const $this = this;

			this.$nextTick(() =>
			{
				validateLayout(this.layout);

				const init = () =>
				{
					if (this.width === null)
					{
						this.onWindowResize();

						window.addEventListener("resize", this.onWindowResize);
					}

					compact(this.layout, this.verticalCompact);

					this.updateHeight();

					this.$nextTick(() =>
					{
						elementResizeDetectorMaker({strategy: "scroll"}).listenTo(this.$refs.grid, function ()
						{
							$this.onWindowResize();
						});
					});
				};

				this.$nextTick(() => init());

				window.onload = init.bind(this);
			});
		},

		computed: {

			is_dragging()
			{
				return this.isDragging;
			},

			styles()
			{
				return this.mergedStyle
			}

		},

		methods: {

			containerHeight()
			{
				if (!this.autoSize)
					return;

				return `${bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1]}px`;
			},

			dragEvent(eventType, id, x, y, height, width)
			{
				if (eventType === "dragmove" || eventType === "dragstart")
				{
					this.placeholder.x = x;
					this.placeholder.y = y;
					this.placeholder.height = height;
					this.placeholder.width = width;

					this.$nextTick(() => this.isDragging = true);

					eventBus.$emit("updateWidth", this.width);
				}
				else
				{
					this.$nextTick(() => this.isDragging = false);
				}

				let item = getLayoutItem(this.layout, id);

				if (item === undefined || item === null)
					item = {x: 0, y: 0};

				item.x = x;
				item.y = y;

				this.layout = moveElement(this.layout, item, x, y, true);

				compact(this.layout, this.verticalCompact);
				eventBus.$emit("compact");

				this.updateHeight();

				if (eventType === "dragend")
					this.$emit("layout-updated", this.layout);
			},

			layoutUpdate()
			{
				if (typeof this.layout === "undefined")
					return;

				if (this.layout.length !== this.lastLayoutLength)
					this.lastLayoutLength = this.layout.length;

				compact(this.layout, this.verticalCompact);
				eventBus.$emit("updateWidth", this.width);
				this.updateHeight();
			},

			onWindowResize()
			{
				if (typeof this.$refs.grid === "undefined")
					return;

				this.width = this.$refs.grid.offsetWidth;
			},

			resizeEvent(eventType, id, x, y, height, width)
			{
				if (eventType === "resizestart" || eventType === "resizemove")
				{
					this.placeholder.x = x;
					this.placeholder.y = y;
					this.placeholder.height = height;
					this.placeholder.width = width;

					this.$nextTick(() => this.isDragging = true);
					eventBus.$emit("updateWidth", this.width);
				}
				else
				{
					this.$nextTick(() => this.isDragging = false);
				}

				let item = getLayoutItem(this.layout, id);

				if (item === undefined || item === null)
					item = {height: 0, width: 0};

				item.height = height;
				item.width = width;

				compact(this.layout, this.verticalCompact);
				eventBus.$emit("compact");

				this.updateHeight();

				if (eventType === "resizeend")
					this.$emit("layout-updated", this.layout);
			},

			updateHeight()
			{
				this.mergedStyle = {
					height: this.containerHeight()
				};
			}

		},

		watch: {

			columns()
			{
				eventBus.$emit("setColumns", this.columns);
			},

			isDraggable()
			{
				eventBus.$emit("setDraggable", this.isDraggable);
			},

			isResizable()
			{
				eventBus.$emit("setResizable", this.isResizable);
			},

			layout()
			{
				this.layoutUpdate();
			},

			rowHeight()
			{
				eventBus.$emit("setRowHeight", this.rowHeight);
			},

			width()
			{
				this.$nextTick(() =>
				{
					eventBus.$emit("updateWidth", this.width);
					this.updateHeight();
				});
			}

		}

	}

</script>
