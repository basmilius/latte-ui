<template>

	<div class="notice" :class="`notice-${type}`">
		<Icon :name="icon" v-if="icon"/>
		<slot></slot>
	</div>

</template>

<script>

	import Icon from "./Icon";

	export default {

		name: "Notice",

		components: {Icon},

		props: {
			icon: {default: null, type: String | null},
			type: {default: "info", type: String}
		}

	}

</script>
