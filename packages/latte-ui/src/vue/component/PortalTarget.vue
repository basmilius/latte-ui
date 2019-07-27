<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	import { combinePassengers } from "../../js/util/portal/util";
	import wormhole from "../../js/util/portal/wormhole";

	export default {

		abstract: false,

		name: "latte-portal-target",

		props: {
			attributes: {default: () => ({}), type: Object},
			multiple: {default: false, type: Boolean},
			name: {required: true, type: String},
			slim: {default: false, type: Boolean},
			slotProps: {default: () => ({}), type: Object},
			tag: {default: "div", type: String},
			transition: {default: false, type: [Boolean, String, Object]},
			transitionEvents: {default: () => ({}), type: Object}
		},

		beforeDestroy()
		{
			this.unwatch();
		},

		created()
		{
			if (!this.transports[this.name])
				this.$set(this.transports, this.name, []);
		},

		data()
		{
			return {
				transports: wormhole.transports,
				firstRender: true
			};
		},

		mounted()
		{
			this.unwatch = this.$watch("ownTransports", this.emitChange);

			this.$nextTick(() =>
			{
				if (this.transition)
					this.firstRender = false;
			});

			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		render(ce)
		{
			const children = this.children();
			const noWrapper = this.noWrapper();

			if (children.length === 0)
				return undefined;

			if (this.withTransition)
			{
				const transitionType = noWrapper ? "transition" : "transition-group";

				return ce(transitionType, {
					class: ["latte-portal-target"],
					props: this.transitionData
				}, children);
			}

			if (noWrapper)
				return children[0];

			return ce(this.tag, {
				class: ["latte-portal-target", ...this.transportedClasses].filter(c => c !== undefined),
				props: this.attributes
			}, children);
		},

		updated()
		{
			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		computed: {

			hasAttributes()
			{
				return Object.keys(this.attributes).length > 0;
			},

			ownTransports()
			{
				const transports = this.transports[this.name] || [];

				return this.multiple ? transports : (transports.length === 0 ? [] : [transports[transports.length - 1]]);
			},

			passengers()
			{
				return combinePassengers(this.ownTransports, this.slotProps);
			},

			transitionData()
			{
				const t = this.transition;
				const data = {};

				if (this.firstRender && (typeof this.transition === "object" && !this.transition.appear))
				{
					data.props = {name: ""};

					return data;
				}

				if (typeof t === "string")
					data.props = {name: t};
				else if (typeof t === "object")
					data.props = t;

				if (this.renderSlim)
					data.props.tag = this.tag;

				data.on = this.transitionEvents;

				return data;
			},

			transportedClasses()
			{
				return this.ownTransports
					.map(transport => transport.class)
					.reduce((array, subarray) => array.concat(subarray), []);
			},

			withTransition()
			{
				return !!this.transition;
			}

		},

		methods: {

			children()
			{
				return this.passengers.length > 0 ? this.passengers : this.$slots.default || []
			},

			emitChange(newTransports, oldTransports)
			{
				if (this.multiple)
				{
					this.$emit("change", [...newTransports], [...oldTransports]);
				}
				else
				{
					const newTransport = newTransports.length === 0 ? undefined : newTransports[0];
					const oldTransport = oldTransports.length === 0 ? undefined : oldTransports[0];

					this.$emit("change", {...newTransport}, {...oldTransport})
				}
			},

			noWrapper()
			{
				const noWrapper = !this.hasAttributes && this.slim;

				if (noWrapper && this.children().length > 1)
					throw new Error("[LatteUI] <latte-portal-target> with slim option received more than one child element.");

				return noWrapper;
			}

		}

	}

</script>
