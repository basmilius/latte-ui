<template>

	<div class="be-hierarchy-item">
		<div class="be-hierarchy-header">
			<div class="block-name">{{ entry.block.name }}</div>
			<div class="block-actions">
				<button class="btn btn-sm btn-icon btn-text btn-dark" data-close @click="entry.focus()"><i class="mdi mdi-cursor-default-outline"></i></button>
				<div class="divider divider-vertical"></div>
				<button class="btn btn-sm btn-icon btn-text btn-dark" :disabled="entry.isFirst" @click="entry.rearrange(-1)"><i class="mdi mdi-arrow-up"></i></button>
				<button class="btn btn-sm btn-icon btn-text btn-dark" :disabled="entry.isLast" @click="entry.rearrange(1)"><i class="mdi mdi-arrow-down"></i></button>
				<div class="divider divider-vertical"></div>
				<button class="btn btn-sm btn-icon btn-text btn-dark" @click="entry.remove()"><i class="mdi mdi-delete"></i></button>
			</div>
		</div>

		<div class="be-hierarchy-group">
			<BEHierarchyItem :entry="child" :key="child.hash" v-for="child of entry.children"></BEHierarchyItem>
		</div>
	</div>

</template>

<script>

	import { BlockEntry } from "./api";

	export default {

		name: "BEHierarchyItem",

		props: {
			entry: {required: true, type: BlockEntry}
		}

	}

</script>
