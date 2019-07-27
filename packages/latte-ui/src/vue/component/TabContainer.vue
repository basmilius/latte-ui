<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="tab-container">
		<slot></slot>
	</div>

</template>

<script>

	export default {

		name: "latte-tab-container",

		props: {
			initialTab: {default: 0, type: Number}
		},

		data()
		{
			return {
				current: this.initialTab,
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

				if (this.tabs[this.current])
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
				this.$emit("change", this.current);
				this.updateCurrent();
			},

			initialTab()
			{
				this.current = this.initialTab;
			},

			tabs()
			{
				this.updateTabBars();
			}

		}

	}

</script>
