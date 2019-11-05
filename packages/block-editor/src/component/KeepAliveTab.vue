<template>

	<div class="tab" v-show="active">
		<slot></slot>
	</div>

</template>

<script>

	import { findGrandparent } from "../util/vue";

	export default {

		name: "latte-tab",

		props: {
			badge: {default: "", type: String},
			icon: {default: "", type: String},
			label: {default: "", type: String}
		},

		data()
		{
			return {
				active: false,
				container: findGrandparent(this, "latte-tab-container")
			};
		},

		mounted()
		{
			if (this.container)
				this.container.updateChildren();
		},

		watch: {

			active()
			{
				this.$emit("active", this.active);
			}

		}

	}

</script>
