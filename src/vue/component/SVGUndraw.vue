<!--
  - Copyright © 2018 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<component ref="svgComponent" :is="svg" v-if="svg !== null"></component>

</template>

<script>

	import { handleError } from "../../js/core";
	import { request } from "../../js/api";

	export default {

		name: "latte-svg-undraw",

		props: {

			color: {
				default: "#000000",
				required: false,
				type: String
			},

			url: {
				default: "",
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				svg: null
			};
		},

		mounted()
		{
			this.onUrlChanged();
		},

		methods: {

			onReceivedSVG(response)
			{
				const color = this.color;

				this.svg = Vue.extend({

					template: response.replace(new RegExp(` width="([0-9.]+)" height="([0-9.]+)"`, "g"), "").replace(/fill="#6c63ff"/g, ":fill=\"color\""),

					data()
					{
						return {
							color
						};
					}

				});
			},

			onUrlChanged()
			{
				request(this.url)
					.then(r => r.text())
					.then(r => this.onReceivedSVG(r))
					.catch(err => handleError(err));
			}

		},

		watch: {

			color()
			{
				if (this.$refs.svgComponent)
					this.$refs.svgComponent.color = this.color;
			},

			url()
			{
				this.onUrlChanged();
			}

		}

	}

</script>
