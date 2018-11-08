<template>

	<!--<div class="progress progress-bar" :class="{'is-indeterminate': isIndeterminate}">-->
	<!--<div class="progress-value"></div>-->
	<!--</div>-->

	<svg class="progress progress-ring" :class="{'is-determinate': !isIndeterminate, 'is-indeterminate': isIndeterminate}" style="height: 48px; width: 48px" viewBox="0 0 24 24">
		<defs>
			<linearGradient id="wave">
				<stop offset="0%" stop-color="transparent"></stop>
				<stop offset="50%" stop-color="var(--progress-wave-private)"></stop>
				<stop offset="100%" stop-color="transparent"></stop>
			</linearGradient>
		</defs>
		<circle class="progress-track" r="11" cx="12" cy="12" x="0" y="0" fill="transparent" stroke-width="3" shape-rendering="geometricPrecision"></circle>
		<circle class="progress-value" r="11" cx="12" cy="12" x="0" y="0" fill="transparent" stroke-width="3" shape-rendering="geometricPrecision"></circle>
	</svg>

</template>

<script>

	export default {

		name: "latte-progress",

		props: {

			isIndeterminate: {
				default: false,
				required: false,
				type: Boolean
			},

			max: {
				default: 0,
				required: false,
				type: Number
			},

			min: {
				default: 100,
				required: false,
				type: Number
			},

			value: {
				default: 0,
				required: false,
				type: Number
			}

		}

	}

</script>


<style lang="scss">

	.progress
	{
		--progress-color-private: var(--progress-color, rgb(var(--color-primary)));
		--progress-track-private: var(--progress-track, rgba(var(--color-dark), .1));
		--progress-wave-private: var(--progress-wave, rgb(var(--color-primary-foreground), .3));

		position: relative;
		display: inline-block;
		overflow: hidden;
		vertical-align: middle;

		&.progress-bar
		{
			height: 6px;
			width: 100%;
			background: var(--progress-track-private);
			border-radius: var(--border-radius);

			&.is-indeterminate
			{
				background: var(--progress-color-private);

				&::after
				{
					position: absolute;
					display: block;
					top: 0;
					left: 0;
					height: inherit;
					margin-left: -20%;
					width: 40%;
					content: "";
					animation: wave-animation 1200ms infinite linear;
					background: linear-gradient(to right, transparent, var(--progress-wave-private), transparent);
				}
			}
		}

		&.progress-ring
		{
			border-radius: 999px;

			circle.progress-track
			{
				stroke: var(--progress-track-private);
			}

			circle.progress-value
			{
				transform-origin: center center;
				stroke: var(--progress-color-private);
			}

			&.is-determinate
			{
				circle.progress-value
				{
					stroke-dasharray: unquote("70 999");
				}
			}

			&.is-indeterminate
			{
				circle.progress-track
				{
					stroke: var(--progress-color-private);
				}

				circle.progress-value
				{
					animation: wave-ring-animation 700ms infinite linear;
					stroke: url(#wave);
					stroke-dasharray: unquote("70 999");
				}
			}
		}
	}

	@keyframes wave-animation
	{
		from
		{
			left: -20%;
		}

		to
		{
			left: 120%;
		}
	}

	@keyframes wave-ring-animation
	{
		from
		{
			transform: rotate3d(0, 0, 1, 0deg);
		}

		to
		{
			transform: rotate3d(0, 0, 1, 360deg);
		}
	}

</style>
