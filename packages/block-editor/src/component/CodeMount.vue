<template>

	<latte-tab-container class="be-content-mount d-flex flex-column code-view">
		<template #default="{tabs, setCurrent}">

			<latte-portal slim to="toolbar-center">

				<nav class="nav nav-tabs" style="--tabs-accent: var(--color-primary)">

					<template v-for="(tab, index) in tabs">
						<a class="nav-link" :class="{'is-active': tab.active}" @click="setCurrent(index)">
							<Icon :name="tab.icon" v-if="tab.icon !== ''"/>
							<span v-if="tab.label !== ''">{{ tab.label }}</span>
							<span class="badge badge-primary ml-2" v-if="tab.badge !== ''">{{ tab.badge }}</span>
						</a>
					</template>

				</nav>

			</latte-portal>

			<latte-tab label="HTML" class="flex-grow-1">
				<textarea readonly class="text-monospace" :aria-label="'Code view' | beTranslate">{{ html }}</textarea>
			</latte-tab>

			<latte-tab label="JSON" class="flex-grow-1">
				<textarea readonly class="text-monospace" :aria-label="'Code view' | beTranslate">{{ json }}</textarea>
			</latte-tab>

		</template>
	</latte-tab-container>

</template>

<script>

	import { BlockInstance } from "../core/block/instance";
	import { convertToHtml, convertToJson } from "../core/block/api";

	export default {

		name: "CodeMount",

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
