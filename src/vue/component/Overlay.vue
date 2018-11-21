<template>

	<div class="latte-overlay" role="dialog" :class="{'is-visible': isVisible, 'is-open': isOpen}" v-if="isVisible" v-cloak>
		<slot></slot>
	</div>

</template>

<script>

	import { dispatch } from "../../js/actions";
	import { open, register, remove } from "../../js/ui/overlays";
	import { timeout } from "../../js/core";

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
				isVisible: false
			};
		},

		beforeDestroy()
		{
			document.body.removeChild(this.$el);
			this.$el.parentNode.appendChild(this.$el);
		},

		destroyed()
		{
			remove(this.name);
		},

		mounted()
		{
			register(this.name, this);

			this.$el.parentNode.removeChild(this.$el);
			document.body.appendChild(this.$el);

			if (this.opened)
				open(this.name);
		},

		methods: {

			close()
			{
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
				timeout(20, () => this.isOpen = true);

				dispatch("latte:overlay", {overlay: this, open: true});
				this.$emit("open", this);
			}

		},

		watch: {

			name(n, o)
			{
				remove(o);
				register(n, this);
			}

		}

	}

</script>
