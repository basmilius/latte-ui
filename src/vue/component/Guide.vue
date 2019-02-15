<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="guide-overlay" v-if="canGuide">
		<div class="guide-mask" :style="maskStyleTop"></div>
		<div class="guide-mask" :style="maskStyleLeft"></div>
		<div class="guide-mask" :style="maskStyleRight"></div>
		<div class="guide-mask" :style="maskStyleBottom"></div>
	</div>

</template>

<script>

	import { raf } from "../../js/util/dom";

	const exampleGuidance = {
		name: "Example Guide",
		steps: [
			{
				focusElement: "button#nav-toggle",
				popElement: "div.app-bar-main",
				infoWindow: {
					title: "Let's get started!",
					message: "Click here to start using this website"
				},
				nextElement: "button#nav-toggle"
			},
			{
				delay: 420,
				focusElement: "a#team",
				popElement: "div#mega-menu > div.container",
				infoWindow: {
					title: "Meet everyone",
					message: "See our team and get to know us!",
					actions: [
						{
							action: "guide:next",
							label: "Next"
						},
						{
							action: "guide:close",
							classes: ["ml-auto"],
							label: "Close"
						}
					]
				},
				nextElement: "a#team"
			},
			{
				focusElement: "footer.footer img",
				popElement: "footer.footer div.container div.col-12:first-child",
				infoWindow: {
					title: "Let's get started!",
					message: "Click here to start using this website"
				},
				nextElement: "footer.footer img"
			}
		]
	};

	export default {

		name: "latte-guide",

		props: {

			guidance: {
				default: () => exampleGuidance,
				required: false,
				type: Object
			},

			opened: {
				default: false,
				required: false,
				type: Boolean
			}

		},

		data()
		{
			return {
				currentPopElement: undefined,
				currentPopElementRect: undefined,
				currentStepIndex: 0
			};
		},

		mounted()
		{
			raf(() => this.onCurrentStepChanged());
		},

		computed: {

			canGuide()
			{
				return true;
			},

			currentStep()
			{
				return this.guidance.steps[this.currentStepIndex] || undefined;
			},

			maskStyleTop()
			{
				if (this.currentPopElementRect === undefined)
					return {};

				return {
					bottom: `${window.innerHeight - this.currentPopElementRect.top}px`
				};
			},

			maskStyleLeft()
			{
				if (this.currentPopElementRect === undefined)
					return {};

				return {
					top: `${this.currentPopElementRect.top}px`,
					right: `${window.innerWidth - this.currentPopElementRect.left}px`,
					bottom: `${window.innerHeight - this.currentPopElementRect.bottom}px`
				};
			},

			maskStyleRight()
			{
				if (this.currentPopElementRect === undefined)
					return {};

				return {
					top: `${this.currentPopElementRect.top}px`,
					left: `${this.currentPopElementRect.right}px`,
					bottom: `${window.innerHeight - this.currentPopElementRect.bottom}px`
				};
			},

			maskStyleBottom()
			{
				if (this.currentPopElementRect === undefined)
					return {};

				return {
					top: `${this.currentPopElementRect.bottom}px`
				};
			}

		},

		methods: {

			onCurrentStepChanged()
			{
				if (this.currentStep === undefined)
					return;

				raf(() =>
				{
					this.currentPopElement = this.currentStep.popElement ? document.querySelector(this.currentStep.popElement) : undefined;
					this.nextElement = this.currentStep.nextElement ? document.querySelector(this.currentStep.nextElement) : undefined;

					raf(() =>
					{
						if (this.currentPopElement)
							this.currentPopElementRect = this.currentPopElement.getBoundingClientRect();

						if (this.nextElement)
							this.nextElement.addEventListener("click", () => this.currentStepIndex++, {once: true});
					}, this.currentStep.delay || 0);
				});
			}

		},

		watch: {

			currentStep()
			{
				this.onCurrentStepChanged();
			},

			currentStepIndex()
			{
				this.currentPopElement = undefined;
				this.nextElement = undefined;

				if (this.currentStepIndex >= this.guidance.steps.length)
					this.currentStepIndex = 0;
			}

		}

	}

</script>

<style lang="scss" scoped>

	div.guide-overlay
	{
		position: fixed;
		display: block;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		z-index: 10000;
	}

	div.guide-mask
	{
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--overlay-background);
		pointer-events: all;
		transition: all 630ms var(--ease-swift-out);
		will-change: top, left, right, bottom;
	}

</style>
