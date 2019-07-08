<template>

	<latte-popup ref="popup" :associate-with="assiciatedElement" :margin-x="marginX" :margin-y="marginY" @close="onClose" @open="onOpen">

		<div class="be-inserter be-inserter-popup">
			<div class="be-inserter-category" v-for="category of blocksCategorized">

				<div class="be-inserter-header" :class="{'is-open': (currentCategory === category.id)}" @click="currentCategory = category.id">
					<i class="mdi" :class="`mdi-${category.icon}`"></i>
					<span>{{ category.name | i18n("latte-ui") }}</span>
					<i class="mdi" :class="{'mdi-chevron-down': !(currentCategory === category.id), 'mdi-chevron-up': (currentCategory === category.id)}"></i>
				</div>

				<div class="be-inserter-body" v-if="currentCategory === category.id">
					<template v-if="category.blocks.length > 0">

						<button class="be-inserter-block" @click="select(block.id)" :data-tooltip="block.description | i18n('latte-ui')" v-for="block of category.blocks">
							<i class="mdi" :class="`mdi-${block.icon}`"></i>
							<span>{{ block.name | i18n("latte-ui") }}</span>
						</button>

					</template>
					<template v-else>

						<div class="be-inserter-empty">
							<span>{{ "There are no blocks in this category." | i18n("latte-ui") }}</span>
						</div>

					</template>
				</div>

			</div>
		</div>

	</latte-popup>

</template>

<script>

	import { editorInstance } from "./utils";

	export default {

		name: "BEInserterPopup",

		data()
		{
			return {
				assiciatedElement: undefined,
				currentCategory: null,
				editor: editorInstance(this),
				fn: undefined,
				isOpen: false,
				marginX: 0,
				marginY: 0
			};
		},

		computed: {

			blocksCategorized()
			{
				return this.editor.categories.map(c =>
				{
					c.blocks = this.editor.blocks.filter(b => b.category === c.id);

					return c;
				});
			}

		},

		methods: {

			onClose()
			{
				this.assiciatedElement = undefined;
				this.isOpen = false;
			},

			onOpen()
			{
				this.currentCategory = this.currentCategory || this.editor.categories[0].id;
				this.isOpen = true;
			},

			open(associateWith, fn, marginX = 0, marginY = 0)
			{
				this.assiciatedElement = associateWith;
				this.fn = fn;
				this.marginX = marginX;
				this.marginY = marginY;
				this.$refs.popup.open();
			},

			select(id)
			{
				this.$refs.popup.close();

				if (this.fn)
					this.fn(id);
			}

		}

	}

</script>
