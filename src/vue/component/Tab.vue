<template>

	<div class="tab" v-if="active">
		<slot></slot>
	</div>

</template>

<script>

	export default {

		name: "latte-tab",

		props: {

			icon: {
				default: "",
				required: false,
				type: String
			},

			label: {
				default: "",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				active: false
			};
		},

		mounted()
		{
			this.$parent.updateChildren();
		},

		watch: {

			active()
			{
				this.$emit("active", this.active);
			}

		}

	}

</script>
