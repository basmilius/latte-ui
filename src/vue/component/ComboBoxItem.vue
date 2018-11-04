<template>

	<a class="nav-link" :class="{'is-hover': active}" role="option" @click="click">
		<slot></slot>
	</a>

</template>

<script>

	export default {

		name: "latte-combo-box-item",

		props: {

			active: {
				default: false,
				required: false,
				type: Boolean
			},

			value: {
				required: true
			}

		},

		beforeDestroy()
		{
			this.$parent.unregisterOption(this);
		},

		mounted()
		{
			this.$parent.registerOption(this);
		},

		methods: {

			click()
			{
				this.$emit("select", this);
			}

		}

	}

</script>
