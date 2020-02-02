<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="be-settings-group">

		<div class="settings-header">
			{{ title | beTranslate }}
		</div>

		<div class="settings-body" :class="{'is-padded': padded}">
			<slot></slot>
		</div>

	</div>

</template>

<script>

	import { findEditor } from "../util/vue";

	export default {

		name: "SettingsGroup",

		props: {
			padded: {default: false, type: Boolean},
			title: {default: "Group", type: String}
		},

		data()
		{
			return {
				editor: findEditor(this)
			};
		}

	}

</script>
