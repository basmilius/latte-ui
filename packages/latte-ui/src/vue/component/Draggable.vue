<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	export default {

		name: "latte-draggable",

		props: {
			options: {type: Object},
			list: {default: null, type: Array},
			value: {default: null, type: Array},
			noTransitionOnDrag: {default: false, type: Boolean},
			clone: {default: original => original, type: Function},
			element: {default: "div", type: String},
			move: {default: null, type: Function}
		},

		beforeDestroy()
		{
			this._sortable.destroy();
		},

		data()
		{
			return {
				componentMode: false,
				transitionMode: false
			};
		},

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
		},

		computed: {

			rootContainer()
			{
				return this.transitionMode ? this.$el.children[0] : this.$el;
			},

			isCloning()
			{
				return this.options && this.options.group && this.options.group.pull === 'clone';
			},

			realList()
			{
				return this.list ? this.list : this.value;
			}

		},

		methods: {

			getChildrenNodes()
			{
				if (this.componentMode)
					return this.$children[0].$slots.default;

				let rawNodes = this.$slots.default;

				return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
			},

			computeIndexes()
			{
				this.$nextTick(() => this.visibleIndexes = computeIndexes(this.getChildrenNodes(), this.rootContainer.children, this.transitionMode));
			},

			getUnderlyingVm(htmlElement)
			{
				let index = computeVmIndex(this.getChildrenNodes() || [], htmlElement);

				if (index === -1)
					return null;

				return {index: index, element: this.realList[index]};
			},

			getUnderlyingPotencialDraggableComponent(reference)
			{
				const vue = reference.__vue__;

				if (!vue || !vue.$options || vue.$options._componentTag !== 'transition-group')
					return vue;

				return vue.$parent;
			},

			emitChanges(event)
			{
				this.$nextTick(() => this.$emit('change', event));
			},

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

			spliceList()
			{
				let _arguments = arguments;
				this.alterList(list => list.splice.apply(list, _arguments));
			},

			updatePosition(oldIndex, newIndex)
			{
				this.alterList(list => list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]));
			},

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

			getVmIndex(domIndex)
			{
				let indexes = this.visibleIndexes;
				let numberIndexes = indexes.length;

				return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
			},

			getComponent()
			{
				return this.$slots.default[0].componentInstance;
			},

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

			onDragStart(event)
			{
				this.context = this.getUnderlyingVm(event.item);
				event.item._underlying_vm_ = this.clone(this.context.element);
				draggingElement = event.item;

				this.$el.classList.add('is-dragging');
			},

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

			onDragUpdate(event)
			{
				removeNode(event.item);
				insertNodeAt(event.from, event.item, event.oldIndex);

				let oldIndex = this.context.index;
				let newIndex = this.getVmIndex(event.newIndex);

				this.updatePosition(oldIndex, newIndex);
				this.emitChanges({moved: {element: this.context.element, oldIndex: oldIndex, newIndex: newIndex}});
			},

			computeFutureIndex(relatedContext, event)
			{
				if (!relatedContext.element)
					return 0;

				let domChildren = [].concat(_toConsumableArray(event.to.children)).filter(el => el.style.display !== 'none');
				let currentDomIndex = domChildren.indexOf(event.related);
				let currentIndex = relatedContext.component.getVmIndex(currentDomIndex);
				let draggedInList = domChildren.indexOf(draggingElement) !== -1;

				return draggedInList || !event.willInsertAfter ? currentIndex : currentIndex + 1;
			},

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

			onDragEnd()
			{
				this.computeIndexes();
				draggingElement = null;

				this.$el.classList.remove('is-dragging');
			}

		},

		watch: {

			options: {

				deep: true,
				handler(newOptionValue)
				{
					for (let property in newOptionValue)
						if (newOptionValue.hasOwnProperty(property))
							if (readonlyProperties.indexOf(property) === -1)
								this._sortable.option(property, newOptionValue[property]);
				}

			},

			realList()
			{
				this.computeIndexes();
			}

		}

	}

	const eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
	const eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
	const readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(event => 'on' + event);

	let draggingElement = null;

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

	Array.from = Array.from || function (object)
	{
		return [].slice.call(object);
	};

	function removeNode(node)
	{
		node.parentElement.removeChild(node);
	}

	function insertNodeAt(parentNode, node, position)
	{
		let refNode = position === 0 ? parentNode.children[0] : parentNode.children[position - 1].nextSibling;
		parentNode.insertBefore(node, refNode);
	}

	function computeVmIndex(vnodes, element)
	{
		return vnodes.map(elt => elt.elm).indexOf(element);
	}

	function computeIndexes(slots, children, isTransition)
	{
		if (!slots)
			return [];

		let elmFromNodes = slots.map(elt => elt.elm);
		let rawIndexes = [].concat(_toConsumableArray(children)).map(elt => elmFromNodes.indexOf(elt));

		return isTransition ? rawIndexes.filter(ind => ind !== -1) : rawIndexes;
	}

	function emit(eventName, eventData)
	{
		this.$nextTick(() => this.$emit(eventName.toLowerCase(), eventData));
	}

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

</script>
