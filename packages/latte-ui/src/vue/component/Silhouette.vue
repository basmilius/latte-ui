<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	export default {

		name: "latte-silhouette",

		props: {
			as: {default: "div", type: String}
		},

		render(h)
		{
			return h(this.as, {
				class: "silhouette"
			});
		}

	}

</script>
