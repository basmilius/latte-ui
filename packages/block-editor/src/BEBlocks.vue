<script>

	import { Latte } from "@bybas/latte-ui";
	import { editorInstance, setSelectionBefore } from "./utils";

	import BEInserterMini from "./BEInserterMini";
	import BEInserterExpanded from "./BEInserterExpanded";

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
				selectedIndex: -1
			};
		},

		mounted()
		{
			Latte.action.on("latte:be:reset-settings-pane", () => this.selectedIndex = -1);
		},

		render(h)
		{
			const renderBlocks = () =>
			{
				return this.content.map((item, index) =>
				{
					const block = this.editor.blocks.find(b => b.id === item.id);

					if (!block)
						return undefined;

					block.controller = this;

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

						if (selectAll)
							document.execCommand("selectAll");
						else
							setSelectionBefore(blockNode.elm.childNodes[0], true);

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
						this.setSettingsIndex(index + dir);
						this.$el.click();
					};

					const remove = () => this.content.splice(index, 1);

					const setChildren = newChildren => this.content.splice(index, 1, Object.assign({}, this.content[index], {children: newChildren}));
					const setOptions = newOptions => this.content.splice(index, 1, Object.assign({}, this.content[index], {options: Object.assign(options, newOptions)}));

					const renderOptions = () =>
					{
						if (!isSelected)
							return undefined;

						return h("latte-portal", {props: {depth, to: `be-settings-pane-${block.editor.uniqueId}`}}, [
							block.renderOptions(h, api)
						]);
					};

					const api = this.apis[index] = {
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

					return h("div", {class: `be-block-wrapper be-block-${block.id} ${isSelected ? "is-selected" : "is-not-selected"}`, on: {click: () => this.setSettingsIndex(index)}}, [
						h(BEInserterMini, {
							class: "top",
							on: {
								select: id => this.insertBlock(id, index)
							}
						}),
						h(BEInserterMini, {
							class: "bottom",
							on: {
								select: id => this.insertBlock(id, index + 1)
							}
						}),
						renderOptions(),
						blockNode
					]);
				});
			};

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

			setSettingsIndex(index)
			{
				Latte.action.dispatch("latte:be:reset-settings-pane");
				Latte.util.dom.raf(() => this.selectedIndex = index);
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
