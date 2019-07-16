<script>

	import BEInserterMini from "./BEInserterMini";
	import { handleComponentError } from "./helper/error";
	import { divider, icon } from "./primitive/element";
	import { terminateEvent } from "./utils/events";

	export default {

		name: "BEBlockMount",

		props: {
			api: {required: true, type: Object}
		},

		render(h)
		{
			return h("div", {class: this.mountClasses, on: {click: evt => this.onClick(evt)}}, [
				this.renderInserter(h, this.api.index === 0, this.api.index, "top"),
				this.renderInserter(h, true, this.api.index, "bottom"),
				this.renderOptions(h),
				this.renderOptionsSide(h),
				this.api.renderEditor(h)
			]);
		},

		computed: {

			mountClasses()
			{
				const classes = ["be-block-mount", `be-block-${this.api.blockId}`, "be-editing"];

				if (this.api.isSelected)
					classes.push("is-selected");

				if (this.api.index === 0)
					classes.push("is-first");

				if (this.api.index === this.api.group.blocks.length - 1)
					classes.push("is-last");

				return classes;
			}

		},

		methods: {

			onClick()
			{
				this.api.ensure(() =>
				{
					if (this.api.group.selectedIndex !== this.api.index)
						this.api.group.setSelectedIndex(this.api.index, this.api.elm);
				});
			},

			renderInserter(h, shouldRender, index, mode)
			{
				if (!shouldRender)
					return undefined;

				return h(BEInserterMini, {
					class: mode,
					on: {select: id => this.api.insertBlock(id, mode === "top" ? index : index + 1)}
				});
			},

			renderOptions(h)
			{
				const {depth, isSelected} = this.api;

				if (!isSelected)
					return undefined;

				try
				{
					return h("latte-portal", {props: {depth, order: -depth, to: `be-settings-pane-${this.api.editor.uniqueId}`}}, [
						this.api.block.renderOptions(h, this.api)
					]);
				}
				catch (err)
				{
					handleComponentError(err, "BEBlocks/renderOptions", this.api);
					return undefined;
				}
			},

			renderOptionsSide(h)
			{
				if (!this.api.isSelected || this.api.block.canHaveChildren)
					return undefined;

				return h("div", {class: "be-options-side", on: {click: evt => terminateEvent(evt)}}, [

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: this.api.index === 0},
						on: {click: () => this.api.rearrange(-1)}
					}, [icon(h, "arrow-up")]),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: this.api.index === this.api.group.maxIndex},
						on: {click: () => this.api.rearrange(1)}
					}, [icon(h, "arrow-down")]),

					divider(h),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						on: {click: () => this.api.remove()}
					}, [icon(h, "delete")])

				])
			}

		}

	}

</script>
