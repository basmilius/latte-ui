<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-tab-container class="be-content-mount d-flex flex-column code-view">
		<template #default="{tabs, setCurrent}">

			<latte-portal slim to="toolbar-center">

				<nav class="nav nav-tabs" style="--tabsAccent: var(--colorPrimary); --tabsHeight: calc(var(--appBarHeight) + 1px); margin-bottom: -1px">

					<template v-for="(tab, index) in tabs">
						<a class="nav-link" :class="{'is-active': tab.active}" @click="setCurrent(index)">
							<Icon :name="tab.icon" v-if="tab.icon !== ''"/>
							<span v-if="tab.label !== ''">{{ tab.label }}</span>
							<span class="badge badge-primary ml-2" v-if="tab.badge !== ''">{{ tab.badge }}</span>
						</a>
					</template>

				</nav>

			</latte-portal>

			<latte-tab label="JSON" class="flex-grow-1">
				<!--suppress HtmlFormInputWithoutLabel -->
				<textarea readonly class="text-monospace" :aria-label="'code_view.json' | i18n">{{ json }}</textarea>
			</latte-tab>

			<latte-tab label="HTML" class="flex-grow-1">
				<!--suppress HtmlFormInputWithoutLabel -->
				<textarea readonly class="text-monospace" :aria-label="'code_view.html' | i18n">{{ html }}</textarea>
			</latte-tab>

		</template>
	</latte-tab-container>

</template>

<script>

	import { BlockInstance } from "../core/block/instance";
	import { convertToHtml, convertToJson } from "..";
	import { generateEditorI18n } from "../core/i18n";

	export default {

		name: "CodeMount",

		filters: {
			i18n: generateEditorI18n()
		},

		props: {
			content: {required: true, type: BlockInstance | null}
		},

		computed: {

			html()
			{
				return convertToHtml(this.content);
			},

			json()
			{
				return convertToJson(this.content, true);
			}

		}

	}

</script>
