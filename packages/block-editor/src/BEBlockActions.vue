<template>

	<div class="be-block-actions" @click.stop>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="entry.rearrange(-1)" :disabled="entry.isFirst"><i class="mdi mdi-arrow-up"></i></button>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="entry.rearrange(1)" :disabled="entry.isLast"><i class="mdi mdi-arrow-down"></i></button>
		<div class="divider divider-vertical"></div>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="entry.remove()"><i class="mdi mdi-delete"></i></button>
		<div class="divider divider-vertical"></div>
	</div>

</template>

<script>

	import { BlockEntry } from "./api";

	export default {

		name: "BEBlockActions",

		props: {
			entry: {required: true, type: BlockEntry}
		}

	}

</script>
