<template>

	<div class="tree-view">
		<latte-tree-view-item v-for="(child, key) of children" :key="key" :id="child.id" :parent_id="child.parent_id" :icon="child.icon" :name="child.name" :children="child.children || []" @change="click($event)"></latte-tree-view-item>
	</div>

</template>

<script>

	import { request } from "../../js/api";

	export default {

		name: "latte-tree-view",

		props: {

			url: {
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				children: []
			};
		},

		mounted()
		{
			this.load();
		},

		methods: {

			click(id)
			{
				this.$emit("change", id);
			},

			load()
			{
				request(this.url)
					.then(r => r.json())
					.then(this.onResponse);
			},

			onResponse(response)
			{
				this.children = response.data;
			}

		}

	}

</script>
