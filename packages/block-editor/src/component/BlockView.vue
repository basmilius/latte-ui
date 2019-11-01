<script>

	import { BlockInstance } from "../core/block/instance";
	import { combine, terminate } from "../util/event";
	import { optional } from "../util/vue";

	import BlockMount from "./BlockMount";

	export default {

		name: "BlockView",

		props: {
			instance: {required: true, type: BlockInstance}
		},

		destroyed()
		{
			this.instance.select(false);
		},

		render(h)
		{
			let vnode = this.instance.renderEditor(h, this.instance);
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
				vnode,
				optional(this.instance.isSelected, () => this.instance.block.renderOptions(h, this.instance)),
				h("div")
			]);
		}

	}

</script>
