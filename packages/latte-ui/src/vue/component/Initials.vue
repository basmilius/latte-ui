<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<rect :fill="color" height="24" width="24" opacity="0.1"></rect>
		<text :fill="color" x="12" y="15.5" font-family="proxima-nova,Arial,Helvetica" font-size="10" font-weight="600" text-anchor="middle" text-rendering="geometricPrecision">{{ initials.toUpperCase() }}</text>
	</svg>

</template>

<script>

	const AVATAR_COLORS = [
		"#477d59",
		"#a54549",
		"#c1823f",
		"#3c9b9f",
		"#aa4b83",
		"#b3464b",
		"#e5993b",
		"#7f51a9"
	];

	export default {

		name: "latte-initials",

		props: {
			initials: {default: "BM", type: String}
		},

		data()
		{
			return {
				seed: 0
			};
		},

		mounted()
		{
			this.onInitialsChanged();
		},

		computed: {

			color()
			{
				return AVATAR_COLORS[this.seed % AVATAR_COLORS.length];
			}

		},

		methods: {

			onInitialsChanged()
			{
				let seed = 0;

				for (let i = 0; i < this.initials.length; i++)
					seed ^= this.initials.charCodeAt(i);

				this.seed = seed;
			}

		},

		watch: {

			initials()
			{
				this.onInitialsChanged();
			}

		}

	}

</script>
