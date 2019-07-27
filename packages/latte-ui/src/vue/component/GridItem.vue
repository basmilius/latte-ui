<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div ref="item" class="latte-grid-item" :class="{'is-draggable': isDraggable, 'is-dragging': is_dragging, 'is-resizable': isResizable, 'is-resizing': is_resizing}" :style="style" role="gridcell">
		<slot></slot>
		<div class="grid-item-resize-handle" v-if="resizable"></div>
	</div>

</template>

<script>

	import { createCoreData, eventBus, getControlPosition, setTransform } from "../../js/ui/grid";

	export default {

		name: "latte-grid-item",

		props: {
			id: {required: true},
			isDraggable: {default: true, type: Boolean},
			isResizable: {default: true, type: Boolean},
			maxHeight: {default: Infinity, type: Number},
			maxWidth: {default: Infinity, type: Number},
			minHeight: {default: 1, type: Number},
			minWidth: {default: 1, type: Number},
			x: {required: true, type: Number},
			y: {required: true, type: Number},
			height: {required: true, type: Number},
			width: {required: true, type: Number},
			dragIgnoreFrom: {default: null, type: String | null},
			dragAllowFrom: {default: ".grid-item-drag-handle", type: String | null},
			resizeIgnoreFrom: {default: null, type: String | null},
			resizeAllowFrom: {default: ".grid-item-resize-handle", type: String | null}
		},

		beforeDestroy()
		{
			eventBus.$off("updateWidth", this.updateWidthHandler);
			eventBus.$off("compact", this.compactHandler);
			eventBus.$off("setDraggable", this.setDraggableHandler);
			eventBus.$off("setResizable", this.setResizableHandler);
			eventBus.$off("setRowHeight", this.setRowHeightHandler);
			eventBus.$off("setColumns", this.setColumns);
		},

		created()
		{
			const $this = this;

			this.updateWidthHandler = function (width)
			{
				$this.updateWidth(width);
			};

			this.compactHandler = function (layout)
			{
				$this.compact(layout);
			};

			this.setDraggableHandler = function (isDraggable)
			{
				$this.draggable = isDraggable;
			};

			this.setResizableHandler = function (isResizable)
			{
				$this.resizable = isResizable;
			};

			this.setRowHeightHandler = function (rowHeight)
			{
				$this.rowHeight = rowHeight;
			};

			this.setColumns = function (colNum)
			{
				$this.columns = parseInt(colNum);
			};

			eventBus.$on("updateWidth", this.updateWidthHandler);
			eventBus.$on("compact", this.compactHandler);
			eventBus.$on("setDraggable", this.setDraggableHandler);
			eventBus.$on("setResizable", this.setResizableHandler);
			eventBus.$on("setRowHeight", this.setRowHeightHandler);
			eventBus.$on("setColumns", this.setColumns);
		},

		data()
		{
			return {
				columns: 1,
				containerWidth: 100,
				rowHeight: 100,
				margin: [24, 24],
				maxRows: Infinity,
				draggable: null,
				resizable: null,

				dragging: null,
				resizing: null,

				lastX: NaN,
				lastY: NaN,
				lastHeight: NaN,
				lastWidth: NaN,

				isDragEventSet: false,
				isResizeEventSet: false,

				previousX: null,
				previousY: null,
				previousHeight: null,
				previousWidth: null,

				innerX: this.x,
				innerY: this.y,
				innerHeight: this.height,
				innerWidth: this.width,

				style: {}
			};
		},

		mounted()
		{
			this.columns = this.$parent.columns;
			this.rowHeight = this.$parent.rowHeight;
			this.containerWidth = this.$parent.width !== null ? this.$parent.width : 100;
			this.margin = this.$parent.margin !== undefined ? this.$parent.margin : [24, 24];
			this.maxRows = this.$parent.maxRows;

			if (this.isDraggable === null)
				this.draggable = this.$parent.isDraggable;
			else
				this.draggable = this.isDraggable;

			if (this.isResizable === null)
				this.resizable = this.$parent.isResizable;
			else
				this.resizable = this.isResizable;

			this.createStyle();
		},

		computed: {

			is_dragging()
			{
				return this.dragging !== null;
			},

			is_resizing()
			{
				return this.resizing !== null;
			},

			resize_handle_class()
			{
				return "grid-item-resize-handle";
			}

		},

		methods: {

			calculateColumnWidth()
			{
				return (this.containerWidth - (this.margin[0] * (this.columns + 1))) / this.columns;
			},

			calculatePosition(x, y, width, height)
			{
				const columnWidth = this.calculateColumnWidth();

				return {
					top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
					left: Math.round(columnWidth * x + (x + 1) * this.margin[0]),
					height: height === Infinity ? height : Math.round(this.rowHeight * height + Math.max(0, height - 1) * this.margin[1]),
					width: width === Infinity ? width : Math.round(columnWidth * width + Math.max(0, width - 1) * this.margin[0])
				};
			},

			calculateWidthHeight(height, width)
			{
				const columnWidth = this.calculateColumnWidth();

				let w = Math.round((width + this.margin[0]) / (columnWidth + this.margin[0]));
				let h = Math.round((height + this.margin[1]) / (this.rowHeight + this.margin[1]));

				return {
					width: Math.max(Math.min(w, this.columns - this.innerX), 0),
					height: Math.max(Math.min(h, this.maxRows - this.innerY), 0)
				};
			},

			calculateXY(top, left)
			{
				const columnWidth = this.calculateColumnWidth();

				let x = Math.round((left - this.margin[0]) / (columnWidth + this.margin[0]));
				let y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1]));

				x = Math.max(Math.min(x, this.columns - this.innerWidth), 0);
				y = Math.max(Math.min(y, this.maxRows - this.innerHeight), 0);

				return {x, y};
			},

			compact()
			{
				this.createStyle();
			},

			createStyle()
			{
				if (this.x + this.width > this.columns)
				{
					this.innerX = 0;
					this.innerWidth = (this.width > this.columns) ? this.columns : this.width;
				}
				else
				{
					this.innerX = this.x;
					this.innerWidth = this.width;
				}

				const pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

				if (this.is_dragging)
				{
					pos.top = this.dragging.top;
					pos.left = this.dragging.left;
				}

				if (this.is_resizing)
				{
					pos.height = this.resizing.height;
					pos.width = this.resizing.width;
				}

				this.style = setTransform(pos.top, pos.left, pos.width, pos.height);
			},

			handleDrag(evt)
			{
				if (this.is_resizing)
					return;

				const position = getControlPosition(evt);
				const {x, y} = position;

				let shouldUpdate = false;

				const newPosition = {top: 0, left: 0};
				let parentRect;
				let clientRect;

				switch (evt.type)
				{
					case "dragstart":
					{
						this.previousX = this.innerX;
						this.previousY = this.innerY;

						parentRect = evt.target.offsetParent.getBoundingClientRect();
						clientRect = evt.target.getBoundingClientRect();

						newPosition.left = clientRect.left - parentRect.left;
						newPosition.top = clientRect.top - parentRect.top;

						this.dragging = newPosition;
						break;
					}

					case "dragend":
					{
						if (!this.is_dragging)
							return;

						parentRect = evt.target.offsetParent.getBoundingClientRect();
						clientRect = evt.target.getBoundingClientRect();

						newPosition.left = clientRect.left - parentRect.left;
						newPosition.top = clientRect.top - parentRect.top;

						this.dragging = null;
						shouldUpdate = true;
						break;
					}

					case "dragmove":
					{
						const coreEvent = createCoreData(this.lastX, this.lastY, x, y);

						newPosition.left = this.dragging.left + coreEvent.deltaX;
						newPosition.top = this.dragging.top + coreEvent.deltaY;

						this.dragging = newPosition;
						break;
					}
				}

				const pos = this.calculateXY(newPosition.top, newPosition.left);

				this.lastX = x;
				this.lastY = y;

				if (this.innerX !== pos.x || this.innerY !== pos.y)
					this.$emit("move", this.id, pos.x, pos.y);

				if (evt.type === "dragend" && (this.previousX !== this.innerX || this.previousY !== this.innerY))
					this.$emit("moved", this.id, pos.x, pos.y);

				eventBus.$emit("dragEvent", evt.type, this.id, pos.x, pos.y, this.innerHeight, this.innerWidth);
			},

			handleResize(evt)
			{
				const position = getControlPosition(evt);
				const {x, y} = position;

				const newSize = {width: 0, height: 0};

				switch (evt.type)
				{
					case "resizestart":
					{
						this.previousHeight = this.innerHeight;
						this.previousWidth = this.innerWidth;

						const pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

						newSize.height = pos.height;
						newSize.width = pos.width;

						this.resizing = newSize;
						break;
					}

					case "resizemove":
					{
						const coreEvent = createCoreData(this.lastWidth, this.lastHeight, x, y);

						newSize.height = this.resizing.height + coreEvent.deltaY;
						newSize.width = this.resizing.width + coreEvent.deltaX;

						this.resizing = newSize;
						break;
					}

					case "resizeend":
					{
						const pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

						newSize.height = pos.height;
						newSize.width = pos.width;

						this.resizing = null;
						break;
					}
				}

				const pos = this.calculateWidthHeight(newSize.height, newSize.width);

				if (pos.width < this.minWidth)
					pos.width = this.minWidth;

				if (pos.width > this.maxWidth)
					pos.width = this.maxWidth;

				if (pos.height < this.minHeight)
					pos.height = this.minHeight;

				if (pos.height > this.maxHeight)
					pos.height = this.maxHeight;

				if (pos.height < 1)
					pos.height = 1;

				if (pos.width < 1)
					pos.width = 1;

				this.lastHeight = y;
				this.lastWidth = x;

				if (this.innerWidth !== pos.width || this.innerHeight !== pos.height)
					this.$emit("resize", this.id, pos.height, pos.width);

				if (evt.type === "resizeend" && (this.previousWidth !== this.innerWidth || this.previousHeight !== this.innerHeight))
					this.$emit("resized", this.id, newSize.height, newSize.width);

				eventBus.$emit("resizeEvent", evt.type, this.id, this.innerX, this.innerY, pos.height, pos.width);
			},

			updateWidth(width, column)
			{
				this.containerWidth = width;

				if (typeof column !== "undefined")
					this.column = column;
			}

		},

		watch: {

			columns()
			{
				this.createStyle();
			},

			containerWidth()
			{
				this.createStyle();
			},

			draggable()
			{
				if (typeof this.interact === "undefined" || this.interact === null)
					this.interact = interact(this.$refs.item);

				if (this.draggable)
				{
					this.interact.draggable({
						allowFrom: this.dragAllowFrom,
						ignoreFrom: this.dragIgnoreFrom
					});

					if (!this.isDragEventSet)
					{
						this.isDragEventSet = true;

						this.interact.on("dragstart dragmove dragend", evt => this.handleDrag(evt));
					}
				}
				else
				{
					this.interact.draggable({
						enabled: false
					});
				}
			},

			height()
			{
				this.innerHeight = this.height;
				this.createStyle();
			},

			isDraggable()
			{
				this.draggable = this.isDraggable;
			},

			isResizable()
			{
				this.resizable = this.isResizable;
			},

			resizable()
			{
				if (typeof this.interact === "undefined" || this.interact === null)
					this.interact = interact(this.$refs.item);

				if (this.resizable)
				{
					this.interact.resizable({
						preserveAspectRatio: false,
						edges: {
							top: false,
							left: false,
							right: `.${this.resize_handle_class}`,
							bottom: `.${this.resize_handle_class}`
						},
						ignoreFrom: this.resizeIgnoreFrom
					});

					if (!this.isResizeEventSet)
					{
						this.isResizeEventSet = true;

						this.interact.on("resizestart resizemove resizeend", evt => this.handleResize(evt));
					}
				}
				else
				{
					this.interact.resizable({
						enabled: false
					});
				}
			},

			rowHeight()
			{
				this.createStyle();
			},

			width()
			{
				this.innerWidth = this.width;
				this.createStyle();
			},

			x()
			{
				this.innerX = this.x;
				this.createStyle();
			},

			y()
			{
				this.innerY = this.y;
				this.createStyle();
			}

		}

	}

</script>
