<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	export default {

		functional: true,

		name: "latte-moment",

		props: {
			format: {default: "d MMMM YYYY", type: String},
			ms: {default: () => Date.now(), type: Number}
		},

		render(h, {parent, props, _v})
		{
			return _v(parent.moment(props.ms).format(props.format));
		}

	}

</script>
