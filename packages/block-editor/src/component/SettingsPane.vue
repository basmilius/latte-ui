<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<KeepAliveTab :label="label" class="be-settings-pane">
		<slot></slot>
	</KeepAliveTab>

</template>

<script>

	import KeepAliveTab from "./KeepAliveTab";

	export default {

		name: "SettingsPane",

		components: {KeepAliveTab},

		props: {
			label: {required: true, type: String}
		}

	}

</script>
