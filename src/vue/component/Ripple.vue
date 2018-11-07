<template>

	<component :is="as" v-bind="$attrs" v-on="$listeners">

		<slot></slot>

		<slot v-for="slot in slots" :name="slot" :slot="slot"/>

		<template v-for="slot in scopedSlots" :slot="slot" slot-scope="scope">
			<slot :name="slot" v-bind="scope"/>
		</template>

	</component>

</template>

<script>

	import { relativeCoordsTo } from "../../js/util/dom";
	import { timeout } from "../../js/core";

	export default {

		name: "latte-ripple",

		props: {

			as: {
				default: "div",
				required: false,
				type: String
			},

			rippleBackground: {
				default: true,
				required: false,
				type: Boolean
			},

			rippleCentered: {
				default: false,
				required: false,
				type: Boolean
			},

			rippleDuration: {
				default: 330,
				required: false,
				type: Number
			}

		},

		data()
		{
			return {
				isBackgroundVisible: false,
				backgroundTimeout: null,
				container: null,
				preparedRipple: null
			};
		},

		mounted()
		{
			this.container = document.createElement("div");
			this.container.classList.add("ripple-container");
			this.$el.prepend(this.container);

			this.$el.addEventListener("pointerdown", evt => this.onPointerDown(evt), {passive: true});
			this.$el.addEventListener("pointerup", evt => this.onPointerUp(evt), {passive: true});
		},

		computed: {

			scopedSlots()
			{
				return Object.keys(this.$scopedSlots);
			},

			slots()
			{
				return Object.keys(this.$slots)
					.filter(k => k !== "default");
			}

		},

		methods: {

			createRipple(x, y)
			{
				const ripple = document.createElement("div");
				ripple.classList.add("ripple");
				ripple.style.setProperty("top", `${y - 18}px`);
				ripple.style.setProperty("left", `${x - 18}px`);
				ripple.style.setProperty("transition-duration", `90ms, ${this.rippleDuration + 180}ms`);

				this.container.appendChild(ripple);

				return ripple;
			},

			onPointerDown(evt)
			{
				const {x, y} = relativeCoordsTo(this.$el, evt);

				this.isBackgroundVisible = true;
				this.preparedRipple = this.createRipple(x, y);
			},

			onPointerUp(evt)
			{
				const {x, y} = relativeCoordsTo(this.$el, evt);

				if (this.backgroundTimeout !== null)
					clearTimeout(this.backgroundTimeout);

				this.backgroundTimeout = timeout(this.rippleDuration, () =>
				{
					this.backgroundTimeout = null;
					this.isBackgroundVisible = false;
				});

				if (this.preparedRipple === null)
					return;

				const ripple = this.preparedRipple;
				this.preparedRipple = null;

				ripple.style.setProperty("top", `${y - 18}px`);
				ripple.style.setProperty("left", `${x - 18}px`);
				ripple.classList.add("is-visible");

				this.$nextTick(() => ripple.classList.add("is-scaling"));

				timeout(this.rippleDuration, () =>
				{
					ripple.style.setProperty("transition-duration", `180ms, ${this.rippleDuration + 180}ms`);
					ripple.classList.add("is-hiding");
				});
				timeout(this.rippleDuration + 180, () => ripple.remove());
			}

		},

		watch: {

			isBackgroundVisible()
			{
				if (this.isBackgroundVisible && this.rippleBackground)
					this.container.classList.add("is-background-visible");
				else
					this.container.classList.remove("is-background-visible");
			}

		}

	}

</script>

<style lang="scss">

	div.ripple-container
	{
		--ripple-color-private: var(--ripple-color, var(--color-dark));
		--ripple-scale-private: var(--ripple-scale, 6);

		position: absolute;
		display: block;
		contain: paint;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: transparent;
		border-radius: inherit;
		overflow: hidden;
		pointer-events: none;
		transition: background 180ms var(--ease-swift-out);
		will-change: background;

		&.is-background-visible
		{
			background: rgba(var(--ripple-color-private), .05);
		}

		div.ripple
		{
			position: absolute;
			display: block;
			height: 36px;
			width: 36px;
			background: rgba(var(--ripple-color-private), .05);
			border-radius: 18px;
			opacity: 0;
			transition: opacity var(--ease-swift-out), transform var(--ease-standard-curve);

			&.is-visible
			{
				opacity: 1;
			}

			&.is-hiding
			{
				opacity: 0;
			}

			&.is-scaling
			{
				transform: scale3d(var(--ripple-scale-private), var(--ripple-scale-private), var(--ripple-scale-private));
			}
		}
	}

</style>
