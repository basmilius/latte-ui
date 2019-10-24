<script>

	import BEInserterMini from "./BEInserterMini";
	import { handleComponentError } from "./helper/error";
	import { divider, icon } from "./primitive/element";
	import { getLatte } from "./utils";
	import { BlockEntry } from "./api";

	const L = getLatte();

	export default {

		name: "BEBlockMount",

		props: {
			entry: {required: true, type: BlockEntry}
		},

		data()
		{
			return {
				isFirst: this.entry.isFirst,
				isLast: this.entry.isLast,
				isSelected: this.entry.isSelected,
				h: 0,
				w: 0
			};
		},

		mounted()
		{
			this.onUpdate();
		},

		render(h)
		{
			if (this.entry.parent && this.entry.parent.block.canHaveGroups)
				return this.entry.renderEditor(h);

			return h("div", {
				class: this.classes,
				style: this.styles,
				on: {
					click: evt => this.onClick(evt)
				}
			}, [
				this.renderInserter(h, this.entry.index === 0, this.entry.index, "top"),
				this.renderInserter(h, true, this.entry.index, "bottom"),
				this.renderOptions(h),
				this.renderOptionsSide(h),
				this.entry.renderEditor(h)
			]);
		},

		updated()
		{
			this.onUpdate();
		},

		computed: {

			classes()
			{
				const classes = ["be-block-mount", `be-block-${this.entry.block.id}`, "be-editing"];

				if (this.isSelected)
					classes.push("is-selected");

				if (this.isFirst)
					classes.push("is-first");

				if (this.isLast)
					classes.push("is-last");

				return classes;
			},

			styles()
			{
				return {
					"--editor-rect-h": `${this.h}px`,
					"--editor-rect-w": `${this.w}px`
				};
			}

		},

		methods: {

			onClick()
			{
				if (this.entry.isSelected)
					return;

				this.entry.select();
			},

			onUpdate()
			{
				this.isFirst = this.entry.isFirst;
				this.isLast = this.entry.isLast;
				this.isSelected = this.entry.isSelected;

				if (!this.entry.isSelected)
					return;

				const {height, width} = this.entry.block.calculateSelectionBorder(this.entry);
				this.h = height;
				this.w = width;
			},

			renderInserter(h, shouldRender, index, mode)
			{
				if (!shouldRender || this.entry.block.id === "root")
					return undefined;

				return h(BEInserterMini, {
					class: mode,
					on: {
						select: id => this.entry.insertBlock(id, mode === "top" ? index : index + 1)
					}
				});
			},

			renderOptions(h)
			{
				const {depth, isSelected} = this.entry;

				if (!isSelected)
					return undefined;

				try
				{
					return h("latte-portal", {props: {depth, to: `be-settings-pane-${this.entry.editor.uniqueId}`}}, [
						this.entry.block.renderOptions(h, this.entry)
					]);
				}
				catch (err)
				{
					handleComponentError(err, "BEBlocks/renderOptions", this.entry);
					return undefined;
				}
			},

			renderOptionsSide(h)
			{
				if (!this.entry.isSelected || this.entry.block.canHaveChildren)
					return undefined;

				return h("div", {class: "be-options-side", on: {click: evt => L.util.dom.terminateEvent(evt)}}, [

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: this.entry.index === 0},
						on: {click: () => this.entry.rearrange(-1)}
					}, [icon(h, "arrow-up")]),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						domProps: {disabled: this.entry.index === this.entry.parent.children.length - 1},
						on: {click: () => this.entry.rearrange(1)}
					}, [icon(h, "arrow-down")]),

					divider(h),

					h("button", {
						class: "btn btn-icon btn-text btn-dark btn-sm",
						on: {click: () => this.entry.remove()}
					}, [icon(h, "delete")])

				])
			}

		}

	}

</script>
