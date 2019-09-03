<template>

	<div class="be-hierarchy-item" :class="{'pb-0': blockMounts.length > 0}">
		<div class="be-hierarchy-header">
			<div class="block-name">{{ api.block.name }}</div>
			<div class="block-actions">
				<button class="btn btn-sm btn-icon btn-text btn-dark" data-close @click="api.focus()"><i class="mdi mdi-cursor-default-outline"></i></button>
				<div class="divider divider-vertical"></div>
				<button class="btn btn-sm btn-icon btn-text btn-dark" @click="api.rearrange(-1)"><i class="mdi mdi-arrow-up"></i></button>
				<button class="btn btn-sm btn-icon btn-text btn-dark" @click="api.rearrange(1)"><i class="mdi mdi-arrow-down"></i></button>
				<div class="divider divider-vertical"></div>
				<button class="btn btn-sm btn-icon btn-text btn-dark" @click="api.remove()"><i class="mdi mdi-delete"></i></button>
			</div>
		</div>

		<div class="be-hierarchy-group" v-if="blockMounts.length > 1">
			<div class="be-hierarchy-item" v-for="(children, index) of blockMounts">
				<div class="be-hierarchy-header">
					<div class="block-name">Sub ({{ index }})</div>
				</div>
				<div class="be-hierarchy-group">
					<BEHierarchyItem :api="child.api" :blocks="child.blocks" :key="index" v-for="(child, index) of children"></BEHierarchyItem>
				</div>
			</div>
		</div>

		<div class="be-hierarchy-group" v-else if="blockMounts.length > 0" v-for="children of blockMounts">
			<BEHierarchyItem :api="child.api" :blocks="child.blocks" :key="index" v-for="(child, index) of children"></BEHierarchyItem>
		</div>
	</div>

</template>

<script>

	import { BlockAPI } from "./block";

	export default {

		name: "BEHierarchyItem",

		props: {
			api: {required: true, type: BlockAPI},
			blocks: {required: true, type: Array}
		},

		computed: {

			blockMounts()
			{
				if (!this.api.block.canHaveChildren)
					return [];

				if (this.blocks.length === 0)
					return [];

				return this.blocks.map(b => b.$children.map(c => ({
					api: c.api,
					blocks: c.$children.filter(c => c.$options.name === "BEBlocks")
				})).filter(b => b.api !== undefined));
			}

		}

	}

</script>
