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
 * Creates the latte-draggable components.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component('latte-draggable', {

		props: {
			options: Object,
			list: {
				type: Array,
				required: false,
				default: null
			},
			value: {
				type: Array,
				required: false,
				default: null
			},
			noTransitionOnDrag: {
				type: Boolean,
				default: false
			},
			clone: {
				type: Function,
				default: function (original)
				{
					return original;
				}
			},
			element: {
				type: String,
				default: 'div'
			},
			move: {
				type: Function,
				default: null
			}
		},

		/**
		 * Returns the initial data for Vue.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				componentMode: false,
				transitionMode: false
			};
		},

		computed: {

			/**
			 * Returns the root container.
			 *
			 * @returns {Element}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			rootContainer()
			{
				return this.transitionMode ? this.$el.children[0] : this.$el;
			},

			/**
			 * Returns TRUE if we're cloning.
			 *
			 * @returns {Boolean}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			isCloning()
			{
				return this.options && this.options.group && this.options.group['pull'] === 'clone';
			},

			/**
			 * Returns the real list with draggables.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			realList()
			{
				return this.list ? this.list : this.value;
			}

		},

		methods: {

			/**
			 * Gets the child nodes.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			getChildrenNodes()
			{
				if (this.componentMode)
					return this.$children[0].$slots.default;

				let rawNodes = this.$slots.default;

				return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
			},

			/**
			 * Computes indexes.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			computeIndexes()
			{
				this.$nextTick(() => this.visibleIndexes = computeIndexes(this.getChildrenNodes(), this.rootContainer.children, this.transitionMode));
			},

			/**
			 * Gets the underlying virtual node.
			 *
			 * @param {HTMLElement} htmlElement
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			getUnderlyingVm(htmlElement)
			{
				let index = computeVmIndex(this.getChildrenNodes() || [], htmlElement);

				if (index === -1)
					return null; // Edge case during move callback: related element might be an element different from collection.

				return {index: index, element: this.realList[index]};
			},

			/**
			 * Gets the underlying potencial draggable component.
			 *
			 * @param {*} reference
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			getUnderlyingPotencialDraggableComponent(reference)
			{
				const vue = reference.__vue__;

				if (!vue || !vue.$options || vue.$options._componentTag !== 'transition-group')
					return vue;

				return vue.$parent;
			},

			/**
			 * Emits changes.
			 *
			 * @param {*} event
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			emitChanges(event)
			{
				this.$nextTick(() => this.$emit('change', event));
			},

			/**
			 * Alters the list with draggables.
			 *
			 * @param {Function} onList
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			alterList(onList)
			{
				if (this.list)
				{
					onList(this.list);
				}
				else
				{
					let newList = [].concat(_toConsumableArray(this.value));
					onList(newList);
					this.$emit('input', newList);
				}
			},

			/**
			 * Splices the list with draggables.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			spliceList()
			{
				let _arguments = arguments;
				this.alterList(list => list.splice.apply(list, _arguments));
			},

			/**
			 * Updates the position.
			 *
			 * @param {Number} oldIndex
			 * @param {Number} newIndex
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			updatePosition(oldIndex, newIndex)
			{
				this.alterList(list => list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]));
			},

			/**
			 * Gets the related context from moving element.
			 *
			 * @param {*} reference
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			getRelatedContextFromMoveElement(reference)
			{
				let to = reference.to,
					related = reference.related;

				let component = this.getUnderlyingPotencialDraggableComponent(reference);

				if (!component)
					return {component: component};

				let list = component.realList;
				let context = {list: list, component: component};

				if (to !== related && list && component.getUnderlyingVm)
				{
					let destination = component.getUnderlyingVm(related);

					if (destination)
						return _extends(destination, context);
				}

				return context;
			},

			/**
			 * Gets the virtual index.
			 *
			 * @param {Number} domIndex
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			getVmIndex(domIndex)
			{
				let indexes = this.visibleIndexes;
				let numberIndexes = indexes.length;

				return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
			},

			/**
			 * Gets the component instance.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			getComponent()
			{
				return this.$slots.default[0].componentInstance;
			},

			/**
			 * Resets transition data.
			 *
			 * @param {Number} index
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			resetTransitionData(index)
			{
				if (!this.noTransitionOnDrag || !this.transitionMode)
					return;

				let nodes = this.getChildrenNodes();
				nodes[index].data = null;

				let transitionContainer = this.getComponent();
				transitionContainer.children = [];
				transitionContainer.kept = undefined;
			},

			/**
			 * Invoked on drag start.
			 *
			 * @param {*} event
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragStart(event)
			{
				this.context = this.getUnderlyingVm(event.item);
				event.item._underlying_vm_ = this.clone(this.context.element);
				draggingElement = event.item;

				this.$el.classList.add('is-dragging');
			},

			/**
			 * Invoked on drag add.
			 *
			 * @param {*} event
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragAdd(event)
			{
				let element = event.item._underlying_vm_;

				if (element === undefined)
					return;

				removeNode(event.item);

				let newIndex = this.getVmIndex(event.newIndex);
				this.spliceList(newIndex, 0, element);
				this.computeIndexes();
				this.emitChanges({added: {element: element, newIndex: newIndex}});
			},

			/**
			 * Invoked on drag remove.
			 *
			 * @param {*} event
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragRemove(event)
			{
				insertNodeAt(this.rootContainer, event.item, event.oldIndex);

				if (this.isCloning)
				{
					removeNode(event.clone);
					return;
				}

				let oldIndex = this.context.index;
				this.spliceList(oldIndex, 1);
				this.resetTransitionData(oldIndex);
				this.emitChanges({removed: {element: this.context.element, oldIndex: oldIndex}});
			},

			/**
			 * Invoked on drag update.
			 *
			 * @param {*} event
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragUpdate(event)
			{
				removeNode(event.item);
				insertNodeAt(event.from, event.item, event.oldIndex);

				let oldIndex = this.context.index;
				let newIndex = this.getVmIndex(event.newIndex);

				this.updatePosition(oldIndex, newIndex);
				this.emitChanges({moved: {element: this.context.element, oldIndex: oldIndex, newIndex: newIndex}});
			},

			/**
			 * Computes the future index.
			 *
			 * @param {*} relatedContext
			 * @param {*} event
			 *
			 * @returns {Number}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			computeFutureIndex(relatedContext, event)
			{
				if (!relatedContext.element)
					return 0;

				let domChildren = [].concat(_toConsumableArray(event.to.children)).filter(el => el.style['display'] !== 'none');
				let currentDomIndex = domChildren.indexOf(event.related);
				let currentIndex = relatedContext.component.getVmIndex(currentDomIndex);
				let draggedInList = domChildren.indexOf(draggingElement) !== -1;

				return draggedInList || !event['willInsertAfter'] ? currentIndex : currentIndex + 1;
			},

			/**
			 * Invoked on drag move.
			 *
			 * @param {*} event
			 * @param {*} originalEvent
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragMove(event, originalEvent)
			{
				let onMove = this.move;

				if (!onMove || !this.realList)
					return true;

				let relatedContext = this.getRelatedContextFromMoveElement(event);
				let draggedContext = this.context;
				let futureIndex = this.computeFutureIndex(relatedContext, event);

				_extends(draggedContext, {futureIndex: futureIndex});
				_extends(event, {relatedContext: relatedContext, draggedContext: draggedContext});

				return onMove(event, originalEvent);
			},

			/**
			 * Invoked on drag end.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragEnd()
			{
				this.computeIndexes();
				draggingElement = null;

				this.$el.classList.remove('is-dragging');
			}

		},

		watch: {

			/**
			 * Watches the {@see options} property.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			options: {

				handler(newOptionValue)
				{
					for (let property in newOptionValue)
						if (newOptionValue.hasOwnProperty(property))
							if (readonlyProperties.indexOf(property) === -1)
								this._sortable.option(property, newOptionValue[property]);
				},
				deep: true

			},

			/**
			 * Watches the {@see realList} property.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			realList()
			{
				this.computeIndexes();
			}

		},

		/**
		 * Invoked before our Vue component is destroyed.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		beforeDestroy()
		{
			this._sortable.destroy();
		},

		/**
		 * Invoked when our Vue component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			this.componentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();

			if (this.componentMode && this.transitionMode)
				throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);

			let optionsAdded = {};

			eventsListened.forEach(elt => optionsAdded['on' + elt] = delegateAndEmit.call(this, elt));
			eventsToEmit.forEach(elt => optionsAdded['on' + elt] = emit.bind(this, elt));

			let options = _extends({}, this.options, optionsAdded, {onMove: (event, originalEvent) => this.onDragMove(event, originalEvent)});

			!('draggable' in options) && (options.draggable = '>*');

			this._sortable = new Sortable(this.rootContainer, options);
			this.computeIndexes();
		},

		/**
		 * Invoked when Vue renders our component.
		 *
		 * @param {Function} createElement
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		render(createElement)
		{
			let slots = this.$slots.default;

			if (slots && slots.length === 1)
			{
				let child = slots[0];

				if (child.componentOptions && child.componentOptions.tag === 'transition-group')
					this.transitionMode = true;
			}

			let children = slots;
			let footer = this.$slots.footer;

			if (footer)
				children = slots ? [].concat(_toConsumableArray(slots), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));

			return createElement(this.element, null, children);
		}

	});

}

const eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
const eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
const readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(event => 'on' + event);

let draggingElement = null;

/**
 * Shim for Object.assign.
 *
 * @type {*}
 * @private
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
const _extends = Object.assign || function (target)
{
	for (let i = 1; i < arguments.length; i++)
	{
		let source = arguments[i];

		for (let key in source)
			if (source.hasOwnProperty(key))
				target[key] = source[key];
	}

	return target;
};

/**
 * Converts an Array to a consumable Array.
 *
 * @param {Array} arr
 *
 * @returns {*}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 * @private
 */
const _toConsumableArray = function (arr)
{
	if (Array.isArray(arr))
	{
		let arr2 = Array(arr.length);

		for (let i = 0; i < arr.length; i++)
			arr2[i] = arr[i];

		return arr2;
	}
	else
	{
		return Array.from(arr);
	}
};

/**
 * Creates an Array from a value.
 *
 * @type {*}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
Array.from = Array.from || function (object)
{
	return [].slice.call(object);
};

/**
 * Removes a node.
 *
 * @param {HTMLElement} node
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function removeNode(node)
{
	node.parentElement.removeChild(node);
}

/**
 * Inserts a node at a given position.
 *
 * @param {HTMLElement} parentNode
 * @param {HTMLElement} node
 * @param {Number} position
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function insertNodeAt(parentNode, node, position)
{
	let refNode = position === 0 ? parentNode.children[0] : parentNode.children[position - 1].nextSibling;
	parentNode.insertBefore(node, refNode);
}

/**
 * Computes the virtual node index.
 *
 * @param {Array} vnodes
 * @param {HTMLElement} element
 *
 * @returns {Number}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function computeVmIndex(vnodes, element)
{
	return vnodes.map(elt => elt.elm).indexOf(element);
}

/**
 * Computes indexes.
 *
 * @param {Array} slots
 * @param {Array} children
 * @param {Boolean} isTransition
 *
 * @returns {*}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function computeIndexes(slots, children, isTransition)
{
	if (!slots)
		return [];

	let elmFromNodes = slots.map(elt => elt.elm);
	let rawIndexes = [].concat(_toConsumableArray(children)).map(elt => elmFromNodes.indexOf(elt));

	return isTransition ? rawIndexes.filter(ind => ind !== -1) : rawIndexes;
}

/**
 * Emits an event.
 *
 * @param {String} eventName
 * @param {*} eventData
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function emit(eventName, eventData)
{
	this.$nextTick(() => this.$emit(eventName.toLowerCase(), eventData));
}

/**
 * Emits an event via delegated.
 *
 * @param {String} eventName
 *
 * @returns {Function}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function delegateAndEmit(eventName)
{
	let that = this;

	return eventData =>
	{
		if (that.realList !== null)
			that['onDrag' + eventName](eventData);

		emit.call(that, eventName, eventData);
	};
}
