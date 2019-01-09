<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<span class="latte-moment">{{ formatted_moment }}</span>

</template>

<script>

	export default {

		name: "latte-moment",

		props: {

			format: {
				default: "d MMMM YYYY",
				required: false,
				type: String
			},

			unixTimestamp: {
				default: () => Date.now(),
				required: false,
				type: Number
			}

		},

		computed: {

			formatted_moment()
			{
				return moment(this.unixTimestamp).format(this.format);
			}

		}
	}

</script>
