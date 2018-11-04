<template>

	<div class="tree-view-item">
		<div class="tree-view-item-label" :class="{'is-expanded': isExpanded}" @click="click(id)">
			<button class="btn btn-text btn-icon btn-dark btn-sm" @click="toggle" v-if="children.length > 0"><i class="mdi mdi-chevron-right"></i></button>
			<i :class="['tree-view-item-label-icon', 'mdi', 'mdi-' + icon]"></i>
			<span class="tree-view-item-label-label">{{ name }}</span>
		</div>
		<div class="tree-view-item-children" v-if="children.length > 0 && isExpanded">
			<latte-tree-view-item v-for="(child, key) of children" :key="key" :id="child.id" :parent_id="child.parent_id" :icon="child.icon" :name="child.name" :children="child.children || []" @change="click($event)"></latte-tree-view-item>
		</div>
	</div>
	
</template>

<script>

	export default {

		name: "latte-tree-view-item",

		props: {

			id: {
				required: true,
				type: Number
			},

			parent_id: {
				required: true,
				type: Number | undefined
			},

			icon: {
				default: "folder",
				required: false,
				type: String
			},

			name: {
				required: true,
				type: String
			},

			children: {
				default: [],
				required: false,
				type: Array
			}

		},

		data()
		{
			return {
				isExpanded: false
			};
		},

		methods: {

			click(id)
			{
				this.$emit("change", id);
			},

			toggle(evt)
			{
				evt.preventDefault();
				evt.stopPropagation();

				this.isExpanded = !this.isExpanded;
			}

		}

	}

</script>
