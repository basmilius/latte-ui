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

		name: "Icon",

		props: {
			name: {required: true, type: String}
		},

		render(h)
		{
			return h("i", {
				class: ["mdi", `mdi-${this.name}`],
				attrs: {
					"aria-hidden": "true"
				}
			});
		}

	}

</script>
