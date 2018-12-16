<!--
  - Copyright © 2018 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<component :is="as">
		<slot :data="data" :is-loading="isLoading" :params="params" :set-param="setParam"></slot>
	</component>

</template>

<script>

	import { request } from "../../js/api";
	import { handleError } from "../../js/core";

	export default {

		name: "latte-data-fragment",

		props: {

			as: {
				default: "div",
				required: false,
				type: String
			},

			initialParams: {
				default: () =>
				{
					return {};
				},
				required: false,
				type: Object

			},

			url: {
				default: null,
				required: true,
				type: String | null
			}

		},

		data()
		{
			return {
				data: null,
				isLoading: false,
				params: this.initialParams
			};
		},

		mounted()
		{
			this.load();
		},

		methods: {

			load()
			{
				this.reset();

				if (this.url === null)
					return;

				this.isLoading = true;

				const params = new URLSearchParams(this.params);

				request(`${this.url}?${params}`)
					.then(r => r.json())
					.then(r => this.onReceivedData(r))
					.catch(err => handleError(err));
			},

			reset()
			{
				this.data = null;
			},

			setParam(name, value)
			{
				this.$set(this.params, name, value);
			},

			onReceivedData(response)
			{
				this.data = response.data;
				this.isLoading = false;
			}

		},

		watch: {

			params: {
				deep: true,
				handler()
				{
					this.load();
				}
			},

			url()
			{
				this.load();
			}

		}

	}

</script>
