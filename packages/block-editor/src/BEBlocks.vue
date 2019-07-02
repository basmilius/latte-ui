<script>

	import { Latte } from "@bybas/latte-ui";

	import BEInserterMini from "./BEInserterMini";
	import BEInserterExpanded from "./BEInserterExpanded";
	import { setSelectionAfter } from "./utils";

	export default {

		name: "BEBlocks",

		props: {

			blocks: {
				default: () => [],
				required: true,
				type: Array
			},

			categories: {
				default: () => [],
				required: true,
				type: Array
			},

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
					const block = this.blocks.find(b => b.id === item.id);

					if (!block)
						return undefined;

					block.controller = this;

					let vnode = undefined;

					const depth = this.depth + 1;
					const isSelected = this.selectedIndex === index;
					const children = item.children || [];
					const options = Object.assign({}, block.defaultOptions || {}, item.options);

					const focus = (selectAll = true) =>
					{
						this.$nextTick(() =>
						{
							vnode.elm.click();
							vnode.elm.focus();

							if (vnode.elm.contentEditable === "true")
							{
								if (selectAll)
									document.execCommand("selectAll");
								else
									setSelectionAfter(vnode.elm.childNodes[0]);
							}
						});
					};

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
						depth,
						options,
						children,
						index,
						indexMax: this.content.length,

						focus,
						getRelative,
						insertBlock: (id, index = -1) => this.insertBlock(id, index),
						rearrange,
						remove,
						setChildren,
						setOptions
					};

					vnode = block.renderEditor(h, api);

					if (item.shouldFocus)
					{
						this.content[index].shouldFocus = false;
						focus();
					}

					return h("div", {class: `be-block-wrapper ${isSelected ? "is-selected" : "is-not-selected"}`, on: {click: () => this.setSettingsIndex(index)}}, [
						h(BEInserterMini, {
							class: "top",
							props: {
								blocks: this.blocks,
								categories: this.categories
							},
							on: {
								select: id => this.insertBlock(id, index)
							}
						}),
						renderOptions(),
						vnode,
						h(BEInserterMini, {
							class: "bottom",
							props: {
								blocks: this.blocks,
								categories: this.categories
							},
							on: {
								select: id => this.insertBlock(id, index + 1)
							}
						})
					]);
				});
			};

			const renderEmptyInserter = () =>
			{
				return [
					h(BEInserterExpanded, {
						props: {
							blocks: this.blocks,
							categories: this.categories
						},
						on: {
							select: id => this.insertBlock(id)
						}
					})
				];
			};

			return h("div", {class: "be-blocks"}, this.content.length > 0 ? renderBlocks() : renderEmptyInserter());
		},

		methods: {

			insertBlock(id, index = -1)
			{
				const spec = {
					id,
					options: {},
					shouldFocus: true
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
