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

		nav.nav.nav-list
		{
			div.divider
			{
				margin: 9px 0;
			}

			div.section
			{
				margin: 0;
				padding: 9px 0;
				color: inherit;
				font-weight: 500;
			}

			a.nav-link
			{
				height: unset;
				margin: 0;
				padding: 9px 0;
				background: transparent;

				&:hover
				{
					background: transparent;
					color: RGB(var(--color-primary));
				}
			}
		}
	}

</style>
