<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<svg class="progress progress-ring" :class="{'is-determinate': !isIndeterminate, 'is-indeterminate': isIndeterminate}" style="height: 48px; width: 48px" viewBox="0 0 24 24" v-if="isRing">
		<defs>
			<linearGradient id="wave">
				<stop offset="0%" stop-color="rgb(var(--progress-color))"></stop>
				<stop offset="25%" stop-color="rgb(var(--progress-color))"></stop>
				<stop offset="25.1%" stop-color="transparent"></stop>
				<stop offset="100%" stop-color="transparent"></stop>
			</linearGradient>
		</defs>
		<circle class="progress-track" r="11" cx="12" cy="12" fill="transparent" stroke-width="3"></circle>
		<circle class="progress-value" r="11" cx="12" cy="12" fill="transparent" stroke-width="3" :stroke-dasharray="ringStyle"></circle>
	</svg>

	<div class="progress progress-bar" :class="{'is-indeterminate': isIndeterminate}" v-else>
		<div class="progress-value" :style="barStyle"></div>
	</div>

</template>

<script>

	const DASH_CAP = 69;

	export default {

		name: "latte-progress",

		props: {
			isIndeterminate: {default: false, type: Boolean},
			isRing: {default: false, type: Boolean},
			max: {default: 100, type: Number},
			min: {default: 0, type: Number},
			value: {default: 0, type: Number}
		},

		data()
		{
			return {
				bar: 0,
				ring: 0
			};
		},

		mounted()
		{
			this.renderProgress();
		},

		computed: {

			barStyle()
			{
				if (this.isIndeterminate)
					return {};

				return {
					width: `${this.bar}%`
				};
			},

			ringStyle()
			{
				if (this.isIndeterminate)
					return "40 999";

				return `${this.ring} 999`;
			}

		},

		methods: {

			renderProgress()
			{
				if (this.isIndeterminate)
					return;

				const max = this.max - this.min;
				const value = Math.max(this.min, Math.min(this.max, this.value)) - this.min;
				const p = value / max;

				if (this.isRing)
					this.renderProgressRing(p);
				else
					this.renderProgressBar(p);
			},

			renderProgressBar(p)
			{
				this.bar = p * 100;
			},

			renderProgressRing(p)
			{
				this.ring = p * DASH_CAP;
			}

		},

		watch: {

			isIndeterminate()
			{
				this.renderProgress();
			},

			isRing()
			{
				this.renderProgress();
			},

			max()
			{
				this.renderProgress();
			},

			min()
			{
				this.renderProgress();
			},

			value()
			{
				this.renderProgress();
			}

		}

	}

</script>
