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

			// TODO(Bas): Implement centered ripple.
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

			this.$el.addEventListener("pointercancel", evt => this.onPointerCancel(evt), {passive: true});
			this.$el.addEventListener("pointerout", evt => this.onPointerCancel(evt), {passive: true});
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
				ripple.style.setProperty("--ripple-duration-private", `${this.rippleDuration + 180}ms`);

				this.container.appendChild(ripple);

				return ripple;
			},

			onPointerCancel()
			{
				if (this.preparedRipple !== null)
					this.preparedRipple.remove();

				this.isBackgroundVisible = false;
				this.preparedRipple = null;
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
				ripple.classList.add("is-scaling");
				ripple.classList.add("is-visible");

				timeout(this.rippleDuration, () => ripple.classList.add("is-hiding"));
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
