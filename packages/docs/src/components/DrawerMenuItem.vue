<template>

	<latte-ripple as="router-link" class="nav-link" :to="to">
		<slot></slot>
	</latte-ripple>

</template>

<script>

	export default {

		name: "DrawerMenuItem",

		props: {
			to: {default: "/", type: String}
		}

	}

</script>
