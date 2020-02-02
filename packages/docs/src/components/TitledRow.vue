<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="container">
		<div class="row">
			<div class="col-12 mb-4">
				<h4 class="font-weight-normal m-0">{{ title }}</h4>
			</div>
		</div>
		<div class="row">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	export default {

		name: "TitledRow",

		props: {
			title: {default: "Title", type: String}
		}

	}

</script>
