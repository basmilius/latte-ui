<template>

	<div class="latte-overlay" role="dialog" :class="{'is-visible': isVisible, 'is-open': isOpen}" v-if="isVisible" v-cloak>
		<slot></slot>
	</div>

</template>

<script>

	import { dispatch } from "../../js/actions";
	import { register, remove } from "../../js/ui/overlays";
	import { timeout } from "../../js/core";
	import { needsZIndex } from "../../js/z";

	export default {

		name: "latte-overlay",

		props: {

			name: {
				required: true,
				type: String
			},

			opened: {
				default: false,
				type: Boolean
			}

		},

		data()
		{
			return {
				isOpen: false,
				isVisible: false,
				parentRef: null
			};
		},

		beforeDestroy()
		{
			document.body.removeChild(this.$el);
			this.parentRef.appendChild(this.$el);
		},

		destroyed()
		{
			remove(this.name);
		},

		mounted()
		{
			register(this.name, this);

			this.parentRef = this.$el.parentNode;
			this.parentRef.removeChild(this.$el);
			document.body.appendChild(this.$el);

			if (this.opened)
				this.open(this.name);
		},

		methods: {

			close()
			{
				if (!this.isVisible)
					return;

				this.isOpen = false;
				timeout(270, () => this.isVisible = false);

				dispatch("latte:overlay", {overlay: this, open: false});
				this.$emit("close", this);
			},

			open()
			{
				if (this.isVisible)
					return;

				this.isVisible = true;
				timeout(10, () =>
				{
					needsZIndex(z => this.$el.style.setProperty("z-index", z));
					this.isOpen = true;
				});

				dispatch("latte:overlay", {overlay: this, open: true});
				this.$emit("open", this);
			}

		},

		watch: {

			name(n, o)
			{
				remove(o);
				register(n, this);
			},

			opened()
			{
				if (this.opened)
					this.open();
				else
					this.close();
			}

		}

	}

</script>
