<template>

	<div class="be-rearrange">
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="rearrange(-1)" :disabled="!(index > 0)"><i class="mdi mdi-arrow-up"></i></button>
		<button class="btn btn-icon btn-sm btn-text btn-dark" @click="rearrange(1)" :disabled="!(index < (indexMax - 1))"><i class="mdi mdi-arrow-down"></i></button>
	</div>

</template>

<script>

	export default {

		name: "BERearrange",

		props: {

			index: {
				type: Number
			},

			indexMax: {
				type: Number
			},

			rearrange: {
				type: Function
			}

		}

	}

</script>
