<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	import Vue from "vue";

	import wormhole from "../../js/util/portal/wormhole";
	import { default as PortalTarget } from "./PortalTarget.vue";
	import { extractAttributes } from "../../js/util/portal/util";

	let portalId = 0;

	export default {

		abstract: false,

		name: "latte-portal",

		props: {

			disabled: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				default: () => String(++portalId),
				required: false,
				type: String
			},

			order: {
				default: 0,
				required: false,
				type: Number
			},

			slim: {
				default: false,
				required: false,
				type: Boolean
			},

			slotProps: {
				default: () => ({}),
				required: false,
				type: Object
			},

			tag: {
				default: "div",
				required: false,
				type: String
			},

			targetEl: {
				default: undefined,
				required: false,
				type: [String, HTMLElement]
			},

			targetClass: {
				default: undefined,
				required: false,
				type: String
			},

			to: {
				default: () => String(Math.round(Math.random() * 10000000)),
				required: true,
				type: String
			}

		},

		beforeDestroy()
		{
			this.clear();

			if (this.mountedComp)
				this.mountedComp.$destroy();
		},

		mounted()
		{
			if (this.targetEl)
				this.mountToTarget();

			if (!this.disabled)
				this.sendUpdate();

			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		render(h)
		{
			const children = this.$slots.default || this.$scopedSlots.default || [];

			if (children.length && this.disabled)
			{
				this.$options.abstract = true;

				return children.length <= 1 && this.slim ? children[0] : h(this.tag, {class: ["latte-portal"]}, this.normalizeChildren(children));
			}
			else
			{
				return h(this.tag, {class: ["latte-portal"], key: "latte-portal-placeholder", style: {display: "none"}}, []);
			}
		},

		updated()
		{
			if (this.disabled)
				this.clear();
			else
				this.sendUpdate();

			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		methods: {

			clear(target)
			{
				wormhole.close({
					from: this.name,
					to: target || this.to
				});
			},

			mountToTarget()
			{
				let elm;
				const target = this.targetEl;

				if (typeof target === "string")
					elm = document.querySelector(target);
				else if (target instanceof HTMLElement)
					elm = target;
				else
					throw new Error("[LatteUI] <latte-portal/> value of targetEl must be of type String or HTMLElement.");

				if (!elm)
					throw new Error("[LatteUI] <latte-portal/>> The specified target was not found.");

				const newTarget = new Vue({

					...PortalTarget,

					parent: this,

					propsData: {
						attributes: extractAttributes(elm),
						name: this.to,
						tag: elm.tagName
					}

				});

				newTarget.$mount(elm);

				this.mountedComp = newTarget;
			},

			normalizeChildren(children)
			{
				return typeof children === "function" ? children(this.slotProps) : children;
			},

			normalizedSlots()
			{
				return this.$scopedSlots.default ? [this.$scopedSlots.default] : this.$slots.default;
			},

			sendUpdate()
			{
				const slotContent = this.normalizedSlots();

				if (slotContent)
				{
					wormhole.open({
						from: this.name,
						to: this.to,
						passengers: [...slotContent],
						class: this.targetClass && this.targetClass.split(" "),
						order: this.order
					});
				}
				else
				{
					this.clear();
				}
			}
		},

		watch: {

			to(newValue, oldValue)
			{
				oldValue && oldValue !== newValue && this.clear(oldValue);

				this.sendUpdate();
			},

			targetEl(newValue)
			{
				if (newValue)
					this.mountToTarget();
			}
		}

	}

</script>
