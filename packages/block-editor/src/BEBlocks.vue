<script>

	import { BlockAPI, defaultFocusData } from "./block";
	import { editorInstance, getLatte, notNullOrUndefined } from "./utils";
	import { divider, icon } from "./primitive/element";

	import BEInserterMini from "./BEInserterMini";
	import BEInserterExpanded from "./BEInserterExpanded";
	import { handleComponentError } from "./helper/error";

	const inlineClasses = ["be-block-embed"];
	const inlineElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "ol", "ul"];

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
				blocks: [],
				canUpdate: true,
				content: this.value,
				editor: editorInstance(this),
				maxIndex: 0,
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

			rearrangeBlock(index, dir)
			{
				this.blocks[index].isRemoved = true;
				this.content[index].focusData = defaultFocusData;
				this.content.splice(index + dir, 0, this.content.splice(index, 1)[0]);
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

				this.blocks[index] = new BlockAPI(block, this, index, item);

				if (item.focusData)
				{
					this.blocks[index].focus(item.focusData);
					delete this.content[index].focusData;
				}

				const classes = ["be-block-mount", `be-block-${block.id}`, "be-editing"];

				if (this.blocks[index].isSelected)
					classes.push("is-selected");

				if (index === 0)
					classes.push("is-first");

				if (index === this.content.length - 1)
					classes.push("is-last");

				const onClick = () => this.blocks[index].ensure(() =>
				{
					if (this.selectedIndex !== index)
						this.setSelectedIndex(index, this.blocks[index].elm);
				});

				return h("div", {class: classes, on: {"!click": evt => onClick(evt)}}, [
					this.renderInserter(h, index === 0, index, "top"),
					this.renderInserter(h, true, index, "bottom"),
					this.renderOptions(h, block, this.blocks[index]),
					this.renderOptionsSide(h, block, this.blocks[index]),
					this.blocks[index].renderEditor(h)
				]);
			},

			renderBlocks(h)
			{
				this.updateSelection();
				this.maxIndex = this.content.length - 1;

				return this.content.map((item, index) =>
				{
					try
					{
						return this.renderBlock(h, item, index);
					}
					catch (err)
					{
						handleComponentError(err, "BEBlocks/renderBlock", {index, item});
						return undefined;
					}
				});
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

				try
				{
					return h("latte-portal", {props: {depth, order: -depth, to: `be-settings-pane-${this.editor.uniqueId}`}}, [
						block.renderOptions(h, api)
					]);
				}
				catch (err)
				{
					handleComponentError(err, "BEBlocks/renderOptions", {block, api});
					return undefined;
				}
			},

			renderOptionsSide(h, block, blockApi)
			{
				if (!blockApi.isSelected || block.canHaveChildren)
					return undefined;

				return h("div", {class: "be-options-side", on: {click: evt => evt.preventDefault()}}, [

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: blockApi.index === 0},
						on: {click: () => blockApi.rearrange(-1)}
					}, [icon(h, "arrow-up")]),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: blockApi.index === this.maxIndex},
						on: {click: () => blockApi.rearrange(1)}
					}, [icon(h, "arrow-down")]),

					divider(h),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						on: {click: () => blockApi.remove()}
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
			},

			updateSelection()
			{
				L.util.dom.raf(() => this.setSelectedIndex(this.selectedIndex, this.selectedElement, true));
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
