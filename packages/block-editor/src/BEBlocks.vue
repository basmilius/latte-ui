<script>

	import { BlockAPI, defaultFocusData } from "./block";
	import { editorInstance, getLatte, notNullOrUndefined } from "./utils";
	import { handleComponentError } from "./helper/error";
	import { swapElements } from "./helper/animation";

	import BEInserterExpanded from "./BEInserterExpanded";
	import BEBlockMount from "./BEBlockMount";

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
				isSwappingBlocks: false,
				maxIndex: 0,
				selectedIndex: -1
			};
		},

		mounted()
		{
			this.editor.$on("be:reset-block-selection", () => this.selectedIndex = -1);
		},

		render(h)
		{
			this.canUpdate = false;
			const content = this.contentFiltered.length > 0 ? this.renderBlocks(h) : this.renderEmptyInserter(h);
			this.canUpdate = true;

			return h("div", {class: "be-blocks"}, content);
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
				const spec = {id, options, focusData};

				if (index > -1)
					this.content.splice(index, 0, spec);
				else
					this.content.push(spec);
			},

			rearrangeBlock(index, dir)
			{
				if (this.isSwappingBlocks)
					return;

				this.isSwappingBlocks = true;

				const current = this.blocks[index];
				const previous = this.blocks[index + dir];

				if (!current || !previous)
					return;

				const currentElm = L.util.dom.closest(current.blockNode.elm, ".be-block-mount");
				const previousElm = L.util.dom.closest(previous.blockNode.elm, ".be-block-mount");

				swapElements({
					firstElement: currentElm,
					secondElement: previousElm,
					scrollingContainer: L.util.dom.closest(currentElm, ".be-content-mount"),
					raf: L.util.dom.raf
				}, () =>
				{
					this.blocks[index].isRemoved = true;
					this.content.splice(index + dir, 0, Object.assign(this.content.splice(index, 1)[0], {focusData: {}}));
					L.util.dom.raf(() => this.isSwappingBlocks = false);
				});
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

				return h(BEBlockMount, {
					props: {
						api: this.blocks[index]
					}
				});
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

			setSelectedIndex(index, auto = false)
			{
				const blockApi = this.blocks[index];

				if (blockApi)
				{
					const {height, width} = blockApi.block.calculateSelectionBorder(blockApi);
					const parent = blockApi.elm.parentElement;

					if (parent)
					{
						parent.style.setProperty("--editor-rect-h", `${height}px`);
						parent.style.setProperty("--editor-rect-w", `${width}px`);
					}
				}

				if (auto === true)
					return;

				this.selectedIndex = index;
			},

			updateSelection()
			{
				L.util.dom.raf(() => this.setSelectedIndex(this.selectedIndex, true));
			}

		},

		watch: {

			content()
			{
				this.editor.$emit("content-update");

				if (!this.canUpdate)
					return;

				this.$emit("input", this.content);
			},

			value()
			{
				this.canUpdate = false;

				this.content = Array.from(this.value)
					.filter(item => notNullOrUndefined(item));

				this.$nextTick(() => this.canUpdate = true);
			}

		}

	}

</script>
