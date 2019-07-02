<template>

	<div class="be-block-actions">
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="rearrange(-1)" :disabled="!(index > 0)"><i class="mdi mdi-arrow-up"></i></button>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="rearrange(1)" :disabled="!(index < (indexMax - 1))"><i class="mdi mdi-arrow-down"></i></button>
		<div class="divider divider-vertical"></div>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="remove()"><i class="mdi mdi-delete"></i></button>
		<div class="divider divider-vertical"></div>
	</div>

</template>

<script>

	export default {

		name: "BEBlockActions",

		props: {

			index: {
				type: Number
			},

			indexMax: {
				type: Number
			},

			rearrange: {
				type: Function
			},

			remove: {
				type: Function
			}

		}

	}

</script>
