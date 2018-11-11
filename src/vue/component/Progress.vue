<template>

	<div class="progress progress-bar" :class="{'is-indeterminate': isIndeterminate}" v-if="isBar">
		<div class="progress-value" :style="barStyle"></div>
	</div>

	<svg class="progress progress-ring" :class="{'is-determinate': !isIndeterminate, 'is-indeterminate': isIndeterminate}" style="height: 48px; width: 48px" viewBox="0 0 24 24" v-else-if="isRing">
		<defs>
			<linearGradient id="wave">
				<stop offset="0%" stop-color="transparent"></stop>
				<stop offset="50%" stop-color="var(--progress-wave-private)"></stop>
				<stop offset="100%" stop-color="transparent"></stop>
			</linearGradient>
		</defs>
		<circle class="progress-track" r="11" cx="12" cy="12" x="0" y="0" fill="transparent" stroke-width="3"></circle>
		<circle class="progress-value" r="11" cx="12" cy="12" x="0" y="0" fill="transparent" stroke-width="3" :stroke-dasharray="ringStyle"></circle>
	</svg>

</template>

<script>

	const DASH_CAP = 69;

	export default {

		name: "latte-progress",

		props: {

			isIndeterminate: {
				default: false,
				required: false,
				type: Boolean
			},

			max: {
				default: 100,
				required: false,
				type: Number
			},

			min: {
				default: 0,
				required: false,
				type: Number
			},

			mode: {
				default: "bar",
				required: false,
				type: String,
				validator: value => ["bar", "ring"].contains(value)
			},

			value: {
				default: 0,
				required: false,
				type: Number
			}

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

			isBar()
			{
				return this.mode === "bar";
			},

			isRing()
			{
				return this.mode === "ring";
			},

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
					return "";

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

				if (this.isBar)
					this.renderProgressBar(p);
				else if (this.isRing)
					this.renderProgressRing(p);
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

			max()
			{
				this.renderProgress();
			},

			mode()
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
