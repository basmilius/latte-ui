<template>

	<div class="tab-container">
		<slot></slot>
	</div>

</template>

<script>

	export default {

		name: "latte-tab-container",

		data()
		{
			return {
				current: 0,
				tabs: []
			};
		},

		mounted()
		{
			this.updateChildren();
		},

		methods: {

			updateChildren()
			{
				this.tabs = this.$children
					.filter(c => c.$options.name === "latte-tab");
			},

			updateCurrent()
			{
				this.tabs.forEach(t => t.active = false);
				this.tabs[this.current].active = true;
			},

			updateTabBars()
			{
				this.$children
					.filter(c => c.$options.name === "latte-tab-bar")
					.forEach(c => this.$set(c, "tabs", this.tabs));

				this.updateCurrent();
			}

		},

		watch: {

			current()
			{
				this.updateCurrent();
			},

			tabs()
			{
				this.updateTabBars();
			}

		}

	}

</script>
