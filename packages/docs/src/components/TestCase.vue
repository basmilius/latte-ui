<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel panel-blank overflow-hidden">
		<div class="panel-header">
			<span class="panel-title">{{ title }}</span>
		</div>
		<div class="panel-body">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	export default {

		name: "TestCase",

		props: {
			title: {default: "TestCase", type: String}
		}

	}

</script>
