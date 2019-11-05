<script>

	import { BlockInstance } from "../core/block/instance";
	import { combine, terminate } from "../util/event";
	import { either, optional } from "../util/vue";

	import BlockMount from "./BlockMount";
	import { inserterInline } from "../ui/render/inserter";

	export default {

		name: "BlockView",

		props: {
			instance: {required: true, type: BlockInstance}
		},

		render(h)
		{
			let vnode = this.instance.renderEditor(h, this.instance);

			if (vnode === undefined)
				return undefined;

			let classes = ["be-block-view"];

			if (this.instance.block.canHaveGroups)
				classes.push("be-group");

			if (this.instance.block.canHaveChildren)
				classes.push("be-parent");

			if (vnode.data)
				vnode.data.class = `${classes.join(" ")} ${vnode.data.class || ""}`;

			vnode.data.on = Object.assign({}, vnode.data.on || {}, {
				click: combine(vnode.data.on ? vnode.data.on.click : undefined, evt =>
				{
					this.instance.select();
					terminate(evt);
				})
			});

			return h(BlockMount, {props: {instance: this.instance}}, [
				optional(this.instance.index > 0 && !this.instance.parent.block.canHaveGroups, () => inserterInline(h, this.instance)),
				vnode,
				either(
					this.instance.isSelected,
					() => this.instance.block.renderOptions(h, this.instance),
					() => h("div")
				)
			]);
		}

	}

</script>
