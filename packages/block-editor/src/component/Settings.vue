<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-tab-container class="be-editor-settings" :initial-tab="preferredTabIndex">
		<template #default="{tabs}">

			<latte-tab-bar class="px-3 is-fluid" v-if="tabs.length > 1"/>

			<slot name="before"></slot>

			<SettingsPane :label="'Document' | beTranslate">

				<slot name="document">
					<div class="be-settings-group">
						<div class="settings-body is-padded">
							<Notice icon="alert-circle">
								<p>{{ "There are no document settings available" | beTranslate }}</p>
							</Notice>
						</div>
					</div>
				</slot>

			</SettingsPane>

			<SettingsPane :label="'Block' | beTranslate">
				<latte-portal-target :name="blockSettingsId" @change="onBlockSettingsChange">

					<SettingsGroup padded title="Block settings">
						<em>{{ "Please select a block to edit its settings or click on \"Document\" to edit other settings." | beTranslate }}</em>
					</SettingsGroup>

				</latte-portal-target>
			</SettingsPane>

			<slot name="after"></slot>

		</template>
	</latte-tab-container>

</template>

<script>

	import { findEditor } from "../util/vue";

	import SettingsGroup from "./SettingsGroup";
	import SettingsPane from "./SettingsPane";
	import Notice from "../ui/Notice";

	export default {

		name: "Settings",

		components: {Notice, SettingsGroup, SettingsPane},

		data()
		{
			return {
				editor: findEditor(this),
				preferredTabIndex: 0
			};
		},

		computed: {

			blockSettingsId()
			{
				return `${this.editor.uniqueId}-settings-block`;
			}

		},

		methods: {

			onBlockSettingsChange(passengers)
			{
				this.preferredTabIndex = Object.values(passengers).length === 0 ? 0 : 1;
			}

		}

	}

</script>
