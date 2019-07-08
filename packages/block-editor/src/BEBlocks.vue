<script>

	import { editorInstance, getLatte } from "./utils";

	import BEInserterMini from "./BEInserterMini";
	import BEInserterExpanded from "./BEInserterExpanded";
	import { placeCaretAtEdge } from "./helper/selection";

	const inlineClasses = ["be-block-embed"];
	const inlineElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

	const defaultFocusData = {placeAtEnd: true, select: true, selectAll: false};
	const L = getLatte();

	export default {

		name: "BEBlocks",

		props: {

			depth: {
				default: 0,
				type: Number
			},

			value: {
				default: () => [],
				required: true,
				type: Array
			}

		},

		data()
		{
			return {
				apis: [],
				content: this.value,
				editor: editorInstance(this),
				selectedElement: undefined,
				selectedIndex: -1,
				tick: 0
			};
		},

		mounted()
		{
			this.editor.$on("be:reset-settings-pane", () =>
			{
				this.selectedElement = undefined;
				this.selectedIndex = -1;
			});

			L.action.on("latte:tick", () => this.setSelectedIndex(this.selectedIndex, this.selectedElement, true));
		},

		render(h)
		{
			return h("div", {class: "be-blocks"}, this.content.filter(r => r !== undefined && r !== null).length > 0 ? this.renderBlocks(h) : this.renderEmptyInserter(h));
		},

		methods: {

			insertBlock(id, index = -1, options = {}, focusData = defaultFocusData)
			{
				const spec = {
					id,
					options,
					focusData
				};

				if (index > -1)
					this.content.splice(index, 0, spec);
				else
					this.content.push(spec);
			},

			removeBlock(index)
			{
				this.content.splice(index, 1, undefined);
			},

			renderBlock(h, item, index)
			{
				if (item === undefined || item === null)
					return undefined;

				const block = this.editor.blocks.find(b => b.id === item.id);

				if (!block)
					return undefined;

				let blockNode = undefined;
				let isRemoved = false;

				const depth = this.depth + 1;
				const isSelected = this.selectedIndex === index;
				const children = item.children || [];
				const options = Object.assign({}, block.defaultOptions || {}, item.options);

				const ensure = fn => !isRemoved ? fn() : undefined;

				const focus = (focusData, fn = undefined) => this.$nextTick(() =>
				{
					focusData = Object.assign(defaultFocusData, focusData || {});
					blockNode.elm.click();
					blockNode.elm.focus();

					if (!blockNode.elm.isContentEditable)
						return;

					if (focusData.select)
					{
						if (focusData.selectAll === false && blockNode.elm.childNodes.length > 0)
							placeCaretAtEdge(blockNode.elm, focusData.placeAtEnd);
						else
							document.execCommand("selectAll");
					}

					if (fn)
						fn(blockNode.elm);
				});

				const getRelative = dir =>
				{
					return this.apis[index + dir] || undefined;
				};

				const rearrange = dir =>
				{
					this.content.splice(index + dir, 0, this.content.splice(index, 1)[0]);
					this.setSelectedIndex(index + dir);
					this.content[index + dir].focusData = defaultFocusData;
				};

				const remove = () =>
				{
					isRemoved = true;
					this.removeBlock(index);
				};

				const setChildren = newChildren => ensure(() => this.content.splice(index, 1, Object.assign({}, this.content[index], {children: newChildren})));
				const setOptions = newOptions => ensure(() => this.content.splice(index, 1, Object.assign({}, this.content[index], {options: Object.assign(options, newOptions)})));

				const renderOptions = () =>
				{
					if (!isSelected)
						return undefined;

					return h("latte-portal", {props: {depth, to: `be-settings-pane-${this.editor.uniqueId}`}}, [
						block.renderOptions(h, this.apis[index])
					]);
				};

				let api = this.apis[index] = {
					blockId: block.id,
					depth,
					options,
					children,
					editor: this.editor,
					index,
					indexMax: this.content.length,
					isRemoved,
					isSelected,

					focus,
					getRelative,
					insertBlock: (id, index = -1, options = {}, focusData = undefined) => this.insertBlock(id, index, options, focusData),
					nextTick: fn => this.$nextTick(fn),
					raf: fn => L.util.dom.raf(fn),
					rearrange,
					remove,
					setChildren,
					setOptions
				};

				blockNode = block.renderEditor(h, api);

				if (item.focusData)
				{
					focus(this.content[index].focusData);
					delete this.content[index].focusData;
				}

				const classes = ["be-block-mount", `be-block-${block.id}`, "be-editing"];

				if (isSelected)
					classes.push("is-selected");

				if (index === 0)
					classes.push("is-first");

				if (index === this.content.length - 1)
					classes.push("is-last");

				const onClick = evt =>
				{
					evt.preventDefault();

					if (this.selectedIndex !== index)
						this.setSelectedIndex(index, blockNode.elm);
				};

				return h("div", {class: classes, on: {click: evt => onClick(evt)}}, [
					this.renderInserter(h, true, index, "top"),
					this.renderInserter(h, true, index, "bottom"),
					renderOptions(),
					blockNode
				]);
			},

			renderBlocks(h)
			{
				return this.content.map((item, index) => this.renderBlock(h, item, index));
			},

			renderEmptyInserter(h)
			{
				return [
					h(BEInserterExpanded, {
						on: {select: id => this.insertBlock(id)}
					})
				];
			},

			renderInserter(h, shouldRender, index, mode)
			{
				if (!shouldRender)
					return undefined;

				return h(BEInserterMini, {
					class: mode,
					on: {select: id => this.insertBlock(id, mode === "top" ? index : index + 1)}
				});
			},

			setSelectedIndex(index, elm, auto = false)
			{
				if (elm instanceof Element && elm.parentNode)
				{
					const style = window.getComputedStyle(elm);

					let isInlineElement = inlineElements.indexOf(elm.tagName.toLowerCase()) > -1;

					for (let cls of inlineClasses)
						if (elm.classList.contains(cls))
							isInlineElement = true;

					let hgutters = parseInt(style.marginLeft) + parseInt(style.marginRight);
					let vgutters = isInlineElement ? 0 : (parseInt(style.marginTop) + parseInt(style.marginBottom));

					elm.parentElement.style.setProperty("--editor-rect-h", `${elm.clientHeight + vgutters}px`);
					elm.parentElement.style.setProperty("--editor-rect-w", `${elm.clientWidth + hgutters}px`);
				}

				if (auto === true)
					return;

				this.editor.$emit("be:reset-settings-pane");

				L.util.dom.raf(() =>
				{
					this.selectedElement = elm;
					this.selectedIndex = index;
				});
			}

		},

		watch: {

			content()
			{
				this.$emit("input", this.content);
			},

			value()
			{
				this.content = this.value;
			}

		}

	}

</script>
