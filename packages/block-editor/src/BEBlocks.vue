<script>

	import { placeCaretAtEdge } from "./helper/selection";
	import { divider, icon } from "./blocks/primitive/element";
	import { editorInstance, getLatte, notNullOrUndefined, replaceIndex } from "./utils";

	import BEInserterMini from "./BEInserterMini";
	import BEInserterExpanded from "./BEInserterExpanded";

	const inlineClasses = ["be-block-embed"];
	const inlineElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

	const defaultFocusData = {placeAtEnd: true, select: true, selectAll: false};
	const L = getLatte();

	export default {

		name: "BEBlocks",

		props: {
			depth: {default: 0, type: Number},
			value: {default: () => [], required: true, type: Array}
		},

		data()
		{
			return {
				apis: [],
				canUpdate: true,
				content: this.value,
				editor: editorInstance(this),
				selectedElement: undefined,
				selectedIndex: -1
			};
		},

		mounted()
		{
			this.editor.$on("be:reset-settings-pane", () =>
			{
				this.selectedElement = undefined;
				this.selectedIndex = -1;
			});
		},

		render(h)
		{
			return h("div", {class: "be-blocks"}, this.contentFiltered.length > 0 ? this.renderBlocks(h) : this.renderEmptyInserter(h));
		},

		computed: {

			contentFiltered()
			{
				return this.content
					.filter(item => notNullOrUndefined(item))
			}

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
				const children = block.canHaveChildren ? item.children || [] : undefined;
				const options = Object.assign({}, block.defaultOptions || {}, item.options);

				const ensure = fn => !isRemoved ? fn() : undefined;

				const focus = (focusData = {}, fn = undefined) =>
				{
					focusData = Object.assign(defaultFocusData, focusData || {});

					const withElement = elm =>
					{
						elm.click();
						elm.focus();

						if (!elm.isContentEditable)
							return;

						if (focusData.select)
						{
							if (focusData.selectAll === false && elm.childNodes.length > 0)
								placeCaretAtEdge(elm, focusData.placeAtEnd);
							else
								document.execCommand("selectAll");
						}

						if (fn)
							fn(elm);
					};

					if (blockNode.elm)
						withElement(blockNode.elm);
					else
						this.$nextTick(() => withElement(blockNode.elm));
				};

				const getRelative = dir =>
				{
					return this.apis[index + dir] || undefined;
				};

				const rearrange = dir =>
				{
					isRemoved = true;
					this.content[index].focusData = defaultFocusData;
					this.content.splice(index + dir, 0, this.content.splice(index, 1)[0]);
				};

				const remove = () =>
				{
					isRemoved = true;

					const sibbling = getRelative(-1);

					this.removeBlock(index);

					if (sibbling)
						sibbling.focus();
					else
						this.setSelectedIndex(-1, undefined);
				};

				const setChildren = newChildren => ensure(() => replaceIndex(this.content, index, Object.assign({}, item, {children: newChildren})));
				const setOptions = newOptions => ensure(() => replaceIndex(this.content, index, Object.assign({}, item, {options: Object.assign(options, newOptions)})));

				this.apis[index] = {
					blockId: block.id,
					blockNode,
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
					insertBlock: this.insertBlock.bind(this),
					nextTick: this.$nextTick.bind(this),
					raf: L.util.dom.raf,
					rearrange,
					remove,
					setChildren,
					setOptions
				};

				blockNode = block.renderEditor(h, this.apis[index]);

				if (blockNode === undefined)
					return undefined;

				if (item.focusData)
				{
					focus(item.focusData);
					delete this.content[index].focusData;
				}

				const classes = ["be-block-mount", `be-block-${block.id}`, "be-editing"];

				if (isSelected)
					classes.push("is-selected");

				if (index === 0)
					classes.push("is-first");

				if (index === this.content.length - 1)
					classes.push("is-last");

				const onClick = () => ensure(() =>
				{
					if (this.selectedIndex !== index)
						this.setSelectedIndex(index, blockNode.elm);
				});

				return h("div", {class: classes, on: {"!click": evt => onClick(evt)}}, [
					this.renderInserter(h, index === 0, index, "top"),
					this.renderInserter(h, true, index, "bottom"),
					this.renderOptions(h, block, this.apis[index]),
					this.renderOptionsSide(h, block, this.apis[index]),
					blockNode
				]);
			},

			renderBlocks(h)
			{
				L.util.dom.raf(() => this.setSelectedIndex(this.selectedIndex, this.selectedElement, true));

				return this.content
					.map((item, index) => this.renderBlock(h, item, index));
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

			renderOptions(h, block, api)
			{
				const {depth, isSelected} = api;

				if (!isSelected)
					return undefined;

				return h("latte-portal", {props: {depth, order: -depth, to: `be-settings-pane-${this.editor.uniqueId}`}}, [
					block.renderOptions(h, api)
				]);
			},

			renderOptionsSide(h, block, {index, indexMax, isSelected, rearrange, remove})
			{
				if (!isSelected || block.canHaveChildren)
					return undefined;

				return h("div", {class: "be-options-side", on: {click: evt => evt.preventDefault()}}, [

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: index === 0},
						on: {click: () => rearrange(-1)}
					}, [icon(h, "arrow-up")]),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: index === indexMax - 1},
						on: {click: () => rearrange(1)}
					}, [icon(h, "arrow-down")]),

					divider(h),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						on: {click: () => remove()}
					}, [icon(h, "delete")])

				])
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
				if (!this.canUpdate)
					return this.canUpdate = true;

				this.$emit("input", this.content);
			},

			value()
			{
				this.canUpdate = false;
				this.content = Array.from(this.value)
					.filter(item => notNullOrUndefined(item));
			}

		}

	}

</script>
