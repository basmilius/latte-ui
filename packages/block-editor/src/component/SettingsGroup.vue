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
			{{ title | i18n }}
		</div>

		<div class="settings-body" :class="{'is-padded': padded}">
			<slot></slot>
		</div>

	</div>

</template>

<script>

	import { findEditor } from "../util/vue";
	import { generateEditorI18n } from "../core/i18n";

	export default {

		name: "SettingsGroup",

		filters: {
			i18n: generateEditorI18n()
		},

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
