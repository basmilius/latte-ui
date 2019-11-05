<template>

	<div class="panel panel-blank be-inserter">
		<div class="app-bar">
			<div class="app-bar-row app-bar-auto px-3 py-3">
				<div class="input-group">
					<div class="input-group-addon">
						<Icon name="magnify"/>
					</div>
					<input type="search" class="form-control" :placeholder="'Search for blocks...' | beTranslate" :aria-label="'Search for blocks...' | beTranslate" v-model="searchTerm"/>
				</div>
			</div>
		</div>
		<div class="panel-body p-0">

			<template v-if="searchTerm === ''">

				<div class="be-inserter-group" v-for="category of categories">
					<div class="inserter-group-header" @click="currentCategory = category.id">
						<Icon :name="category.icon"/>
						<h6>{{ category.title }}</h6>
						<Icon class="ml-auto" :name="category.id === currentCategory ? 'chevron-up' : 'chevron-down'"/>
					</div>
					<div class="inserter-group-body" v-if="category.id === currentCategory">
						<template v-if="category.blocks.length > 0">
							<latte-ripple as="button" class="inserter-block" @click="onClick(block)" :key="block.id" v-for="block of category.blocks">
								<Icon :name="block.icon"/>
								<span>{{ block.name }}</span>
							</latte-ripple>
						</template>
						<template v-else>
							<Notice icon="alert-circle" style="grid-column: span 3">
								<p>{{ "There are no blocks in this category." | beTranslate }}</p>
							</Notice>
						</template>
					</div>
				</div>

			</template>

			<template v-else>

				<div class="be-inserter-group">
					<div class="inserter-group-body">
						<template v-if="blocks.length > 0">
							<latte-ripple as="button" class="inserter-block" @click="onClick(block)" :key="block" v-for="block of blocks">
								<Icon :name="block.icon"/>
								<span>{{ block.name }}</span>
							</latte-ripple>
						</template>
						<template v-else>
							<Notice icon="alert-circle" style="grid-column: span 3">
								<p>{{ "No blocks found matching your search term." | beTranslate }}</p>
							</Notice>
						</template>
					</div>
				</div>

			</template>

		</div>
	</div>

</template>

<script>

	import { CategoryRegistry } from "../core/category/registry";
	import { BlockRegistry } from "../core/block/registry";

	import Icon from "../ui/Icon";
	import Notice from "../ui/Notice";

	export default {

		name: "Inserter",

		components: {Notice, Icon},

		data()
		{
			return {
				currentCategory: "layout",
				searchTerm: ""
			};
		},

		computed: {

			blocks()
			{
				const searchTerm = this.searchTerm.toLowerCase();

				return BlockRegistry.blocks
					.filter(b =>
					{
						if (b.name.toLowerCase().indexOf(searchTerm) > -1)
							return true;

						for (let keyword of b.keywords)
							if (keyword.toLowerCase().indexOf(searchTerm) > -1)
								return true;

						return false;
					})
					.sort((a, b) => a.name.localeCompare(b.name));
			},

			categories()
			{
				return CategoryRegistry.categories.map(c =>
				{
					c.blocks = BlockRegistry.blocks
						.filter(b => b.category === c.id)
						.sort((a, b) => a.name.localeCompare(b.name));

					return c;
				});
			}

		},

		methods: {

			onClick(block)
			{
				this.$emit("select", block);
			}

		}

	}

</script>
