<!--
  - Copyright © 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel mega-menu" :class="{'is-open': isOpen}">
		<slot></slot>
	</div>

</template>

<script>

	export default {

		name: "latte-mega-menu",

		data()
		{
			return {
				isOpen: false
			};
		},

		methods: {

			close()
			{
				this.isOpen = false;
			},

			open()
			{
				this.isOpen = true;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			}

		},

		watch: {

			isOpen()
			{
				this.$emit("open", this.isOpen);
			}

		}

	}

</script>

<style lang="scss">

	div.mega-menu
	{
		position: fixed;
		left: 0;
		right: 0;
		padding: 3rem 0;
		box-shadow: var(--dropdown-elevation);
		transition: all 480ms var(--ease-swift-out);
		will-change: transform;
		z-index: 1001;

		&:not(.is-open)
		{
			pointer-events: none;
			transform: translate3d(0, -100%, 0);
			visibility: collapse;
		}
	}

</style>
