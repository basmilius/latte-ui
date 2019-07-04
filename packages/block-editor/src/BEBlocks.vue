<script>

	import { Latte } from "@bybas/latte-ui";
	import { editorInstance, setSelectionBefore } from "./utils";

	import BEInserterMini from "./BEInserterMini";
	import BEInserterExpanded from "./BEInserterExpanded";

	const inlineElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

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
			this.editor.$on("be:reset-settings-pane", () => this.selectedIndex = -1);

			Latte.action.on("latte:tick", () =>
			{
				this.tick++;

				if (this.tick % 2 === 0)
					this.setSelectedIndex(this.selectedIndex, this.selectedElement, true);
			});
		},

		render(h)
		{
			const renderBlocks = () => this.content.map((item, index) =>
			{
				const block = this.editor.blocks.find(b => b.id === item.id);

				if (!block)
					return undefined;

				let api = {};
				let blockNode = undefined;

				const depth = this.depth + 1;
				const isSelected = this.selectedIndex === index;
				const children = item.children || [];
				const options = Object.assign({}, block.defaultOptions || {}, item.options);

				const focus = (selectAll = true, fn = undefined) => this.$nextTick(() =>
				{
					blockNode.elm.click();
					blockNode.elm.focus();

					if (blockNode.elm.contentEditable !== "true")
						return;

					if (!selectAll && blockNode.elm.childNodes.length > 0)
						setSelectionBefore(blockNode.elm.childNodes[0], true);
					else
						document.execCommand("selectAll");

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
					this.content[index + dir].shouldFocus = true;
				};

				const remove = () => this.content.splice(index, 1);

				const setChildren = newChildren => this.content.splice(index, 1, Object.assign({}, this.content[index], {children: newChildren}));
				const setOptions = newOptions => this.content.splice(index, 1, Object.assign({}, this.content[index], {options: Object.assign(options, newOptions)}));

				const renderInserter = (shouldRender, mode) =>
				{
					if (!shouldRender)
						return undefined;

					return h(BEInserterMini, {
						class: mode,
						on: {select: id => this.insertBlock(id, mode === "top" ? index : index + 1)}
					});
				};

				const renderOptions = () =>
				{
					if (!isSelected)
						return undefined;

					return h("latte-portal", {props: {depth, to: `be-settings-pane-${block.editor.uniqueId}`}}, [
						block.renderOptions(h, api)
					]);
				};

				api = this.apis[index] = {
					blockId: block.id,
					depth,
					options,
					children,
					index,
					indexMax: this.content.length,

					focus,
					getRelative,
					insertBlock: (id, index = -1, options = {}, shouldFocus = true) => this.insertBlock(id, index, options, shouldFocus),
					nextTick: fn => this.$nextTick(fn),
					rearrange,
					remove,
					setChildren,
					setOptions
				};

				blockNode = block.renderEditor(h, api);

				if (item.shouldFocus)
				{
					this.content[index].shouldFocus = false;
					focus(false);
				}

				const classes = ["be-block-mount", `be-block-${block.id}`, "be-editing"];

				if (isSelected)
					classes.push("is-selected");

				if (index === 0)
					classes.push("is-first");

				if (index === this.content.length - 1)
					classes.push("is-last");

				return h("div", {class: classes, on: {click: () => this.setSelectedIndex(index, blockNode.elm)}}, [
					renderInserter(index === 0, "top"),
					renderInserter(true, "bottom"),
					renderOptions(),
					blockNode
				]);
			});

			const renderEmptyInserter = () =>
			{
				return [
					h(BEInserterExpanded, {
						on: {
							select: id => this.insertBlock(id)
						}
					})
				];
			};

			return h("div", {class: "be-blocks"}, this.content.length > 0 ? renderBlocks() : renderEmptyInserter());
		},

		methods: {

			insertBlock(id, index = -1, options = {}, shouldFocus = true)
			{
				const spec = {
					id,
					options,
					shouldFocus
				};

				if (index > -1)
					this.content.splice(index, 0, spec);
				else
					this.content.push(spec);
			},

			setSelectedIndex(index, elm, auto = false)
			{
				if (elm instanceof Element)
				{
					const isInlineElement = inlineElements.indexOf(elm.tagName.toLowerCase()) > -1;
					const style = window.getComputedStyle(elm);

					const hgutters = parseInt(style.marginLeft) + parseInt(style.marginRight);
					const vgutters = isInlineElement ? 0 : (parseInt(style.marginTop) + parseInt(style.marginBottom));

					elm.parentElement.style.setProperty("--editor-rect-h", `${elm.clientHeight + vgutters}px`);
					elm.parentElement.style.setProperty("--editor-rect-w", `${elm.clientWidth + hgutters}px`);
				}

				if (auto === true)
					return;

				this.editor.$emit("be:reset-settings-pane");

				Latte.util.dom.raf(() =>
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
