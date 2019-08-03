<template>

	<div class="rgb-display" :style="styles">
		<span>{{ rgb[0] }}, {{ rgb[1] }}, {{ rgb[2] }}</span>
	</div>

</template>

<script>

	export default {

		name: "RgbDisplay",

		props: {

			rgb: {default: () => [0, 0, 0], required: true, type: Array}

		},

		computed: {

			styles()
			{
				return {
					"--color": `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`
				};
			}

		}

	}

</script>

<style lang="scss" scoped>

	div.rgb-display
	{
		position: relative;
		display: flex;
		align-items: center;

		&::before
		{
			position: relative;
			height: 1em;
			margin-right: 1rem;
			width: 1em;
			content: "";
			background: var(--color);
			border-radius: .5em;
			box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
		}
	}

</style>
