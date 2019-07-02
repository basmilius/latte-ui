<template>

	<div class="be-inserter be-inserter-popup">
		<latte-expandable class="be-inserter-category" group="be-inserter" :opened="index === 0" v-for="(category, index) of blocksCategorized">

			<template v-slot:header="{isOpen}">

				<div class="be-inserter-header" :class="{'is-open': isOpen}">
					<i class="mdi" :class="`mdi-${category.icon}`"></i>
					<span>{{ category.name }}</span>
					<i class="mdi" :class="{'mdi-chevron-down': !isOpen, 'mdi-chevron-up': isOpen}"></i>
				</div>

			</template>

			<div class="be-inserter-body">
				<template v-if="category.blocks.length > 0">

					<button class="be-inserter-block" @click="select(block.id)" :data-tooltip="block.description" v-for="block of category.blocks">
						<i class="mdi" :class="`mdi-${block.icon}`"></i>
						<span>{{ block.name }}</span>
					</button>

				</template>
				<template v-else>

					<div class="be-inserter-empty">
						<span>{{ "There are no blocks in this category." | i18n("latte-ui") }}</span>
					</div>

				</template>
			</div>

		</latte-expandable>
	</div>

</template>

<script>

	import { Latte } from "@bybas/latte-ui";

	export default {

		name: "BEInserterPopup",

		props: {

			blocks: {
				default: () => [],
				required: true,
				type: Array
			},

			categories: {
				default: () => [],
				required: true,
				type: Array
			}

		},

		computed: {

			blocksCategorized()
			{
				return this.categories.map(c =>
				{
					c.blocks = this.blocks.filter(b => b.category === c.id);

					return c;
				});
			}

		},

		methods: {

			select(id)
			{
				this.$emit("select", id);
				Latte.action.dispatch("latte:context-menu");
			}

		}

	}

</script>
