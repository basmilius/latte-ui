<template>

	<div class="be-block-actions">
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="api.rearrange(-1)" :disabled="api.index === 0"><i class="mdi mdi-arrow-up"></i></button>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="api.rearrange(1)" :disabled="api.index === api.group.maxIndex"><i class="mdi mdi-arrow-down"></i></button>
		<div class="divider divider-vertical"></div>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="api.remove()"><i class="mdi mdi-delete"></i></button>
		<div class="divider divider-vertical"></div>
	</div>

</template>

<script>

	import { BlockApi } from "./block";

	export default {

		name: "BEBlockActions",

		props: {
			api: {required: true, type: BlockApi}
		}

	}

</script>
