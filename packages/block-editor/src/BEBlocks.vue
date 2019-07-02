<script>

	import { Latte } from "@bybas/latte-ui";

	import BEInserterExpanded from "./BEInserterExpanded";
	import BEInserterMini from "./BEInserterMini";

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

			value: {
				default: () => [],
				required: true,
				type: Array
			}

		},

		data()
		{
			return {
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
			return h("div", {class: "be-blocks"}, [
				this.content.map((item, index) =>
				{
					const block = this.blocks.find(b => b.id === item.id);

					if (!block)
						return undefined;

					block.controller = this;

					const isSelected = this.selectedIndex === index;
					const children = item.children || [];
					const options = Object.assign({}, block.defaultOptions || {}, item.options);

					const rearrange = dir =>
					{
						this.content.splice(index + dir, 0, this.content.splice(index, 1)[0]);
						this.setSettingsIndex(index + dir);
						this.$el.click();
					};
					const setChildren = newChildren => this.content.splice(index, 1, Object.assign({}, this.content[index], {children: newChildren}));
					const setOptions = newOptions => this.content.splice(index, 1, Object.assign({}, this.content[index], {options: Object.assign(options, newOptions)}));

					const api = {
						options,
						children,
						index,
						indexMax: this.content.length,

						setChildren,
						setOptions,
						rearrange
					};

					const renderBlock = () =>
					{
						const vnode = block.renderEditor(h, api);

						if (item.shouldFocus)
						{
							this.content[index].shouldFocus = false;
							this.$nextTick(() =>
							{
								vnode.elm.click();
								vnode.elm.focus();

								if (vnode.elm.contentEditable === "true")
									document.execCommand("selectAll");
							});
						}

						return vnode;
					};

					const renderOptions = () =>
					{
						if (!isSelected)
							return undefined;

						return h("latte-portal", {props: {to: `be-settings-pane-${block.editor.uniqueId}`}}, [
							block.renderOptions(h, api)
						]);
					};

					return h("div", {class: `be-block-wrapper ${isSelected ? "is-selected" : "is-not-selected"}`, on: {click: () => this.setSettingsIndex(index)}}, [
						renderOptions(),
						renderBlock(),
						h(BEInserterMini, {
							props: {
								blocks: this.blocks,
								categories: this.categories
							},
							on: {
								select: id => this.insertBlock(id, index)
							}
						})
					]);
				}),
				h(BEInserterExpanded, {
					props: {
						blocks: this.blocks,
						categories: this.categories
					},
					on: {
						select: id => this.insertBlock(id)
					}
				})
			])
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
