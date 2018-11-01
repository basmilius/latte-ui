/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

/**
 * Creates the latte-grid and latte-grid-item components.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component("latte-grid", {

		props: {

			autoSize: {
				default: true,
				required: false,
				type: Boolean
			},

			columns: {
				default: 12,
				required: false,
				type: Number
			},

			rowHeight: {
				default: 100,
				required: false,
				type: Number
			},

			maxRows: {
				default: Infinity,
				required: false,
				type: Number
			},

			margin: {
				default: () => [24, 24],
				required: false,
				type: Array
			},

			isDraggable: {
				default: true,
				required: false,
				type: Boolean
			},

			isResizable: {
				default: true,
				required: false,
				type: Boolean
			},

			verticalCompact: {
				default: true,
				required: false,
				type: Boolean
			},

			layout: {
				required: true,
				type: Array
			}

		},

		template: `	<div ref="grid" class="latte-grid" :class="{'is-dragging': is_dragging}" :style="styles" role="grid">
						<slot></slot>
						<latte-grid-item class="latte-grid-placeholder" v-show="isDragging" :x="placeholder.x" :y="placeholder.y" :height="placeholder.height" :width="placeholder.width" id="__placeholder__"></latte-grid-item>
					</div>`,

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

				this.width = this.$refs["grid"].offsetWidth;
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

	});

	Vue.component("latte-grid-item", {

		props: {

			id: {
				required: true
			},

			isDraggable: {
				default: true,
				required: false,
				type: Boolean
			},

			isResizable: {
				default: true,
				required: false,
				type: Boolean
			},

			maxHeight: {
				default: Infinity,
				required: false,
				type: Number
			},

			maxWidth: {
				default: Infinity,
				required: false,
				type: Number
			},

			minHeight: {
				default: 1,
				required: false,
				type: Number
			},

			minWidth: {
				default: 1,
				required: false,
				type: Number
			},

			x: {
				required: true,
				type: Number
			},

			y: {
				required: true,
				type: Number
			},

			height: {
				required: true,
				type: Number
			},

			width: {
				required: true,
				type: Number
			},

			dragIgnoreFrom: {
				default: null,
				required: false,
				type: String | null
			},

			dragAllowFrom: {
				default: ".grid-item-drag-handle",
				required: false,
				type: String | null
			},

			resizeIgnoreFrom: {
				default: null,
				required: false,
				type: String | null
			},

			resizeAllowFrom: {
				default: ".grid-item-resize-handle",
				required: false,
				type: String | null
			}

		},

		template: `	<div ref="item" class="latte-grid-item" :class="{'is-draggable': isDraggable, 'is-dragging': is_dragging, 'is-resizable': isResizable, 'is-resizing': is_resizing}" :style="style" role="gridcell">
						<slot></slot>
						<div class="grid-item-resize-handle" v-if="resizable"></div>
					</div>`,

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

				if (event.type === "resizeend" && (this.previousWidth !== this.innerWidth || this.previousHeight !== this.innerHeight))
					this.$emit("resized", this.id, newSize.height, newSize.width);

				eventBus.$emit("resizeEvent", event.type, this.id, this.innerX, this.innerY, pos.height, pos.width);
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
				// noinspection JSUnusedGlobalSymbols
				this.innerWidth = this.width;
				this.createStyle();
			},

			x()
			{
				// noinspection JSUnusedGlobalSymbols
				this.innerX = this.x;
				this.createStyle();
			},

			y()
			{
				this.innerY = this.y;
				this.createStyle();
			}

		}

	});

}

const eventBus = new Vue({});

function bottom(layout)
{
	let max = 0, bottomY;

	for (let i = 0, len = layout.length; i < len; i++)
	{
		bottomY = layout[i].y + layout[i].height;

		if (bottomY > max)
			max = bottomY;
	}

	return max;
}

function collides(item1, item2)
{
	if (item1 === item2)
		return false;

	if (item1.x + item1.width <= item2.x)
		return false;

	if (item1.x >= item2.x + item2.width)
		return false;

	if (item1.y + item1.height <= item2.y)
		return false;

	if (item1.y >= item2.y + item2.height)
		return false;

	// Yay!

	return true;
}

function compact(layout, verticalCompact)
{
	const compareWith = getStatics(layout);
	const sorted = sortLayoutItemsByRowCol(layout);
	const out = Array(layout.length);

	for (let i = 0, len = sorted.length; i < len; i++)
	{
		let item = sorted[i];

		if (!item.static)
		{
			item = compactItem(compareWith, item, verticalCompact);

			compareWith.push(item);
		}

		out[layout.indexOf(item)] = item;

		item.moved = false;
	}

	return out;
}

function compactItem(compareWith, item, verticalCompact)
{
	if (verticalCompact)
		while (item.y > 0 && !getFirstCollision(compareWith, item))
			item.y--;

	let collides;

	while ((collides = getFirstCollision(compareWith, item)))
		item.y = collides.y + collides.height;

	return item;
}

function createCoreData(lastX, lastY, x, y)
{
	const isStart = !isNum(lastX);

	if (isStart)
	{
		return {
			deltaX: 0, deltaY: 0,
			lastX: x, lastY: y,
			x: x, y: y
		};
	}
	else
	{
		return {
			deltaX: x - lastX, deltaY: y - lastY,
			lastX: lastX, lastY: lastY,
			x: x, y: y
		};
	}
}

function getAllCollisions(layout, layoutItem)
{
	return layout.filter((l) => collides(l, layoutItem));
}

function getControlPosition(evt)
{
	return offsetXYFromParentOf(evt);
}

function getFirstCollision(layout, layoutItem)
{
	for (let i = 0, len = layout.length; i < len; i++)
		if (collides(layout[i], layoutItem))
			return layout[i];
}

function getLayoutItem(layout, id)
{
	for (let i = 0, len = layout.length; i < len; i++)
		if (layout[i].i === id)
			return layout[i];
}

function getStatics(layout)
{
	return layout.filter((l) => l.static);
}

function isNum(num)
{
	return typeof num === "number" && !isNaN(num);
}

function moveElement(layout, item, x, y, isUserAction)
{
	if (item.static)
		return layout;

	if (item.y === y && item.x === x) return layout;

	const movingUp = y && item.y > y;

	if (typeof x === "number")
		item.x = x;

	if (typeof y === "number")
		item.y = y;

	item.moved = true;

	let sorted = sortLayoutItemsByRowCol(layout);

	if (movingUp)
		sorted = sorted.reverse();

	const collisions = getAllCollisions(sorted, item);

	for (let i = 0, len = collisions.length; i < len; i++)
	{
		const collision = collisions[i];

		if (collision.moved)
			continue;


		if (item.y > collision.y && item.y - collision.y > collision.height / 4)
			continue;

		if (collision.static)
			layout = moveElementAwayFromCollision(layout, collision, item, isUserAction);
		else
			layout = moveElementAwayFromCollision(layout, item, collision, isUserAction);
	}

	return layout;
}

function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction)
{
	if (isUserAction)
	{
		const fakeItem = {
			x: itemToMove.x,
			y: itemToMove.y,
			width: itemToMove.width,
			height: itemToMove.height,
			id: "__fake__"
		};

		fakeItem.y = Math.max(collidesWith.y - itemToMove.height, 0);

		if (!getFirstCollision(layout, fakeItem))
			return moveElement(layout, itemToMove, undefined, fakeItem.y);
	}

	return moveElement(layout, itemToMove, undefined, itemToMove.y + 1);
}

function offsetXYFromParentOf(evt)
{
	const offsetParent = evt.target.offsetParent || document.body;
	const offsetParentRect = evt.offsetParent === document.body ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

	const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
	const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

	return {x, y};
}

function setTransform(top, left, width, height)
{
	const translate = `translate3d(${left}px,${top}px, 0)`;

	return {
		transform: translate,
		WebkitTransform: translate,
		MozTransform: translate,
		msTransform: translate,
		OTransform: translate,
		width: width + "px",
		height: height + "px",
		position: "absolute"
	};
}

function sortLayoutItemsByRowCol(layout)
{
	return [].concat(layout).sort((a, b) => (a.y > b.y || (a.y === b.y && a.x > b.x)) ? 1 : -1);
}

function validateLayout(layout, contextName = "Layout")
{
	const subProps = ["x", "y", "width", "height"];

	if (!Array.isArray(layout))
		throw new Error(`${contextName} must be an array!`);

	for (let i = 0, len = layout.length; i < len; i++)
	{
		const item = layout[i];

		for (let j = 0; j < subProps.length; j++)
			if (typeof item[subProps[j]] !== "number")
				throw new Error(`Latte Grid: ${contextName}[${i}].${subProps[j]} must be a number!`);

		if (item.i && typeof item.i !== "string")
			throw new Error(`Latte Grid: ${contextName}[${i}].i must be a string!`);

		if (item.static !== undefined && typeof item.static !== "boolean")
			throw new Error(`Latte Grid: ${contextName}[${i}].static must be a boolean!`);
	}
}
